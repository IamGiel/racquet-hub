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
