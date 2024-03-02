export async function getAllProposals() {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    "http://localhost:3000/supplier-market-company-result",
    requestOptions
  );
}
