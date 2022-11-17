import { create } from "apisauce";
// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY2ODYyMzY3MCwiZXhwIjoxNjY4NzEwMDcwLCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.w5w8AfyzEdv2yxYfNunStsNB999M6jgTbAP4DCsF50JsnXIQ56BXNAPNtGDA7XQUTRXV9xxgBOSN3Pz0QgOxm9dVPBIxHOHNGlKsH-Ilq888XyHXZetlISL4b0XSpAoBI1tuiI5PNSpyAcf8rIAVd5jUEKf_D-1d7CGv35fqxRqJV94brYo2yT14ZUjipLiDSBuANrinPKSx6OSYxzDLjPwnTuKitzrm9mB8SwdMoJZSQJ7atbJhNaY3FLgUGrR-ZHCKFlGAQ4iVUbFzL7Ab18_bBxqBIx-fwVQgx69J0Wt5nxQ_9gbutBsbt2toP8SXzp_bl-ISUGQmzfOJVqiHPQ";

const apiClient = create({
  //To Do DomaEvid
  baseURL: settings.apiUrl,
  headers: { Authorization: `Bearer ${DEMO_TOKEN}` },
});

apiClient.addAsyncRequestTransform(async (request) => {
  // const authToken = await authStorage.getToken();
  const authToken = DEMO_TOKEN;

  console.log("client.js, authToken = " + authToken);
  console.log("client.js, DEMO_TOKEN = " + DEMO_TOKEN);

  if (!authToken) return;

  // request.headers["Authorization"] = "Bearer " + authToken;
  // request.headers["Authorization"] = "Bearer " + DEMO_TOKEN;
  // apiClient.setHeaders(
  //   { Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //     ["Authorization"] = "Bearer " + DEMO_TOKEN)}
  //   ;
  // apiClient.setHeader("Authorization", DEMO_TOKEN);
  // apiClient.setHeader("Authorization: `Bearer ${DEMO_TOKEN}`");
  console.log(
    "client.js, apiClient.headers = " +
      JSON.stringify(apiClient.headers, null, 2)
  );
  console.log(
    "client.js, apiClient.header = " + JSON.stringify(apiClient.header, null, 2)
  );
  console.log(
    'request.headers["Authorization"] = ' + request.headers["Authorization"]
  );
});
export default apiClient;
