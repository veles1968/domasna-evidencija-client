import Constants, { ExecutionEnvironment } from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.178.30:9000/api/", // LAN Karlsruhe
    // apiUrl: "http://localhost:9000/api", // LAN Karlsruhe
    // apiUrl: "http://192.168.178.29:9000/api", // WLAN Karlsruhe
    // apiUrl: "http://192.168.178.21:9000/api", // WLAN Köln
    // apiUrl: "http://158.101.173.191:9000/api/",
  },
  staging: {
    // apiUrl: "http://0.0.0.0.0:9000/api",
    // apiUrl: "http://84.150.220.144:9000/api",
    // apiUrl: "https://tn9ou3b56llhwvkh.myfritz.net:9000/api/",
    // apiUrl: "https://tn9ou3b56llhwvkh.myfritz.net:9000/api/",
    // apiUrl: "https://domasna-evidencija-client.herokuapp.com/api",
    apiUrl: "http://158.101.173.191:9000/api/",
  },
  prod: {
    // apiUrl: "http://0.0.0.0.0:9000/api",
    // apiUrl: "http://84.150.220.144:9000/api",
    // apiUrl: "http://192.168.178.30:9000/api",
    // apiUrl: "http://tn9ou3b56llhwvkh.myfritz.net:9000/api/",
    apiUrl: "http://158.101.173.191:9000/api/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;

  // return settings.staging;
  // return settings.dev;

  // if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  // if (Constants.expoConfig === "staging") return settings.staging;
  if (Constants.expoConfig === "development") return settings.dev;
  if (Constants.expoConfig === "production") return settings.prod;
  return settings.prod;
};

export default getCurrentSettings();
