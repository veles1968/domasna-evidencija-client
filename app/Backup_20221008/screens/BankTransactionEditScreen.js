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
  Switch,
  Text,
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
import banksApi from "../api/banks";
import bankTransactionsApi from "../api/banktransactions";
import Button from "../components/Button";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import UploadScreen from "./UploadScreen";
import valutasApi from "../api/valutas";

const validationSchema = Yup.object().shape({
  trans_id: Yup.string().label("ID"),
  ime_banka: Yup.string().label("Ime na Banka"),
  datum: Yup.string().required().min(1).label("Datum"),
  komentar: Yup.string().label("Komentar"),
  valuta: Yup.object()
    .required("Valuta e obavezno da se vnese")
    .nullable()
    .label("banktransaction.valuta_id"),
});

function BankTransactionEditScreen({ route }) {
  const [amount, setAmount] = useState(0);
  const [bankData, setBankData] = useState([]);
  const [bankId, setBankId] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [error, setError] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [imeBank, setImeBank] = useState("");
  const [mode, setMode] = useState("date");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [stavenoIsTicked, setStavenoIsTicked] = useState(false);
  const [show, setShow] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const { user, logOut } = useAuth();
  const [valutaData, setValutaData] = useState([]);

  const toggleSwitch = () =>
    setStavenoIsTicked((previousState) => {
      if (!isAddMode) {
        previousState
          ? (banktransaction.transakcija = 1)
          : (banktransaction.transakcija = 0);
      }
      return !previousState;
    });

  const navigation = useNavigation();

  Moment.locale("de");

  let isAddMode = true;
  const banktransaction = route.params;

  if (banktransaction !== undefined) {
    isAddMode = !banktransaction.trans_id;
    // console.log("isAddMode = " + isAddMode);

    // console.log(
    //   "banktransaction = " + JSON.stringify(banktransaction, null, 2)
    // );
    // console.log("banktransaction.transakcija = " + banktransaction.transakcija);
    // console.log("banktransaction.trans_id = " + banktransaction.trans_id);
    // console.log("banktransaction.valuta_id = " + banktransaction.valuta_id);

    if (!isAddMode) {
    }
  } else {
  }

  useEffect(() => {
    console.log("START *********** useEffect ***********");

    let mounted = true;

    getAllValutas(mounted);
    getAllBanks(mounted);

    if (route.params) {
      // if (bank.transakcija.toString()) {
      //   bank.transakcija ? setStavenoIsTicked(true) : setStavenoIsTicked(false);
      // }
      banktransaction.transakcija
        ? setStavenoIsTicked(true)
        : setStavenoIsTicked(false);
    }

    if (!isAddMode) {
      setDisplayForm(true);
    }

    console.log("END ************ useEffect ************");

    return () => (mounted = false);
  }, []);

  useEffect(() => {}, [bankData]);

  useEffect(() => {
    // console.log("fullData.length = <" + fullData.length + ">");
  }, [fullData]);

  const getAllBanks = async (mounted) => {
    // console.log("START getAllBanks-1");

    setLoading(true);
    const response = await banksApi.getBanks();
    setLoading(false);

    setError(!response.ok);

    if (mounted) {
      // console.log("1. setBankData");
      setBankData(response.data);
      // console.log("2. setBankData");
      setFullData(response.data);
    }

    // console.log("END getAllBanks-1");
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

  const getAmount = () => {
    if (isAddMode) {
      return "";
    } else {
      if (banktransaction.transakcija === 1) {
        return banktransaction.staveno.toString();
      } else {
        return banktransaction.izvadeno.toString();
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
        var datumLocale = banktransaction.datum;
        return Moment(datumLocale).format("DD.MM.YYYY");
      }
    }
  };

  const getInsDate = () => {
    if (isAddMode) {
      return "";
    } else {
      return Moment(banktransaction.insdate).format("DD.MM.YYYY");
    }
  };

  const getKomentar = () => {
    if (isAddMode) {
      return "";
    } else {
      if (banktransaction.komentar) {
        return banktransaction.komentar.toString();
      } else {
        return "";
      }
    }
  };

  const deleteExecution = async (banktransaction2) => {
    console.log("START deleteExecution");

    setProgress(0);
    setUploadVisible(true);
    var result;

    banktransaction2.bank_id = banktransaction.bank_id;
    banktransaction2.trans_id = banktransaction.trans_id;

    result = await bankTransactionsApi.deleteBankTransaction(
      { ...banktransaction2 },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not delete the banktransaction");
    }

    navigation.goBack(null);

    console.log("END deleteExecution");
  };

  const handleDelete = async () => {
    console.log("START handleDelete");

    console.log("banktransaction.trans_id = " + banktransaction.trans_id);
    console.log("banktransaction.bank_id = " + banktransaction.bank_id);

    Alert.alert(
      "Brishenje",
      `Dali sakate da ja izbrishete transakcijata ${banktransaction.komentar}?`,
      [
        {
          text: "Ne",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        { text: "Da", onPress: () => deleteExecution(banktransaction) },
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

  const handleSubmit = async (banktransaction2, { resetForm }) => {
    console.log("START handleSubmit");

    console.log(
      "1. banktransaction2 = " + JSON.stringify(banktransaction2, null, 2)
    );

    if (stavenoIsTicked) {
      banktransaction2.transakcija = 1;
      banktransaction2.staveno = banktransaction2.amount;
      banktransaction2.izvadeno = 0;
    } else {
      banktransaction2.transakcija = 0;
      banktransaction2.izvadeno = banktransaction2.amount;
      banktransaction2.staveno = 0;
    }

    banktransaction2.datum = getDatum();
    banktransaction2.komentar = banktransaction2.komentar;

    setProgress(0);
    setUploadVisible(true);

    var result;

    if (isAddMode) {
      banktransaction2.bank_id = bankId;
      banktransaction2.insuser = user.email;
      result = await bankTransactionsApi.addBankTransaction(
        { ...banktransaction2 },
        (progress) => setProgress(progress)
      );
    } else {
      banktransaction2.trans_id = banktransaction2.trans_id;
      banktransaction2.bank_id = banktransaction2.bank_id;
      banktransaction2.insuser = banktransaction2.insuser;
      banktransaction2.insdate = banktransaction2.insdate;
      banktransaction2.upduser = user.email;
      result = await bankTransactionsApi.updateBankTransactions(
        { ...banktransaction2 },
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the banktransaction");
    }

    if (isAddMode) {
      resetForm();
    } //-DT-20210203: Causes the changed field name to get the old value again

    console.log("END handleSubmit");
  };

  const handleAmountChange = (event) => {
    const { value } = event.target;

    setAmount(value);
  };

  const handleSearch = (text) => {
    console.log("START handleSearch");

    setDisplayForm(false);

    const formattedQuery = text.toLowerCase();

    const filteredData = fullData.filter((bank) => {
      return contains(bank, formattedQuery);
    });
    if (filteredData.length < 21) {
    } else {
    }

    setBankData(filteredData);
    setImeBank(text);

    console.log("END handleSearch");
  };

  const contains = ({ ime_banka, ime_vid }, query) => {
    if (ime_banka.toLowerCase().search(query) > -1) {
      return true;
    }

    return false;
  };

  function renderHeader() {
    return (
      <SearchBar
        lightTheme
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Vnesi Banka"
        round
        value={imeBank}
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
          data={bankData}
          initialNumToRender={3}
          keyExtractor={(item) => item.bank_id.toString()}
          renderItem={({ item }) => (
            <Card
              key={item.bank_id}
              title={item.ime_banka}
              subTitle={`Smetka: ${item.broj_smetka}\nFr.st.auf.: ${item.freistauf_betrag} EUR`}
              onPress={() => {
                setDisplayForm(true);
                setBankData("");
                setSelectedBank(`${item.ime_banka} / ${item.broj_smetka}`);
                setBankId(item.bank_id);
                console.log("item.bank_id = " + item.bank_id);
              }}
            />
          )}
          stickyHeaderIndices={[0]}
          value={imeBank}
          ListHeaderComponent={
            <>
              <SearchBar
                lightTheme
                onChangeText={handleSearch}
                placeholder="Vnesi Banka"
                round
                value={imeBank}
              />
            </>
          }
          ListFooterComponent={
            displayForm ? null : <AppTextInput>Nema Banki</AppTextInput>
          }
        />
      )}

      {displayForm && (
        <Form
          initialValues={{
            trans_id: isAddMode ? "" : banktransaction.trans_id.toString(),
            datum: getDatum(),
            ime_banka: isAddMode ? "" : banktransaction.ime_banka.toString(),
            amount: getAmount(),
            bank_id: isAddMode ? "" : banktransaction.bank_id.toString(),
            valuta: {
              label: isAddMode ? "EUR" : banktransaction.ime_valuta.toString(),
              value: isAddMode ? "9" : banktransaction.valuta_id,
            },
            valuta_id: isAddMode ? "9" : banktransaction.valuta_id.toString(),
            komentar: getKomentar(),
            transakcija: isAddMode
              ? "0"
              : banktransaction.transakcija.toString(),
            insdate: isAddMode ? "" : getInsDate(),
            insuser: isAddMode ? "" : banktransaction.insuser,
          }}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          validationSchema={validationSchema}
        >
          {isAddMode && (
            <FormField
              editable={false}
              maxLength={50}
              name="ime_banka"
              placeholder="Banka"
              value={isAddMode && selectedBank}
              width="100%"
            />
          )}
          {!isAddMode && (
            <FormField
              editable={false}
              maxLength={50}
              name="ime_banka"
              placeholder="Banka"
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
            name="amount"
            onChange={handleAmountChange}
            placeholder="Iznos"
            width="100%"
          />
          <FormField
            maxLength={200}
            multiline={true}
            name="komentar"
            placeholder="Komentar"
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
          <Text style={styles.switch}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={stavenoIsTicked ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={stavenoIsTicked}
            />
            Primanje
          </Text>

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

export default BankTransactionEditScreen;
