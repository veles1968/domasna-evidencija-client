import axios from "axios";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import "moment/locale/de";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { TextInput } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import artikalsApi from "../api/artikals";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import KupuvanjeEditScreen from "./KupuvanjeEditScreen";
import kupuvanjesApi from "../api/kupuvanje";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import NewListingButton from "../navigation/NewListingButton";

// import { NavigationContainer } from "@react-navigation/native";
// import navigationTheme from "../navigation/navigationTheme";
// import { navigationRef } from "../navigation/rootNavigation";
// import AppNavigator from "../navigation/AppNavigator";
// import KupuvanjeNavigator from "../navigation/KupuvanjeNavigator";

// 08.04.2021
// import { useRoute } from "@react-navigation/native";

// const Tab = createBottomTabNavigator();

// Begin: Fields for sorting-buttons
const fieldNames = [
  {
    id: "1",
    title: "D",
    value: "datum",
  },
  {
    id: "2",
    title: "T",
    value: "ime_artikal",
  },
  {
    id: "3",
    title: "I",
    value: "total_amount",
  },
];
// End: Fields for sorting-buttons

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const initialKupuvanje = [
  {
    datum: 0,
    kupdatum_id: 0,
    ime_artikal: 0,
    ime_vid: 0,
    total_amount: 0,
    artikal_id: 0,
    valuta_id: 9,
    kolicina: 0,
    kupdatum_id: 0,
    kupovnacena: 0,
    opis: 0,
    cek: 0,
    cek_id: 0,
    vraboten_id: 0,
    mesec_struja: 0,
    rati_id: 0,
    trans_id: 0,
    steuerrelevant: 0,
    insuser: 0,
    insdate: 0,
    upduser: 0,
    upddate: 0,
    ime_vraboten: 0,
    ime_valuta: 0,
  },
];

function KupuvanjesScreen({ route }) {
  const [kupuvanjeData, setKupuvanjeData] = useState(initialKupuvanje);
  const [imeArtikal, setImeArtikal] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("datum");
  const [primanjaSorted, setPrimanjaSorted] = useState([]);
  const [isOldestFirst, setIsOldestFirst] = useState(false);
  const isFocused = useIsFocused();
  //   var screenActive = true;

  const navigation = useNavigation();

  // Begin 08.04.2021
  // const route = useRoute();
  // console.log("route.name = " + route.name);
  // End 08.04.2021^

  Moment.locale("de");

  useEffect(() => {
    console.log("1. useEffect");

    let mounted = true;
    getAllKupuvanjes(mounted);

    if (route.params) {
    }

    // if (imeArtikal) {
    //   handleChange();
    // } else {
    //   getAllKupuvanjes();
    // }

    console.log("sortType = " + sortType);

    console.log("2. useEffect");

    return () => (mounted = false);
  }, [isFocused]);

  const getAllKupuvanjes = async (mounted) => {
    console.log("START getAllKupuvanjes-1");

    setLoading(true);
    const response = await kupuvanjesApi.getKupuvanjes();
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      setKupuvanjeData(response.data);
    }

    console.log("END getAllKupuvanjes-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setImeArtikal(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("imeArtikal = " + imeArtikal);
    console.log("text = " + text);

    setLoading(true);
    const response = await kupuvanjesApi.getKupuvanjesByImeArtikal(text);
    setLoading(false);

    setError(!response.ok);
    setKupuvanjeData(response.data);

    console.log("error = " + error);

    console.log("END  handleChange");
  };

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

  {
    /* Begin: Sort by DATUM, IME_ARTIKAL, TOTAL_AMOUNT */
  }
  const sortFlatList = (type) => {
    console.log("START sortFlatList, type=" + type);

    const types = {
      datum: "datum",
      ime_artikal: "ime_artikal",
      total_amount: "total_amount",
    };

    setSortType(type, console.log("2. sortType = " + sortType));

    console.log("4. isOldestFirst = " + isOldestFirst);

    const sorted = [...kupuvanjeData].sort((a, b) => {
      if (sortType === "datum") {
        if (isOldestFirst) {
          return a.datum > b.datum; // -> oldest first
        } else {
          return a.datum < b.datum; // -> newest first
        }
      } else if (type === "ime_artikal") {
        console.log("SORT BY IME_ARTIKAL ASC");
        if (sortType !== "ime_artikal") {
          return a.ime_artikal.toUpperCase() > b.ime_artikal.toUpperCase();
        } else {
          return a.ime_artikal.toUpperCase() < b.ime_artikal.toUpperCase();
        }
      }
    });

    setPrimanjaData(sorted);

    setIsOldestFirst(!isOldestFirst);

    console.log("END sortFlatList");
  };
  {
    /* End: Sort by DATUM, IME_ARTIKAL, TOTAL_AMOUNT */
  }

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  function getTitle(kupuvanje) {
    return kupuvanje.ime_artikal;
  }

  function getSubTitle(kupuvanje) {
    Moment.locale("de");
    var datumLocale = kupuvanje.datum;

    return `Iznos: ${kupuvanje.total_amount} ${
      kupuvanje.ime_valuta
    }\nDatum: ${Moment(datumLocale).format("DD.MM.YYYY")}\nOpis: ${
      kupuvanje.opis
    }`;
  }

  const handleDelete = (kupuvanje) => {
    // Delete the message from messagessetPrimanjaData(response.data);
    console.log("handleDelete");

    setPrimanjaData(
      kupuvanje.filter((m) => m.kupdatum_id !== kupuvanje.kupdatum_id)
    );
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button title="Povtori" onPress={getAllKupuvanjes}></Button>
        </>
      )}
      {/* Begin: Search by IME_ARTIKAL */}
      <SearchBar
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder={"Ime na Artikal"}
        onChangeText={handleChange}
        value={imeArtikal}
      />
      {/* End: Search by IME_ARTIKAL */}

      {/* Begin: Sorting buttons on the top of the screen above the data-flat list */}
      <FlatList
        data={fieldNames}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      {/* End: Sorting buttons on the top of the screen above the data-flat list */}

      <FlatList
        data={kupuvanjeData}
        keyExtractor={(item) => item.kupdatum_id.toString()}
        renderItem={({ item }) => (
          <Card
            // ARTIKAL_ID     = item[0]
            // VID_ID         = item[1]
            // DATUM    = item[2]
            // IME_ARTIKAL           = item[3]
            // STEUERRELEVANT = item[4]
            // INSDATE        = item[5]
            // INSUSER        = item[6]
            // UPDDATE        = item[7]
            // UPDUSER        = item[8]
            // key={item[0]}
            key={item.kupdatum_id}
            title={getTitle(item)}
            subTitle={getSubTitle(item)}
            onPress={() => {
              navigation.navigate(routes.KUPUVANJE_EDIT, item);
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20, //+-DT-20210503: Changed from 20 to 1
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

export default KupuvanjesScreen;
