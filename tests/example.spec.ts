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
const USER_COUNT = 5;

// Extract coordinates from the route
const getRouteCoordinates = () => {
	return tripRoute.routes[0].geometry.coordinates;
};

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
			const context = await browser.newContext();
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

		// maybe add check if trip is created and then start it
		await creator.context.request.get(
			`http://localhost:3000/trip/start/${tripId}`
		);

		// all users join the trip
		for (const user of participants) {
			if (!user.page || !user.context) continue;
			// join as a guest with a name
			await user.page.goto(
				`http://localhost:5173/app/join-trip?tripId=${tripId}`
			);
			await user.page.waitForLoadState('networkidle');
			await user.page.getByRole('button', { name: 'join' }).click();

			await user.page
				.getByRole('button', { name: 'Create guest token' })
				.click();

			const currentName = await user.page.getByRole('textbox').innerText();

			await user.page.getByRole('textbox').fill(`${currentName}-${user.id}`);

			await user.page.getByRole('button', { name: 'Confirm' }).click();

			await user.page.waitForLoadState('networkidle');

			// join the trip
			await user.page.getByRole('button', { name: 'join' }).click();
		}

		// get route coordinates
		const routeCoordinates = getRouteCoordinates();

		// Simulate movement for each user
		const movePromises = users.map(
			(user, index) =>
				simulateUserMovement(user, routeCoordinates, index * 1000) // Stagger start times
		);

		await Promise.all(movePromises);

		// Verify all users completed the trip
		for (const user of users) {
			if (!user.page) continue;
			await expect(user.page.locator('.trip-complete')).toBeVisible();
		}
	});

	async function simulateUserMovement(
		user: TestUser,
		coordinates: number[][],
		delay: number
	) {
		if (!user.page) return;
		await user.page.waitForTimeout(delay);

		for (
			let i = 0;
			i < coordinates.length;
			i += Math.ceil(coordinates.length / 100)
		) {
			const [lon, lat] = coordinates[i];

			// Update user's location
			await user.page.evaluate(
				({ lon, lat }) => {
					window.dispatchEvent(
						new CustomEvent('locationUpdate', {
							detail: {
								coords: {
									longitude: lon,
									latitude: lat,
									accuracy: 5,
								},
							},
						})
					);
				},
				{ lon, lat }
			);

			// Wait based on user's speed
			await user.page.waitForTimeout(1000 / user.speed);
		}
	}

	test.afterAll(async () => {
		// Clean up
		for (const user of users) {
			if (!user.context) continue;
			await user.context.close();
		}
	});
});
