import client from "./client";

const endpoint = "/banktransactionsbanksvals";

const getBankTransactions = () => client.get(endpoint);

const getBankTransactionsByBankId = (bank_id) =>
  client.get(endpoint + "?limit=500&bank_id=" + bank_id);

const getBankTransactionsByKomentar = (komentar, bank_id) =>
  client.get(
    endpoint + "?limit=500&komentar=" + komentar + "&bank_id=" + bank_id
  );

export const addBankTransaction = (banktransaction, onUploadProgress) => {
  console.log("START addBankTransaction");

  var data = {
    // banktransaction_id: banktransaction.banktransaction_id,
    datum: banktransaction.datum,
    bank_id: banktransaction.bank_id,
    transakcija: banktransaction.transakcija,
    izvadeno: banktransaction.izvadeno,
    staveno: banktransaction.staveno,
    valuta_id: banktransaction.valuta.value,
    komentar: banktransaction.komentar,
    insuser: banktransaction.insuser,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END addBankTransaction");

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const updateBankTransactions = (banktransaction, onUploadProgress) => {
  console.log("START updateBankTransactions");

  var data = {
    trans_id: banktransaction.trans_id,
    datum: banktransaction.datum,
    bank_id: banktransaction.bank_id,
    transakcija: banktransaction.transakcija,
    izvadeno: banktransaction.izvadeno,
    staveno: banktransaction.staveno,
    valuta_id: banktransaction.valuta.value,
    komentar: banktransaction.komentar,
    insuser: banktransaction.insuser,
    insdate: banktransaction.insdate,
    upduser: banktransaction.upduser,
    upddate: banktransaction.upddate,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END updateBankTransactions");

  return client.put(
    endpoint + "/" + banktransaction.trans_id,
    JSON.stringify(data),
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export const deleteBankTransaction = (banktransaction, onUploadProgress) => {
  console.log("START deleteBankTransaction");
  var data = {
    trans_id: banktransaction.trans_id,
  };
  console.log("data.trans_id = <" + data.trans_id + ">");

  console.log("END  deleteBankTransaction");

  return client.delete(endpoint + "/" + data.trans_id, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addBankTransaction,
  deleteBankTransaction,
  getBankTransactions,
  getBankTransactionsByBankId,
  getBankTransactionsByKomentar,
  updateBankTransactions,
};
