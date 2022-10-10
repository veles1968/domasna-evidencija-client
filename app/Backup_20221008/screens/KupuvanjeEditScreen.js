import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  // Text,
  // TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Moment from "moment";
import { SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import {
  DeleteButton,
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import AppTextInput from "../components/TextInput";
import artikalsApi from "../api/artikals";
import Button from "../components/Button";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Card from "../components/Card";
import colors from "../config/colors";
import kupuvanjesApi from "../api/kupuvanje";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/TextInput";
import TextInput from "../components/TextInput";
import UploadScreen from "./UploadScreen";
import valutasApi from "../api/valutas";
import vidsApi from "../api/vids";

const validationSchema = Yup.object().shape({
  kupdatum_id: Yup.string().label("ID"),
  ime_artikal: Yup.string().label("Ime na Artikal"),
  datum: Yup.string().required().min(1).label("Datum"),
  opis: Yup.string().label("Opis"),
  valuta: Yup.object()
    .required("Valuta e obavezno da se vnese")
    .nullable()
    .label("kupuvanje.valuta_id"),
});

function KupuvanjeEditScreen({ route }) {
  const [artikalData, setArtikalData] = useState([]);
  const [artikalId, setArtikalId] = useState("");
  const [kupovnaCena, setKupovnaCena] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [error, setError] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [imeArtikal, setImeArtikal] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("date");
  const [progress, setProgress] = useState(0);
  const [selectedArtikal, setSelectedArtikal] = useState("");
  const [show, setShow] = useState(false);
  const [valutaData, setValutaData] = useState([]);
  const [uploadVisible, setUploadVisible] = useState(false);

  const navigation = useNavigation();

  Moment.locale("de");

  let isAddMode = true;
  const kupuvanje = route.params;
  if (kupuvanje !== undefined) {
    const { id } = kupuvanje.kupdatum_id;

    console.log("1. id = " + id);
    console.log("kupuvanje = " + JSON.stringify(kupuvanje, null, 2));

    isAddMode = !kupuvanje.kupdatum_id;

    console.log("isAddMode = " + isAddMode);
    console.log("kupuvanje.kupdatum_id = " + kupuvanje.kupdatum_id);
    console.log("kupuvanje.valuta_id = " + kupuvanje.valuta_id);
    console.log("kupuvanje.vraboten_id = " + kupuvanje.vraboten_id);
    console.log("2. id = " + id);
  } else {
    // setIsEnabled(false);
  }

  useEffect(() => {
    console.log("START *********** useEffect ***********");

    let mounted = true;

    getAllValutas(mounted);
    getAllArtikals(mounted);

    if (route.params) {
    }

    if (!isAddMode) {
      setDisplayForm(true);
    }

    console.log("END ************ useEffect ************");

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // console.log("artikalData.length = <" + artikalData.length + ">");
  }, [artikalData]);

  useEffect(() => {
    // console.log("fullData.length = <" + fullData.length + ">");
  }, [fullData]);

  const getAllArtikals = async (mounted) => {
    // console.log("START getAllArtikals-1");

    setLoading(true);
    const response = await artikalsApi.getArtikals();
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      // console.log("1. setArtikalData");
      setArtikalData(response.data);
      // console.log("2. setArtikalData");
      setFullData(response.data);
    }

    // console.log("END getAllArtikals-1");
    return response;
  };

  const getAllValutas = async (mounted) => {
    // console.log("START getAllValutas-1");

    setLoading(true);
    const response = await valutasApi.getValutas();
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      setValutaData(response.data);
    }

    // console.log("END getAllValutas-1");
    return response;
  };

  const getInsDate = () => {
    // console.log("START getInsDate");

    if (isAddMode) {
      // console.log("IME_ARTIKAL = <>");

      return "";
    } else {
      // console.log("END getInsDate");
      // var datumLocale = kupuvanje.insdate;
      // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others

      return Moment(kupuvanje.insdate).format("DD.MM.YYYY");
    }
  };

  const getTransId = () => {
    // console.log("START getTransId");

    if (isAddMode) {
      return "";
    } else {
      // console.log("END getTransId");
      if (kupuvanje.trans_id) {
        return kupuvanje.trans_id.toString();
      } else {
        return "";
      }
    }
  };

  const getDatum = () => {
    if (isAddMode) {
      return Moment(date).format("DD.MM.YYYY");
    } else {
      if (datePicker) {
        return Moment(date).format("DD.MM.YYYY");
      } else {
        var datumLocale = kupuvanje.datum;
        return Moment(datumLocale).format("DD.MM.YYYY");
      }
    }
  };

  const getOpis = () => {
    if (isAddMode) {
      return "";
    } else {
      if (kupuvanje.opis) {
        return kupuvanje.opis.toString();
      } else {
        return "";
      }
    }
  };

  // const deleteExecution = async (kupuvanje2, { resetForm }) => {
  const deleteExecution = async (kupuvanje2) => {
    // const deleteExecution = async () => {

    console.log("START deleteExecution");

    setProgress(0);
    setUploadVisible(true);
    var result;

    kupuvanje2.artikal_id = kupuvanje.artikal_id;
    kupuvanje2.kupdatum_id = kupuvanje.kupdatum_id;

    result = await kupuvanjesApi.deleteKupuvanje(
      { ...kupuvanje2 },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not delete the kupuvanje");
    }

    navigation.goBack(null);

    // navigation.navigate(routes.PRIMANJA_LIST);
    // if (!isAddMode) {
    //   resetForm();
    // }

    console.log("END deleteExecution");
  };

  const handleDelete = async () => {
    console.log("START handleDelete");

    console.log("kupuvanje.kupdatum_id = " + kupuvanje.kupdatum_id);
    console.log("kupuvanje.artikal_id = " + kupuvanje.artikal_id);

    Alert.alert(
      "Brishenje",
      `Dali sakate da go izbrishete kupuvanjeto ${kupuvanje.ime_artikal}?`,
      [
        {
          text: "Ne",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        { text: "Da", onPress: () => deleteExecution(kupuvanje) },
      ],
      { cancelable: false }
    );
    console.log("END handleDelete");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const onChangeDatePicker = (event, selectedDate) => {
    console.log("START onChangeDatePicker");

    console.log("selectedDate = " + selectedDate);

    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    console.log("date = " + date);

    setDatePicker(true); //+DT-20211125

    console.log("END onChangeDatePicker");
  };

  const handleSubmit = async (kupuvanje2, { resetForm }) => {
    console.log("START handleSubmit");

    console.log("1. kupuvanje2 = " + JSON.stringify(kupuvanje2, null, 2));

    kupuvanje2.datum = getDatum();

    setProgress(0);
    setUploadVisible(true);
    console.log("");

    var result;

    if (isAddMode) {
      kupuvanje2.artikal_id = artikalId;
      kupuvanje2.kupovnacena = kupovnaCena;
      result = await kupuvanjesApi.addKupuvanje({ ...kupuvanje2 }, (progress) =>
        setProgress(progress)
      );
    } else {
      kupuvanje2.artikal_id = kupuvanje.artikal_id;
      kupuvanje2.kupovnacena = kupuvanje.kupovnacena;
      kupuvanje2.insuser = kupuvanje.insuser;
      result = await kupuvanjesApi.updateKupuvanjes(
        { ...kupuvanje2 },
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the kupuvanje");
    }

    if (isAddMode) {
      resetForm();
    } //-DT-20210203: Causes the changed field name to get the old value again

    console.log("END handleSubmit");
  };

  const handleSearch = (text) => {
    console.log("START handleSearch");

    setDisplayForm(false);

    const formattedQuery = text.toLowerCase();
    // console.log("formattedQuery = <" + formattedQuery + ">");

    const filteredData = fullData.filter((artikal) => {
      return contains(artikal, formattedQuery);
    });
    if (filteredData.length < 21) {
      // console.log("filteredData = " + JSON.stringify(filteredData, null, 2));
    } else {
      // console.log("More than 20 Artikals");
    }

    // filteredData.sort();
    setArtikalData(filteredData);
    setImeArtikal(text);
    // setDisplayForm(true);

    console.log("END handleSearch");
  };

  const contains = ({ ime_artikal, ime_vid }, query) => {
    // const { ime_artikal } = artikal;
    // console.log("ime_artikal = <" + ime_artikal + ">");
    // console.log("query = <" + query + ">");

    // if (ime_artikal.includes(query)) {
    if (ime_artikal.toLowerCase().search(query) > -1) {
      // console.log("ime_artikal.search(query) = " + ime_artikal.search(query));

      return true;
    }

    return false;
  };

  function renderHeader() {
    return (
      <SearchBar
        lightTheme
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Vnesi Artikal"
        round
        value={imeArtikal}
      />
    );
  }

  return (
    <Screen style={styles.screen} editScreen>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />

      {isAddMode && (
        <FlatList
          data={artikalData}
          initialNumToRender={3}
          keyExtractor={(item) => item.artikal_id.toString()}
          ListHeaderComponent={
            <>
              <SearchBar
                lightTheme
                onChangeText={handleSearch}
                placeholder="Vnesi Artikal"
                round
                value={imeArtikal}
              />
            </>
          }
          renderItem={({ item }) => (
            <Card
              key={item.artikal_id}
              title={item.ime_artikal}
              subTitle={`Cena: ${item.cena}\nVid: ${item.ime_vid}`}
              onPress={() => {
                setDisplayForm(true);
                setArtikalData("");
                setSelectedArtikal(
                  `${item.ime_artikal} / ${item.cena} / ${item.ime_vid}`
                );
                // 6;
                console.log(
                  `Artikal ID has been selected: ${item.ime_artikal} / ${item.artikal_id} / ${item.cena}`
                );
                setArtikalId(item.artikal_id);
                setKupovnaCena(item.cena);
              }}
            />
          )}
          stickyHeaderIndices={[0]}
          value={imeArtikal}
          ListFooterComponent={
            displayForm ? null : <AppTextInput>Nema Banki</AppTextInput>
          }
        />
      )}

      {displayForm && (
        <Form
          initialValues={{
            kupdatum_id: isAddMode ? "" : kupuvanje.kupdatum_id.toString(),
            datum: getDatum(),
            ime_artikal: isAddMode ? "" : kupuvanje.ime_artikal.toString(),
            kolicina: isAddMode ? "" : kupuvanje.kolicina.toString(),
            artikal_id: isAddMode ? "" : kupuvanje.artikal_id.toString(),

            valuta: {
              label: isAddMode ? "EUR" : kupuvanje.ime_valuta.toString(),
              value: isAddMode ? "9" : kupuvanje.valuta_id,
            },
            valuta_id: isAddMode ? "9" : kupuvanje.valuta_id.toString(),

            vraboten_id: isAddMode ? "1" : kupuvanje.vraboten_id.toString(),

            opis: getOpis(),

            steuerrelevant: isAddMode
              ? "0"
              : kupuvanje.steuerrelevant.toString(),

            trans_id: isAddMode ? "" : getTransId(),
            insdate: isAddMode ? "" : getInsDate(),
            insuser: isAddMode ? "" : kupuvanje.insuser,
            kupovnaCena: isAddMode ? "" : kupuvanje.kupovnaCena,
          }}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          validationSchema={validationSchema}
        >
          {isAddMode && (
            <FormField
              editable={false}
              maxLength={50}
              name="ime_artikal"
              placeholder="Artikal"
              value={isAddMode && selectedArtikal}
              width="100%"
            />
          )}
          {!isAddMode && (
            <FormField
              editable={false}
              maxLength={50}
              name="ime_artikal"
              placeholder="Artikal"
              // value={selectedArtikal}
              width="100%"
            />
          )}
          <Button onPress={showDatepicker} title="Odberi Datum" />

          {show && (
            <DateTimePicker
              dateFormat="dayofweek day month"
              display="default"
              is24Hour={true}
              locale="de-DE"
              minimumDate={new Date(1990, 0, 1)}
              mode={mode}
              onChange={onChangeDatePicker}
              testID="dateTimePicker"
              value={date}
            />
          )}

          <FormField
            maxLength={255}
            name="datum"
            keyboardType="numeric"
            placeholder="Datum"
            value={getDatum()}
          />

          <FormField
            keyboardType="numeric"
            maxLength={10}
            name="kolicina"
            placeholder="Kolicina"
            width="100%"
          />
          <FormField
            maxLength={200}
            multiline={true}
            name="opis"
            placeholder="Opis"
            editable={true}
          />
          <Picker
            items={valutaData}
            name="valuta"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Valuta"
            width="100%"
          />
          <FormField
            keyboardType="numeric"
            maxLength={10}
            name="insdate"
            placeholder="Datum na vnes"
            width="100%"
            editable={false}
          />
          <FormField
            maxLength={50}
            name="insuser"
            placeholder="Od"
            width="100%"
            editable={false}
          />

          <SubmitButton title="Save" />
          {isAddMode ? (
            false
          ) : (
            <DeleteButton title="Delete" onPress={handleDelete} />
          )}
        </Form>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 0.4,
    padding: 60,
    // alignItems: "center",
  },
  listItem: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  listItemText: {
    fontSize: 18,
  },
  metaInfo: {
    marginLeft: 5,
  },
  padding: 5, //+-DT-20210506: Changed from 20 to 5
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 14,
    width: 300,
    padding: 5,
  },
});

export default KupuvanjeEditScreen;
