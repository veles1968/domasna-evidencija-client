import client from "./client";

const endpoint = "/primanjasvalsvrabs";
const saveendpoint = "/kupuvanjes";

const getPrimanjas = () => client.get(endpoint);

const getPrimanjasByTip = (tipNaPrimanje) =>
  client.get(endpoint + "?tip_primanje=" + tipNaPrimanje);

export const addPrimanja = (primanja, onUploadProgress) => {
  console.log("START addPrimanja");

  var data = {
    // primanja_id: primanja.primanja_id,
    valuta_id: primanja.valuta.value,
    vraboten_id: primanja.vraboten.value,
    iznos: primanja.iznos,
    mesec: primanja.mesec,
    tip_primanje: primanja.tip_primanje,
    datum: primanja.datum,
    odnossodem: primanja.odnossodem,
    vobanka: primanja.vobanka,
    trans_id: primanja.trans_id,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END addPrimanja");
  // localhost:9000/api/kupuvanjes
  // return http.post("/kupuvanjes", data);

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updatePrimanjas = (primanja, onUploadProgress) => {
  console.log("START updatePrimanjas");

  var data = {
    primanja_id: primanja.primanja_id,
    valuta_id: primanja.valuta.value,
    vraboten_id: primanja.vraboten.value,
    iznos: primanja.iznos,
    mesec: primanja.mesec,
    tip_primanje: primanja.tip_primanje,
    datum: primanja.datum,
    odnossodem: primanja.odnossodem,
    vobanka: primanja.vobanka,
    trans_id: primanja.trans_id,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END updatePrimanjas");
  // localhost:9000/api/kupuvanjes
  // return http.post("/kupuvanjes", data);
  // client.get(primanjabyime + "?ime_primanja=" + tipNaPrimanje);

  return client.put(
    endpoint + "/" + primanja.primanja_id,
    JSON.stringify(data),
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export const deletePrimanja = (primanja_id, onUploadProgress) => {
  console.log("START deletePrimanja");
  // console.log("primanja.primanja_id = <" + primanja.primanja_id + ">");
  console.log("primanja_id = <" + primanja_id + ">");

  var data = {
    primanja_id: primanja_id,
  };

  console.log("END  deletePrimanja");

  // if (primanja.primanja_id === undefined) return;

  return client.delete(endpoint + "/" + primanja_id, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addPrimanja,
  deletePrimanja,
  getPrimanjas,
  getPrimanjasByTip,
  updatePrimanjas,
};
