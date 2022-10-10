import { create } from "apisauce";
// import cache from "../utility/cache";
import settings from "../config/settings";
import authStorage from "../auth/storage";

var DEMO_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY2NTIyNTk3NywiZXhwIjoxNjY1MzEyMzc3LCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.gLdK9R2eDFQEa4XdNAqSJJglk715OvYaFQsS232PXZbKAAwiOmdjQePdTOwCkpy9USEefG20r6cf-qn4759hBbheuJV7YnWy27Rb0lqgznRcdig0_DPadH06GDDzYmxxG5cXeqPF8cJ47MbJ0B3Y2B9dTmXnilzMMUv2iIbcbopxSGACVYc0z3rbPt9MPsdlS_wqNtn76ORbnBIA49JF3zqYqpNtiKbdFwzbPxKL2rg3AdodJbB5AMcLe76ekP8L-MxPMGR_28buZt0cmK-rbxzKT6UI-c1h70Uu7mwrBOW_T1okEXedpaBl_m9eLJyYpN2eSfrIT6rSfTKgz__Dew";

const apiClient = create({
  //To Do DomaEvid
  baseURL: settings.apiUrl,
  // headers: { Authorization: `Bearer ${DEMO_TOKEN}` },
});

// apiClient.setHeader(
//   // "Authorization: Bearer " + DEMO_TOKEN
//   "Authorization: `Bearer ${DEMO_TOKEN}`"
// );

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  console.log("authToken = " + authToken);

  if (!authToken) return;

  request.headers["Authorization"] = "Bearer " + authToken;
  // request.headers["Authorization"] = "Bearer " + DEMO_TOKEN;
});
export default apiClient;
