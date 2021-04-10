import { create } from "apisauce";
// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.yJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTYxNDYzMjAwNiwiZXhwIjoxNjE0NzE4NDA2LCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.KyqPDicI6okIuFA52F9oPXknRfMiX-IDu6yAT0pOxLfJCITLUKeNVym3se_v2xHhLuCyod58__VhS-_3DhGmsLhmkUbG60o0y_QcQjIIvbakTDZdw9UlwBEYYUCm--4owPbOdkXASxvt51b4gLl0p-W9WPrJG2Zm_-hTNVcqYBrJyM1Mf39pLrUiEt5HKWb7PobqIJVeAzqkIdHoXjYbVH3LHt-qT5wjotg3m6BhOhAuZvpPFUaRdeel8vRRUpilZzJy2d-1chMX3aF-OeaVIPzmdgMgosD8VBwDfCFNbjrMDZD9lqCT5mK4oK2z31MUTVFqG1evZjCSwntG-QS2PQ";

const apiClient = create({
  //To Do DomaEvid
  baseURL: settings.apiUrl,
  // headers: { Authorization: "Bearer " + DEMO_TOKEN },
});

// apiClient.setHeader("Authorization" + DEMO_TOKEN);

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  console.log("authToken = " + authToken);

  if (!authToken) return;

  // request.headers["Bearer"] = authToken;
  request.headers["Authorization"] = "Bearer " + authToken;
});
export default apiClient;
