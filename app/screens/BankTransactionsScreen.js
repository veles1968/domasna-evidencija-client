import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import Moment from "moment";
import "moment/locale/de";
import { SearchBar } from "react-native-elements";
// import { useIsFocused } from "@react-navigation/native";
import { useIsFocused, useNavigation } from "@react-navigation/core";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists";
import bankTransactionsApi from "../api/banktransactions";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const initialBankTransactions = [
  {
    trans_id: 0,
    valuta_id: 9,
    datum: 0,
    transakcija: 0,
    izvadeno: 0,
    staveno: 0,
    komentar: "prazno",
    bank_id: 0,
    buchungstext: 0,
    empfaenger: 0,
    empfaenger_konto: 0,
    empfaenger_blz: 0,
    info: 0,
    insdate: 0,
    insuser: 0,
    upddate: 0,
    upduser: 0,
    ime_banka: 0,
    ime_valuta: 0,
  },
];

function BankTransactionsScreen({ route }) {
  const [bankTransactionsData, setBankTransactionsData] = useState(
    initialBankTransactions
  );
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("datum");
  const [isOldestFirst, setIsOldestFirst] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  Moment.locale("de");

  var banktransactions = route.params;
  if (banktransactions !== undefined) {
    const { id } = route.params.bank_id;
    console.log(
      "banktransactions = " + JSON.stringify(banktransactions, null, 2)
    );

    console.log("banktransactions.bank_id = " + banktransactions.bank_id);
  } else {
    banktransactions = null;
  }

  useEffect(() => {
    console.log("1. useEffect");

    let mounted = true;

    setKomentar("");
    setBankTransactionsData(initialBankTransactions);

    getAllBankTransactions(mounted);

    return () => (mounted = false);

    console.log("2. useEffect");
  }, [isFocused]);

  const getAllBankTransactions = async (mounted) => {
    console.log("START getAllBankTransactions-1");

    setLoading(true);

    var response = {};

    if (route.params) {
      response = await bankTransactionsApi.getBankTransactionsByBankId(
        banktransactions.bank_id
      );
    } else {
      response = await bankTransactionsApi.getBankTransactions();
    }
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      setBankTransactionsData(response.data);
    }

    console.log("END getAllBankTransactions-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setKomentar(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("komentar = " + komentar);
    console.log("text = " + text);

    setLoading(true);
    const response = await bankTransactionsApi.getBankTransactionsByKomentar(
      text,
      route.params.bank_id
    );
    setLoading(false);

    setError(!response.ok);
    setBankTransactionsData(response.data);

    console.log("error = " + error);

    console.log("END  handleChange");
  };

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  function getTitle(banktransactions) {
    return banktransactions.komentar;
  }

  function getSubTitle(banktransactions) {
    // Moment.locale("de");
    var datumLocale = banktransactions.datum;

    var plusMinus = "";

    if (banktransactions.transakcija === 1) {
      plusMinus = "+" + banktransactions.staveno;
    } else {
      plusMinus = "-" + banktransactions.izvadeno;
    }

    if (banktransactions.staveno === "0" && banktransactions.izvadeno === "0") {
      plusMinus = "";
    }

    return `Iznos: ${plusMinus} ${banktransactions.ime_valuta}\nDatum: ${Moment(
      datumLocale
    ).format("DD.MM.YYYY")}\nEmpfänger: ${banktransactions.empfaenger}\nBanka:${
      banktransactions.ime_banka
    }`;
  }

  const handleDelete = (banktransactions) => {
    // Delete the message from messagessetPrimanjaData(response.data);
    console.log("handleDelete");

    setBankTransactionsData(
      banktransactions.filter((m) => m.trans_id !== banktransactions.trans_id)
    );
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button title="Povtori" onPress={getAllBankTransactions}></Button>
        </>
      )}
      {/* Begin: Search by KOMENTAR */}
      <SearchBar
        style={{ height: 40, borderColor: "white", borderWidth: 1 }}
        placeholder={"Komentar"}
        onChangeText={handleChange}
        value={komentar}
      />
      {/* End: Search by KOMENTAR */}

      <FlatList
        ListHeaderComponent={<></>}
        data={bankTransactionsData}
        keyExtractor={(item) => item.trans_id.toString()}
        renderItem={({ item }) => (
          <Card
            key={item.trans_id}
            title={getTitle(item)}
            subTitle={getSubTitle(item)}
            onPress={() => {
              navigation.navigate(routes.BANKTRANSACTION_EDIT, item);
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BankTransactionsScreen;
