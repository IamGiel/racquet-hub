// api/apiPaths.ts

const BASE_URL = 'http://localhost:3000'; // Replace with your actual base URL
const BASE_URL2 = 'http://localhost:3003'; // Replace with your actual base URL
const BASE_URL3 = 'http://localhost:5000'; // Replace with your actual base URL

export const API_PATH = {
  GET_USER_PROFILE: `${BASE_URL}/userProfile`,
  GET_USER_DETAILS: `${BASE_URL2}/authData`,
  LOGIN_API: `${BASE_URL2}/api/login`,
  // Add more API paths as needed
};
