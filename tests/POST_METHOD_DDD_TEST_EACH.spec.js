import { test, expect } from "@playwright/test"
import { DataLoader } from '../helpers/dataLoader.js';
import dotenv from 'dotenv'

dotenv.config()

// Load test data once at module level
const testDataPromise = await DataLoader.loadJSONArray('posts.json');
const baseUrl = process.env.BASE_URL
const headers = { 'Content-type': 'application/json; charset=UTF-8' }

test('individual test for each post data', async ({ request }) => {
    const testData = await testDataPromise;

    for (const data of testData) {
        console.log(data);
        const response = await request.post(baseUrl + '/posts', { headers, data });
        const rsBody = await response.json();
        console.log(rsBody);
        const status = response.status();

        // verification
        expect(status, `Status should be ${data.expectedStatus} for post: ${data.title}`).toBe(data.expectedStatus);
        expect(rsBody.title, 'Title should match request data').toBe(data.title);
        expect(rsBody.body, 'Body should match request data').toBe(data.body);
        expect(rsBody.userId, 'UserId should match request data').toBe(data.userId);
        expect(rsBody.id, 'Response should have an id').toBeTruthy();
    }
});


