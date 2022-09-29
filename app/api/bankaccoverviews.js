import client from "./client";

const endpoint = "/btrsum";

const getBankAccOverviews = () => client.get(endpoint);

const getBankAccOverviewsByImeBanka = (imeBanka) =>
  client.get(endpoint + "?ime_banka=" + imeBanka);

const getBankAccOverviewsByBankCalc = (bankCalc) =>
  client.get(endpoint + "?bank_calc=" + bankCalc);

export default {
  getBankAccOverviews,
  getBankAccOverviewsByBankCalc,
  getBankAccOverviewsByImeBanka,
};
