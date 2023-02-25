import { create } from "apisauce";

// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY3NzMzNjY3MywiZXhwIjoxNjc5OTI4NjczLCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.abKSOntpqqBVO2_qhvBSDGixqRy54O7V5qFOVhRxihG-F45f3quo1ODIxpmLr55HS683BLZOequX8Nojatcefka76f-q6vHD-0RDCONWYNR7TkTF96dZ-k8viQs3wUrInUBH-lXZukUGAcpsqd2s6o9wNtfCIFeg0L02nsD19KoNxWsq0E8kuQOy268gCxTuoFezgq0FfCzme7cweh9d-ge3lJAfg5k6R6i5pGoQbgqgoE5ItPAbl-N8-8DLDbSsPW31xVrT2K7RgccroXwR_IssGOR_UrZmMb5_EeCPfR39HDR5L4Dk6UonfTIMncRfDkaQm55zYpPY27xZQU1OTA";

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
