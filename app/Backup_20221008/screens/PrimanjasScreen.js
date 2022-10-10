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
import { useIsFocused } from "@react-navigation/native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import primanjasApi from "../api/primanja";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

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
    value: "tip_primanje",
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

const initialPrimanja = [
  {
    primanja_id: 0,
    valuta_id: 9,
    vraboten_id: 0,
    iznos: 0,
    mesec: 0,
    tip_primanje: "prazno",
    datum: 0,
    odnossodem: 0,
    vobanka: 0,
    trans_id: 0,
    insdate: 0,
    insuser: 0,
    upddate: 0,
    upduser: 0,
    ime_vraboten: 0,
    ime_valuta: 0,
  },
];

function PrimanjasScreen({ navigation }) {
  const [primanjaData, setPrimanjaData] = useState(initialPrimanja);
  const [tipPrimanje, setTipPrimanje] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("datum");
  const [primanjaSorted, setPrimanjaSorted] = useState([]);
  const [isOldestFirst, setIsOldestFirst] = useState(false);
  const isFocused = useIsFocused();

  Moment.locale("de");

  useEffect(() => {
    console.log("1. useEffect");

    if (tipPrimanje) {
      handleChange();
    } else {
      getAllPrimanjas();
    }

    console.log("sortType = " + sortType);

    console.log("2. useEffect");
  }, [isFocused]);

  const getAllPrimanjas = async () => {
    console.log("START getAllPrimanjas-1");

    setLoading(true);
    const response = await primanjasApi.getPrimanjas();
    setLoading(false);

    setError(!response.ok);

    setPrimanjaData(response.data);

    console.log("END getAllPrimanjas-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setTipPrimanje(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("tipPrimanje = " + tipPrimanje);
    console.log("text = " + text);

    setLoading(true);
    const response = await primanjasApi.getPrimanjasByTip(text);
    setLoading(false);

    setError(!response.ok);
    setPrimanjaData(response.data);

    // let primanjaData = primanjaData.map(primanje => {
    //   primanje.datum_locale = "01.01.2021";
    // });

    // console.log("primanjaData = " + JSON.stringify(primanjaData, null, 2));

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
          // setSortType(...item.value);
          // setSortType(item);
          // console.log("2. renderItem, sortType = " + sortType);
          sortFlatList(item.value);
          // toggleSortDate(item.value);
        }}
        style={{ backgroundColor }}
      />
    );
  };
  {
    /* End: Process the tapping on sorting buttons */
  }

  {
    /* Begin: Sort by DATUM, TIP_PRIMANJE, VID */
  }
  const sortFlatList = (type) => {
    console.log("START sortFlatList, type=" + type);

    // const { sortedData, ...sortControls } = useSort(primanjaData, type);

    const types = {
      datum: "datum",
      tip_primanje: "tip_primanje",
      iznos: "iznos",
    };

    setSortType(type, console.log("2. sortType = " + sortType));
    console.log("4. isOldestFirst = " + isOldestFirst);

    const sorted = [...primanjaData].sort((a, b) => {
      if (sortType === "datum") {
        if (isOldestFirst) {
          return a.datum > b.datum; // -> oldest first
        } else {
          return a.datum < b.datum; // -> newest first
        }
      } else if (type === "tip_primanje") {
        console.log("SORT BY TIP_PRIMANJE ASC");
        if (sortType !== "tip_primanja") {
          return a.tip_primanje.toUpperCase() > b.tip_primanje.toUpperCase();
        } else {
          return a.tip_primanje.toUpperCase() < b.tip_primanje.toUpperCase();
        }
      }
    });

    setPrimanjaData(sorted);

    setIsOldestFirst(!isOldestFirst);

    console.log("END sortFlatList");
  };
  {
    /* End: Sort by DATUM, TIP_PRIMANJE, VID */
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

  function getTitle(primanja) {
    return primanja.tip_primanje;
  }

  function getSubTitle(primanja) {
    // Moment.locale("de");
    var datumLocale = primanja.datum;
    // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others

    // console.log("1. primanja.datum = <" + primanja.datum + ">");
    // console.log("2. datumLocale = <" + datumLocale + ">");
    // console.log("3. primanja.tip_primanje = <" + primanja.tip_primanje + ">");

    return `Iznos: ${primanja.iznos} ${primanja.ime_valuta}\nDatum: ${Moment(
      datumLocale
    ).format("DD.MM.YYYY")}\nVraboten: ${primanja.ime_vraboten}`;
  }

  const handleDelete = (primanja) => {
    // Delete the message from messagessetPrimanjaData(response.data);
    console.log("handleDelete");

    setPrimanjaData(
      primanja.filter((m) => m.primanja_id !== primanja.primanja_id)
    );
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button title="Povtori" onPress={getAllPrimanjas}></Button>
        </>
      )}
      {/* Begin: Search by TIP_PRIMANJE */}
      <SearchBar
        style={{ height: 40, borderColor: "white", borderWidth: 1 }}
        placeholder={"Tip na Primanje"}
        onChangeText={handleChange}
        value={tipPrimanje}
      />
      {/* End: Search by TIP_PRIMANJE */}

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
        data={primanjaData}
        keyExtractor={(item) => item.primanja_id.toString()}
        renderItem={({ item }) => (
          <Card
            // ARTIKAL_ID     = item[0]
            // VID_ID         = item[1]
            // DATUM    = item[2]
            // TIP_PRIMANJE           = item[3]
            // STEUERRELEVANT = item[4]
            // INSDATE        = item[5]
            // INSUSER        = item[6]
            // UPDDATE        = item[7]
            // UPDUSER        = item[8]
            // key={item[0]}
            key={item.primanja_id}
            title={getTitle(item)}
            subTitle={getSubTitle(item)}
            onPress={() => {
              navigation.navigate(routes.PRIMANJA_EDIT, item);
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
            // onPress={() => navigation.navigate(routes.ARTIKAL_DETAILS, item)}
            // onPress={() =>
            //   console.log(
            //     convertUTCDateToLocalDate(new Date(item.datum)).toLocaleString()
            //   )
            // }
            // onPress={() => console.log(item[3])}
            // onPress={() => console.log(JSON.stringify(item).primanja_id)}
            // onPress={() => console.log(JSON.stringify(item))}
            // onPress={() => console.log(item.json({ "content": primanja_id }))}
            // onPress={() => console.log(item.primanja_id)}
          />
        )}
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

export default PrimanjasScreen;
