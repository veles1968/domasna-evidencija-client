import { create } from "apisauce";

// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY3MDY2ODU2NSwiZXhwIjoxNjczMjYwNTY1LCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.KIZZJBXF4TdSNhuJyfbCihU-lP4rYIGeAWpCoXmXGZEZlQ5AOWImfqVa9rWM0GGtuj0N1wkRRkTNjERJiN2PWqTDFwsSPwloCiTAC2vTb1k3K8EGNAQ6Gqr9KbDWurJi0tZC2YdPYBNW2SOpB4ogpsiv7gd4SA6jWx3Y9dECz-ak4tgw4VoVKFORiqHJCEgS5WqjN11-CCufUBurVQ0zOSovP8EC9NbR5CLZRvVpvaik0AArZoItzaEMomcrqlmD5Al0-iutF9nBFX8hsDSp4oI24whkLUnlyl6IcXg7SPb2ykkO12Xa8P3vx0jzzUOV9fysMhRH3eVoMu8O7bI6gw";

const apiClient = create({
  //To Do DomaEvid
  baseURL: settings.apiUrl,
  // headers: { Authorization: `Bearer ${DEMO_TOKEN}` },
});

apiClient.addAsyncRequestTransform(async (request) => {
  // const authToken = await authStorage.getToken();
  const authToken = DEMO_TOKEN;

  // console.log("client.js, authToken = " + authToken);
  // console.log("client.js, DEMO_TOKEN = " + DEMO_TOKEN);

  if (!authToken) return;

  request.headers["Authorization"] = "Bearer " + authToken;
});
export default apiClient;
