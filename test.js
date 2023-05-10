import http from "k6/http";
import { check } from "k6";
import { Counter } from 'k6/metrics';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


const myCounter = new Counter('super_contador');

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    'http_reqs{expected_response:true}': ['rate>10'],
  },
};

export default function () {
  const response = http.get("https://test-api.k6.io/")
  check(response, {
    "status is 200": (r) => r.status == 200,
  });
  const randomNumber= randomIntBetween(1, 100)
  myCounter.add(randomNumber)
}