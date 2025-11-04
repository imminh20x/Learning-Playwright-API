import { readFileSync } from 'fs';
import path from 'path';


export class DataLoader {
    /**
     * Load JSON data from a file
     * @param {string} fileName - Name of the file in test-data directory (e.g., 'postContent.json')
     * @returns {Promise<Object>} Parsed JSON data
     * @throws {Error} If file doesn't exist or JSON is invalid
     */
    static async loadJSON(fileName) {
        try {
            // Resolve path relative to project root (where test-data folder is)
            const dataPath = path.resolve(process.cwd(), 'test-data', fileName);
            const fileContent = readFileSync(dataPath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Test data file not found: ${fileName}. Please check the test-data directory.`);
            } else if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON in file ${fileName}: ${error.message}`);
            } else {
                throw new Error(`Failed to load test data from ${fileName}: ${error.message}`);
            }
        }
    }

    /**
     * Load JSON array data from a file (for test.each() scenarios)
     * @param {string} fileName - Name of the file in test-data directory
     * @returns {Promise<Array>} Parsed JSON array
     */
    static async loadJSONArray(fileName) {
        const data = await this.loadJSON(fileName);
        if (!Array.isArray(data)) {
            throw new Error(`Expected array in ${fileName}, but got ${typeof data}`);
        }
        return data;
    }

    /**
     * Load test data by feature name (convention: featureName.json)
     * @param {string} featureName - Name of the feature (without .json extension)
     * @returns {Promise<Object>} Parsed JSON data
     */
    static async getTestData(featureName) {
        const fileName = featureName.endsWith('.json') ? featureName : `${featureName}.json`;
        return await this.loadJSON(fileName);
    }
}