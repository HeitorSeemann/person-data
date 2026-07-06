import http from 'k6/http';
import { check, sleep } from 'k6';

// Load testing scenarios and SLA criteria
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up: scale from 0 to 20 virtual users (VUs) over 30 seconds
    { duration: '1m', target: 20 },   // Sustained load: stay at 20 concurrent users for 1 minute
    { duration: '15s', target: 0 },   // Ramp-down: cool down back to 0 users over 15 seconds
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // The test fails if more than 1% of the HTTP requests return errors
    http_req_duration: ['p(95)<200'], // 95% of all requests must respond in less than 200 milliseconds
  },
};

export default function () {
  const baseUrl = 'http://localhost:3005/person';
  
  // Create a unique dynamic email using VU and iteration IDs to bypass the Prisma unique index constraint (P2002)
  const uniqueEmail = `performance.test.${__VU}.${__ITER}@example.com`;

  const payload = JSON.stringify({
    name: 'Automation Load Test',
    age: 25,
    email: uniqueEmail,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Step 1: Fire the HTTP POST request to register a new record
  const postResponse = http.post(baseUrl, payload, params);

  // Validate that the server responded with an HTTP 201 Created status code
  const postPassed = check(postResponse, {
    'POST status is 201 Created': (r) => r.status === 201,
  });

  // Step 2: If the POST request was successful, extract the newly generated ID to chain a GET request
  if (postPassed && postResponse.body) {
    try {
      const createdPerson = JSON.parse(postResponse.body);
      const personId = createdPerson.id;

      if (personId) {
        // Execute the targeted GET request for the specific record
        const getResponse = http.get(`${baseUrl}/${personId}`);

        // Validate the query response status and verify structural integrity
        check(getResponse, {
          'GET status is 200 OK': (r) => r.status === 200,
          'GET payload returns the correct ID match': (r) => JSON.parse(r.body).id === personId,
        });
      }
    } catch (error) {
      // Prevents the engine iteration from breaking if the payload structure changes under heavy load
    }
  }

  // Enforce a 1-second pacing interval between loop cycles to model standard user behavior
  sleep(1);
}
