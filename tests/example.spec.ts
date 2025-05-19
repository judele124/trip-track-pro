import { test, request, expect, BrowserContext, Page } from '@playwright/test';
import tripRoute from './tripRoute.json';

// Number of users for the test
const USER_COUNT = 5;

// Extract coordinates from the route
const getRouteCoordinates = () => {
	// This is a simplified version - you'll need to parse your actual route data
	// The actual implementation will depend on your tripRoute.json structure
	const coordinates = [];
	// Add logic to extract coordinates from tripRoute.json
	return coordinates;
};

interface TestUser {
	id: number;
	name: string;
	speed: number;
	context: BrowserContext | null;
	page: Page | null;
}

test.describe('Multi-user Trip Test', () => {
	const users: TestUser[] = Array.from({ length: USER_COUNT }, (_, i) => ({
		id: i,
		name: `User ${i + 1}`,
		// Each user will move at a slightly different speed
		speed: 1 + i * 0.2,
		context: null,
		page: null,
		route: null,
	}));

	// Shared trip ID
	let tripId;

	let inviteCode;

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
		const routeCoordinates = getRouteCoordinates();

		// Creator creates a new trip
		await creator.page.getByText('Create Trip').click();
		await creator.page.fill(
			'input[placeholder="Trip name"]',
			'Group Hiking Trip'
		);
		// Add trip details and route...

		// Get invite code
		await creator.page.click('button:has-text("Invite")');
		inviteCode = await creator.page.textContent('.invite-code');

		// Other users join the trip
		for (const user of participants) {
			if (!user.page || !user.context) continue;
			await user.page.click('button:has-text("Join Trip")');
			await user.page.fill(
				'input[placeholder="Enter invite code"]',
				inviteCode
			);
			await user.page.click('button:has-text("Join")');
			await user.page.waitForLoadState('networkidle');
		}

		// Start the trip
		await creator.page.click('button:has-text("Start Trip")');

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

	async function simulateUserMovement(user, coordinates, delay) {
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
