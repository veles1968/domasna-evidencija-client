import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { TextInput } from "react-native";
import axios from "axios";
import Moment from "moment";
import "moment/locale/de";
import NumberFormat from "react-number-format";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import artikalsApi from "../api/artikals";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import bankAccOverviewsApi from "../api/bankaccoverviews";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
// import { currencyEurFormat } from "../services/Format/Date";

// Begin: Fields for sorting-buttons
const fieldNames = [
  {
    id: "1",
    title: "BO",
    value: "bankorder",
  },
  {
    id: "2",
    title: "IB",
    value: "imebanka",
  },
  {
    id: "3",
    title: "I",
    value: "iznos",
  },
];
// End: Fields for sorting-buttons

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const initialBankAccOverview = [
  {
    bank_id: 0,
    ime_banka: "prazno",
    bank_order: 0,
    ime_valuta: "prazno",
    sum_sta_minus_izv: 0,
    bank_calc: 1,
  },
];

function BankAccOverviewsScreen({ route }) {
  const [bankAccOverviewData, setBankAccOverviewData] = useState(
    initialBankAccOverview
  );
  const [imeBanka, setImeBanka] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("bank_order");
  const [bankAccOverviewSorted, setBankAccOverviewSorted] = useState([]);
  const [isSmallestFirst, setIsSmallestFirst] = useState(false);
  const isFocused = useIsFocused();
  const [isEnabled, setIsEnabled] = useState(false);
  const [bankCalc, setBankCalc] = useState(100);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      previousState ? setBankCalc(100) : setBankCalc(1);
      return !previousState;
    }, getAllBankAccOverviewsByBankCalc());

  const navigation = useNavigation();

  Moment.locale("de");

  useEffect(() => {
    console.log("1. useEffect");

    let mounted = true;
    getAllBankAccOverviews(mounted);

    if (route.params) {
    } else {
      setBankAccOverviewData(initialBankAccOverview);
    }

    // if (imeBanka) {
    //   handleChange();
    // } else {
    //   getAllBankAccOverviews();
    // }

    console.log("sortType = " + sortType);

    console.log("2. useEffect");

    return () => (mounted = false);
  }, [isFocused]);

  const getAllBankAccOverviews = async (mounted) => {
    console.log("START getAllBankAccOverviews-1");

    setLoading(true);
    const response = await bankAccOverviewsApi.getBankAccOverviews(0);
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      setBankAccOverviewData(response.data);
    }

    console.log("END getAllBankAccOverviews-1");
    return response;
  };

  const getAllBankAccOverviewsByBankCalc = async () => {
    console.log("START getAllBankAccOverviewsByBankCalc-1");

    const allBanks = "100";

    // const bankCalc = isEnabled ? 1 : allBanks;
    console.log("isEnabled = " + isEnabled);
    console.log("bankCalc = " + bankCalc);

    setLoading(true);
    const response = await bankAccOverviewsApi.getBankAccOverviewsByBankCalc(
      bankCalc
    );
    setLoading(false);

    setError(!response.ok);

    setBankAccOverviewData(response.data);

    console.log("END getAllBankAccOverviewsByBankCalc-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setImeBanka(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("imeBanka = " + imeBanka);
    console.log("text = " + text);

    setLoading(true);
    const response = await bankAccOverviewsApi.getBankAccOverviewsByImeBanka(
      text
    );
    setLoading(false);

    setError(!response.ok);
    setBankAccOverviewData(response.data);

    console.log("error = " + error);

    console.log("END  handleChange");
  };

  {
    /* Begin: Sort by BANK_ORDER, IME_BANKA, SUM_STA_MINUS_IZV */
  }
  const sortFlatList = (type) => {
    console.log("START sortFlatList, type=" + type);

    const types = {
      bankorder: "bank_order",
      imebanka: "ime_banka",
      iznos: "sum_sta_minus_izv",
    };

    setSortType(type, console.log("2. sortType = " + sortType));
    // const sortProperty = types[type];
    // const sortProperty = fieldNames[type];
    // console.log("1. sortProperty = " + JSON.stringify(sortProperty));
    // console.log("1. type = " + type);
    // console.log("2. sortType = " + sortType);

    console.log("4. isSmallestFirst = " + isSmallestFirst);

    const sorted = [...bankAccOverviewData].sort((a, b) => {
      if (sortType === "bank_order") {
        if (isSmallestFirst) {
          return a.bank_order > b.bank_order; // ->
        } else {
          return a.bank_order < b.bank_order; // ->
        }
      } else if (type === "ime_banka") {
        console.log("SORT BY IME_BANKA ASC");
        if (sortType !== "ime_banka") {
          return a.imebanka.toUpperCase() > b.imebanka.toUpperCase();
        } else {
          return a.imebanka.toUpperCase() < b.imebanka.toUpperCase();
        }
      } else if (type === "sum_sta_minus_izv") {
        if (isSmallestFirst) {
          return a.sum_sta_minus_izv > b.sum_sta_minus_izv; // ->
        } else {
          return a.sum_sta_minus_izv < b.sum_sta_minus_izv; // ->
        }
      }
    });

    // console.log("4. sorted = " + JSON.stringify(sorted, null, 2));

    setBankAccOverviewData(sorted);

    setIsSmallestFirst(!isSmallestFirst);

    console.log("END sortFlatList");
  };
  {
    /* End: Sort by BANK_ORDER, IME_BANKA, SUM_STA_MINUS_IZV */
  }

  {
    /* Begin: Process the tapping on sorting buttons */
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        key={item.id}
        onPress={() => {
          setSelectedId(item.id);
          console.log("1. renderItem, item.value = " + item.value);
          sortFlatList(item.value);
        }}
        style={{ backgroundColor }}
      />
    );
  };
  {
    /* End: Process the tapping on sorting buttons */
  }

  function SumStaMinusIzv({ bankAccOverview }) {
    return (
      <Text>
        <NumberFormat
          value={bankAccOverview}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"EUR"}
        />
      </Text>
    );
  }

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button title="Povtori" onPress={getAllBankAccOverviews}></Button>
        </>
      )}
      {/* Begin: Search by IME_BANKA */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={handleChange}
        value={imeBanka}
        placeholder={"Ime na Banka"}
      />
      {/* End: Search by IME_BANKA */}

      {/* Begin: Sorting buttons on the top of the screen above the data-flat list */}
      <FlatList
        data={fieldNames}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      {/* End: Sorting buttons on the top of the screen above the data-flat list */}

      <CheckBox
        center
        title="Site Banki"
        checked={isEnabled}
        onPress={toggleSwitch}
      />

      <FlatList
        data={bankAccOverviewData}
        keyExtractor={(item) => item.bank_id.toString() + item.ime_valuta}
        renderItem={({ item }) => (
          <Card
            key={item.bank_id + item.ime_valuta}
            title={`${item.ime_banka}`}
            subTitle={`${Number(item.sum_sta_minus_izv).toFixed(2)} ${
              item.ime_valuta
            }`}
            onPress={() => {
              navigation.navigate(routes.BANKTRANSACTIONS_LIST, item);
              // console.log("item.bank_id = " + item.bank_id);
            }}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
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

export default BankAccOverviewsScreen;
