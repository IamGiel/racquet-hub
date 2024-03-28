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
