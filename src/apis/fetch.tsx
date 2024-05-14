import { API_PATH } from "../api/apiPaths";

// Function to check if the token is expired
const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true; // Token doesn't exist, consider it expired
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime; // Compare expiration time with current time
};

// Function to refresh the page and clear local storage
function refreshPageAndClearLocalStorage() {
  localStorage.clear(); // Clear local storage
  window.location.reload(); // Refresh the page
}
// Access the environment variable
const username = process.env.REACT_APP_USERNAME;

// LOGIN API
export async function loginApiv2(userDets?: any, token?: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log('appended headers ', myHeaders)

  // Append Authorization header if token is provided
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  // Set request body if user details are provided
  if (userDets) {
    requestOptions.body = JSON.stringify(userDets);
  }
  if (token) {
    requestOptions.body =  JSON.stringify({token})
  }

  // Log the requestOptions and headers
  console.log("requestOptions ", requestOptions);
  console.log("myHeaders ", myHeaders);

  // Perform the fetch request
  return fetch("http://localhost:5000/api/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // Process the result as needed
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error; // Propagate the error to the caller
    });
}
// REGISTER API
export async function registrationApi(userDets?: any, token?: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log('appended headers ', myHeaders)

  // Append Authorization header if token is provided
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  // Set request body if user details are provided
  if (userDets) {
    requestOptions.body = JSON.stringify(userDets);
  }
  if (token) {
    requestOptions.body =  JSON.stringify({token})
  }

  // Log the requestOptions and headers
  console.log("requestOptions ", requestOptions);
  console.log("myHeaders ", myHeaders);

  // Perform the fetch request
  return fetch("http://localhost:5000/api/register", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // Process the result as needed
      return result;
    })
    .catch((error) => {
      console.error("Error in loginApiv2:", error);
      throw error; // Propagate the error to the caller
    });
}

// GET USER DETAILS
export async function editUserDetals(payload: any) {
  const authToken = localStorage.getItem("authToken");
  const raw = JSON.stringify(payload);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // Check if payload exists and token is not expired
  if (!payload || isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }

  return fetch("http://localhost:5000/api/userProfile", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.error("error in api/login ", error));
}
// UPDATE USER DETAILS
export async function updateUserDetails(payload: any, id: any) {
  const authToken = localStorage.getItem("authToken");
  const raw = JSON.stringify(payload);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // Check if payload exists and token is not expired
  if (!payload || isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }

  // return fetch(`http://localhost:5000/api/proposals/${id}`, requestOptions);
  return fetch("http://localhost:5000/api/userProfile", requestOptions)
}


// PROPOSALS API
export async function getAllProposals() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: any = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Check if payload exists and token is not expired
  if (isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    // refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }

  // Return the promise chain
  return fetch("http://localhost:5000/api/proposals", requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error in api/proposals ", error);
      throw error; // Rethrow the error for the calling code to handle
    });
}

export async function deleteProposal(payload: any) {
  const authToken = localStorage.getItem("authToken");
  const raw = JSON.stringify(payload);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  const requestOptions: any = {
    method: "DELETE", // Correct method for delete operation
    headers: myHeaders,
    redirect: "follow",
  };

  // Check if payload exists and token is not expired
  if (!payload || isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }

  return fetch(`http://localhost:5000/api/proposals/${payload}`, requestOptions)
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));
}

export async function createProposal(payload: any) {
  const authToken = localStorage.getItem("authToken");
  const raw = JSON.stringify(payload);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // Check if payload exists and token is not expired
  if (!payload || isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }
  return fetch("http://localhost:5000/api/proposals", requestOptions);
  // .then((response) => response.json())
  // .then((result) => {
  //   // console.log(result);
  //   return result;
  // })
  // .catch((error) => {
  //   console.error("error in api/login ", error);
  //   return error;
  // });
}

export async function editProposal(payload: any, id: any) {
  const authToken = localStorage.getItem("authToken");
  const raw = JSON.stringify(payload);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // Check if payload exists and token is not expired
  if (!payload || isTokenExpired()) {
    // You might want to handle this case based on your application logic
    // For example, you could return a rejected Promise or handle it differently
    refreshPageAndClearLocalStorage()
    return Promise.reject("Invalid payload or token expired");
  }

  return fetch(`http://localhost:5000/api/proposals/${id}`, requestOptions);
}


// ZIPCODE API
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
