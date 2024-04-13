// Access the environment variable
const username = process.env.REACT_APP_USERNAME;

export async function getAllProposals() {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    "http://localhost:3001/supplier-market-company-result",
    requestOptions
  );
}
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
