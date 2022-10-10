import client from "./client";

const endpoint = "/banks";
const saveendpoint = "/bankss";

// apiUrl: "http://localhost:9000/api", // LAN Karlsruhe
const getBanks = () => client.get(endpoint);

const getBankByIme = (imeBank) =>
  client.get(endpoint + "?ime_banka=" + imeBank);

export const addBank = (bank, onUploadProgress) => {
  var data = {
    ime_banka: bank.ime_banka,
    vid_id: bank.vid.value,
    cena: bank.cena,
    steuerrelevant: bank.steuerrelevant,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END addBank");
  // localhost:9000/api/bankss
  // return http.post("/bankss", data);

  return client.post(saveendpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
  return "";
};

export const updateBank = (bank, onUploadProgress) => {
  console.log("START updateBank");

  var data = {
    bank_id: bank.bank_id,
    ime_banka: bank.ime_banka,
    vid_id: bank.vid.value,
    cena: bank.cena,
    steuerrelevant: bank.steuerrelevant,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END updateBank");

  return client.put(saveendpoint + "/" + bank.bank_id, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addBank,
  getBanks,
  getBankByIme,
  updateBank,
};
