import { API_PATH } from "../api/apiPaths";

// Access the environment variable
const username = process.env.REACT_APP_USERNAME;

// export async function getAllProposals() {
//   const requestOptions: any = {
//     method: "GET",
//     redirect: "follow",
//   };

//   return fetch(
//     "http://localhost:5000/api/proposals",
//     requestOptions
//   );
// }

export async function loginApi(credentials: {
  username: string;
  password: string;
  isAuthenticated: string;
}) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `http://localhost:3003/authData?user=${credentials.username}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }
    // You can return the response data if needed
    return await response.json();
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function getZipcode(term: any) {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };
  if (!term) return;

  return fetch(
    `http://api.geonames.org/searchJSON?q=${
      term ?? ""
    }&maxRows=10&username=${username}`,
    requestOptions
  );
}

export async function loginApiv2(userDets: any) {
  const raw = JSON.stringify(userDets);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log('raw ', raw)

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  if (!userDets) return;

  return fetch("http://localhost:5000/api/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => console.error('error in api/login ', error));
}

export async function getAllProposals() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Return the promise chain
  return fetch("http://localhost:5000/api/proposals", requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error('Error in api/proposals ', error);
      throw error; // Rethrow the error for the calling code to handle
    });
}

