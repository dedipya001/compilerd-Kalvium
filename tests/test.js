// const axios = require('axios')
// const { testCases } = require('./data/testJson')
// const { describe, expect, it } = require('@jest/globals')

// const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/'

// describe('Tests', () => {
//     for (const testCase of testCases) {
//         it(testCase.name, async () => {
//             const response = await axios.post(ENDPOINT, testCase.reqObject)
//             if (typeof response.data.output === 'object') {
//                 expect(response.data.output.score).toBeDefined()
//                 expect(response.data.output.rationale.positives).toBeDefined()
//                 expect(response.data.output.rationale.negatives).toBeDefined()
//                 expect(response.data.output.points).toBeDefined()
//             } else {
//                 expect(response).toHaveProperty('data.output', testCase.expectedResponse.val)
//             }
//             expect(response).toHaveProperty('status', testCase.expectedResponse.status)
//             expect(response).toHaveProperty('data.error', testCase.expectedResponse.error)
//         }, 15000)
//     }
// })


const axios = require('axios');
const { testCases } = require('./data/testJson');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            try {
                const response = await axios.post(ENDPOINT, testCase.reqObject);
                console.log(`Test Case: ${testCase.name}`);
                console.log('Response:', response.data);

                if (typeof response.data.output === 'object') {
                    expect(response.data.output.score).toBeDefined();
                    expect(response.data.output.rationale.positives).toBeDefined();
                    expect(response.data.output.rationale.negatives).toBeDefined();
                    expect(response.data.output.points).toBeDefined();
                } else {
                    console.log('Response data output:', response.data.output);
                    expect(response.data.output).toEqual(testCase.expectedResponse.val);
                }

                console.log('Response status:', response.status);
                console.log('Response error:', response.data.error);

                expect(response.status).toEqual(testCase.expectedResponse.status);
                expect(response.data.error).toEqual(testCase.expectedResponse.error);
            } catch (error) {
                console.error(`Error occurred for test "${testCase.name}":`, error);
                throw error; // Propagate the error to fail the test
            }
        }, 30000); // Increased timeout to 30 seconds
    }
});
