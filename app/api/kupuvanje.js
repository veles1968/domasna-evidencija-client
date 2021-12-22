import client from "./client";

const endpoint = "/kupuvanjesartsvids";

const getKupuvanjes = () => client.get(endpoint);

const getKupuvanjesByImeArtikal = (imeArtikal) =>
  client.get(endpoint + "?ime_artikal=" + imeArtikal);

export const addKupuvanje = (kupuvanje, onUploadProgress) => {
  console.log("START addKupuvanje");

  var data = {
    // kupdatum_id: kupuvanje.kupdatum_id,
    datum: kupuvanje.datum,
    ime_artikal: kupuvanje.ime_artikal,
    ime_vid: kupuvanje.ime_vid,
    total_amount: kupuvanje.total_amount,
    artikal_id: kupuvanje.artikal_id,
    valuta_id: kupuvanje.valuta.value,
    kolicina: kupuvanje.kolicina,
    kupovnacena: kupuvanje.kupovnacena,
    opis: kupuvanje.opis,
    cek: kupuvanje.cek,
    cek_id: kupuvanje.cek_id,
    vraboten_id: kupuvanje.vraboten_id,
    mesec_struja: kupuvanje.mesec_struja,
    rati_id: kupuvanje.rati_id,
    trans_id: kupuvanje.trans_id,
    steuerrelevant: kupuvanje.steuerrelevant,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END addKupuvanje");
  // localhost:9000/api/primanjas
  // return http.post("/primanjas", data);

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateKupuvanjes = (kupuvanje, onUploadProgress) => {
  console.log("START updateKupuvanjes");

  var data = {
    kupdatum_id: kupuvanje.kupdatum_id,
    datum: kupuvanje.datum,
    ime_artikal: kupuvanje.ime_artikal,
    ime_vid: kupuvanje.ime_vid,
    total_amount: kupuvanje.total_amount,
    artikal_id: kupuvanje.artikal_id,
    valuta_id: kupuvanje.valuta.value,
    kolicina: kupuvanje.kolicina,
    kupovnacena: kupuvanje.kupovnacena,
    opis: kupuvanje.opis,
    cek: kupuvanje.cek,
    cek_id: kupuvanje.cek_id,
    vraboten_id: kupuvanje.vraboten_id,
    mesec_struja: kupuvanje.mesec_struja,
    rati_id: kupuvanje.rati_id,
    trans_id: kupuvanje.trans_id,
    steuerrelevant: kupuvanje.steuerrelevant,
    insuser: kupuvanje.insuser,
    insdate: kupuvanje.insdate,
    upduser: kupuvanje.upduser,
    upddate: kupuvanje.upddate,
    updateDelete: "U",
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END updateKupuvanjes");
  // localhost:9000/api/primanjas
  // return http.post("/primanjas", data);
  // client.get(primanjabyime + "?ime_primanja=" + imeArtikal);

  return client.put(
    endpoint + "/" + kupuvanje.kupdatum_id,
    JSON.stringify(data),
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export const deleteKupuvanje = (kupuvanje, onUploadProgress) => {
  // export const deleteKupuvanje = (kupuvanje) => {
  console.log(">>>>>>>>>>>>>>>>> START deleteKupuvanje");
  // console.log("kupuvanje.kupdatum_id = <" + kupuvanje.kupdatum_id + ">");

  var data = {
    kupdatum_id: kupuvanje.kupdatum_id,
    datum: kupuvanje.datum,
    ime_artikal: kupuvanje.ime_artikal,
    ime_vid: kupuvanje.ime_vid,
    total_amount: kupuvanje.total_amount,
    artikal_id: kupuvanje.artikal_id,
    valuta_id: kupuvanje.valuta,
    kolicina: kupuvanje.kolicina,
    kupovnacena: kupuvanje.kupovnacena,
    opis: kupuvanje.opis,
    cek: kupuvanje.cek,
    cek_id: kupuvanje.cek_id,
    vraboten_id: kupuvanje.vraboten_id,
    mesec_struja: kupuvanje.mesec_struja,
    rati_id: kupuvanje.rati_id,
    trans_id: kupuvanje.trans_id,
    steuerrelevant: kupuvanje.steuerrelevant,
    insuser: kupuvanje.insuser,
    insdate: kupuvanje.insdate,
    upduser: kupuvanje.upduser,
    upddate: kupuvanje.upddate,
    updateDelete: "D",
  };

  console.log("data = " + JSON.stringify(data, null, 2));

  console.log("<<<<<<<<<<<<<<<<< END deleteKupuvanje");

  return client.put(
    endpoint + "/" + kupuvanje.kupdatum_id,
    JSON.stringify(data),
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );

  // return client.delete(
  //   // endpoint + "/" + kupuvanje.kupdatum_id,
  //   endpoint / JSON.stringify(data),
  //   {
  //     onUploadProgress: (progress) =>
  //       onUploadProgress(progress.loaded / progress.total),
  //   }
  // );
};

export default {
  addKupuvanje,
  deleteKupuvanje,
  getKupuvanjes,
  getKupuvanjesByImeArtikal,
  updateKupuvanjes,
};
