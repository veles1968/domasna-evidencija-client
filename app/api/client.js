import { create } from "apisauce";
// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY2ODUzNDI2OCwiZXhwIjoxNjY4NjIwNjY4LCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.chawXfGHdK1Rw5etPYbpRkqZhM3sAiCrnaSUWr84Q6uA2PH5sdpRcSVXLf2IocMQW6wCxXBIsuD1ZvJ1AKPGTNjJQUvFlaflio7iDNtBta7N1xm8JElusaTY_k790Cxja9SLFjtO_RQfa5-_JaEKvbXLqszkcvwFGgD2ppfe6VlqsTUO3zsYZzZUZKBGGb1UxC3whaxKHM_fLksbxorv4kuVcVP26q2Eg6wYRPwn8V_Ge9qlfMmP7Vs6usqt5d3ykbAc42BHYpy0WktbXD45131wxMo5Ikp937M66I4Mes-2pDAWrOjOKbGjDYGdw5rOVoasZLyg3VELWUdwLc6gWQ";

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
