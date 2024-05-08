import { API_PATH } from "../api/apiPaths";

// Function to check if the token is expired
const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true; // Token doesn't exist, consider it expired
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime; // Compare expiration time with current time
};
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

  console.log("raw ", raw);

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
      // console.log(result);
      return result;
    })
    .catch((error) => console.error("error in api/login ", error));
}

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
    return Promise.reject("Invalid payload or token expired");
  }

  // Return the promise chain
  return fetch("http://localhost:5000/api/proposals", requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error in api/proposals ", error);
      throw error; // Rethrow the error for the calling code to handle
    });
}

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
    return Promise.reject("Invalid payload or token expired");
  }

  return fetch(`http://localhost:5000/api/proposals/${payload}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
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

export async function editProposal(payload: any, id:any) {
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
    return Promise.reject("Invalid payload or token expired");
  }

  return fetch(
    `http://localhost:5000/api/proposals/${id}`,
    requestOptions
  );
}
