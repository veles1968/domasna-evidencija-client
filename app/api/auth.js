import client from "./client";

// var DEMO_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBFeFZZUHY5R01GMkZ3dzN3ZGNaNCJ9.eyJpc3MiOiJodHRwczovL2Rldi04N2preTRjMS5ldS5hdXRoMC5jb20vIiwic3ViIjoiN1VSdll3YTkwbWoyWlJvampoNklpRTJoc1BSYkI2NVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZG9tYXNuYS1ldmlkZW5jaWphLWFwaSIsImlhdCI6MTY2NTg0MDcyOSwiZXhwIjoxNjY1OTI3MTI5LCJhenAiOiI3VVJ2WXdhOTBtajJaUm9qamg2SWlFMmhzUFJiQjY1ViIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.PLR6t_0pbnQigpLw0aWMttpMGq4_IO35o4SFO8qFEY1UOV0iWEQphIgO58MnKNrX094V_hb9ZjUZlNPdWDYevH1nNNX6_Vj4OKoCsq6G--WGS2cZdcPU3u_Gn_s6xhC8sEZEcYlBi73P5Pm3U60n117LWlGyLhap314_cAaGxsLawB4Ur4gJwMXAHNozXLsdTumgnHefb_3NBXmGgYIq_OCRJuW1IurVscFPURQztyRJ1E3YIlvzTyPkpKlUJo8j1urkgneUSIpc4_FO5Jt8tMqfMlKYyeSs-kUP8qNq1FcQIKqTT68RKqSeIOKPW7OGc3aWnANWM3PXG94dqmnOOg";

const login = (email, password) =>
  client.post(
    "/auth",
    { email, password }
    // { headers: { Authorization: "Bearer " + DEMO_TOKEN } }
  );

export default {
  login,
};
