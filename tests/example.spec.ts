import { test, request, expect, Page, BrowserContext } from '@playwright/test';
import tripRoute from './tripRoute.json' assert { type: 'json' };
// i went threw the logic until here line 161
// from there is all by ai NEED TO LOOK ON THE CODE IF IT MAKES SENSE

async function loginUser(
	page: Page,
	email: string,
	options: {
		apiContext?: any;
		baseUrl?: string;
		authUrl?: string;
	} = {}
): Promise<void> {
	const {
		apiContext = await request.newContext(),
		baseUrl = 'http://localhost:5173',
		authUrl = 'http://localhost:3000/auth/send-code',
	} = options;

	try {
		// Navigate to the base URL and skip any welcome screens
		await page.goto(baseUrl);
		await page.getByText('Home').click();

		// Navigate to the login page
		await page.goto(`${baseUrl}/app/login`);

		// Start the login process
		await page.getByRole('textbox').fill(email);
		await page.getByRole('button', { name: 'Send code' }).click();

		// Get the verification code
		const response = await apiContext.post(authUrl, {
			data: { email },
		});

		if (!response.ok()) {
			throw new Error(`Failed to send verification code: ${response.status()}`);
		}

		const { code } = await response.json();
		if (!code) {
			throw new Error('No verification code received');
		}

		// Enter the verification code
		await page.getByRole('textbox').fill(code);
		await page.getByRole('button', { name: 'Verify code' }).click();

		// Wait for navigation to complete
		await page.waitForLoadState('networkidle');
	} finally {
		// Clean up the API context if we created it
		if (options.apiContext === undefined) {
			await apiContext.dispose();
		}
	}
}

async function userJoinTripAsGuest(user: TestUser, tripId: string) {
	if (!user.page || !user.context) return;
	// join as a guest with a name
	await user.page.goto(`http://localhost:5173/app/join-trip?tripId=${tripId}`);
	await user.page.waitForLoadState('networkidle');
	await user.page.getByRole('button', { name: 'join' }).click();

	await user.page.getByRole('button', { name: 'Login as guest' }).click();

	await user.page.waitForTimeout(1000);

	// Wait for and click confirm button
	const confirmButton = user.page.getByRole('button', { name: 'Confirm' });

	await user.page.waitForTimeout(1000);

	await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
	await confirmButton.click();

	await user.page.waitForTimeout(1000);

	// Wait for and click the final join button
	const finalJoinButton = user.page.getByRole('button', { name: 'join' });

	await finalJoinButton.waitFor({ state: 'visible', timeout: 10000 });
	await finalJoinButton.click();

	await user.page.waitForTimeout(1000);

	// Wait for navigation to complete
	await user.page.waitForURL('**/trip/map', { timeout: 15000 });
}
interface TestUser {
	id: number;
	name: string;
	speed: number;
	context: BrowserContext | null;
	page: Page | null;
}

interface CreatorUser extends TestUser {
	gmail: string;
}

const creatorUser: CreatorUser = {
	id: 0,
	name: 'Creator',
	speed: 1,
	context: null,
	page: null,
	gmail: 'segal.netanel4@gmail.com',
};
// Number of users for the test
const USER_COUNT = 3;

test.describe('Multi-user Trip Test', () => {
	const users: [CreatorUser, ...TestUser[]] = [
		creatorUser,
		...Array.from({ length: USER_COUNT }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			// Each user will move at a slightly different speed
			speed: 1 + i * 0.2,
			context: null,
			page: null,
			route: null,
		})),
	];

	// Shared trip ID
	let tripId = '6828ec551a665db484ee2a5e';

	test.beforeAll(async ({ browser }) => {
		// Initialize browser contexts and pages for each user
		for (const user of users) {
			const context = await browser.newContext({
				geolocation: {
					longitude: tripRoute.routes[0].geometry.coordinates[0][0],
					latitude: tripRoute.routes[0].geometry.coordinates[0][1],
				},
				permissions: ['geolocation'],
			});
			const page = await context.newPage();
			user.context = context;
			user.page = page;

			// Navigate to app and login as guest
			await page.goto('http://localhost:5173');
			await page.getByText('Skip').click();
			await page.waitForLoadState('networkidle');
		}
	});

	test('users can complete a trip together', async () => {
		const [creator, ...participants] = users;
		if (!creator.page || !creator.context) return;
		await loginUser(creator.page, creator.gmail);

		const tripRes = await creator.context.request.get(
			`http://localhost:3000/trip/${tripId}`
		);
		if (!tripRes.ok()) {
			throw new Error(`Failed to get trip: ${tripRes.status()}`);
		}
		const tripData = await tripRes.json();
		if (tripData.status !== 'started') {
			// maybe add check if trip is created and then start it
			const res = await creator.context.request.post(
				`http://localhost:3000/trip/start/${tripId}`,
				{
					data: {
						status: 'started',
					},
				}
			);
			if (!res.ok()) {
				throw new Error(`Failed to start trip: ${res.status()}`);
			}
		}

		await creator.page.goto(
			`http://localhost:5173/app/join-trip?tripId=${tripId}`
		);

		await creator.page.getByRole('button', { name: 'join' }).click();

		// all users join the trip
		await Promise.all(
			participants.map((user) => userJoinTripAsGuest(user, tripId))
		);

		for (const user of users) {
			if (!user.page) continue;
			expect(user.page.url()).toContain('/trip/map');

			await user.page.screenshot({
				fullPage: true,
				path: `./test-pics/${user.name}.png`,
			});
		}

		// get route coordinates
		const routeCoordinates = tripRoute.routes[0].geometry.coordinates;

		users.forEach((user) => {
			if (!user.context) return;
			user.context.setGeolocation({
				longitude: routeCoordinates[0][0],
				latitude: routeCoordinates[0][1],
			});
		});

		// Simulate movement for each user
		const movePromises = users.map(async (user) => {
			if (!user.context) return;
			return routeCoordinates.map(async (r) => {
				if (!user.context) return;
				user.context.setGeolocation({
					longitude: r[0],
					latitude: r[1],
				});
				await new Promise((res) => setTimeout(res, 100));
			});
		});

		await Promise.all(movePromises);

		for (const user of users) {
			if (!user.page) continue;
			await expect(user.page.locator('.trip-complete')).toBeVisible();
		}

		for (const user of users) {
			if (!user.context) continue;
			await user.context.close();
		}
	});
});
