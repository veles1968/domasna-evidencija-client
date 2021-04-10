import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native";
import axios from "axios";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import artikalsApi from "../api/artikals";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import KupuvanjeEditScreen from "./KupuvanjeEditScreen";
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

function KupuvanjesScreen({ navigation }) {
  //   var screenActive = true;

  // Begin 08.04.2021
  // const route = useRoute();
  // console.log("route.name = " + route.name);
  // End 08.04.2021^

  return (
    <Screen style={styles.screen}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder={"Tip na XXX Primanje"}
      />

      {/* <Tab.Navigator>
        <Tab.Screen
          name="KupuvanjeEdit"
          component={KupuvanjeEditScreen}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <NewListingButton
                onPress={() => navigation.navigate(routes.KUPUVANJE_EDIT)}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={size}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Kupuvanje"
          component={KupuvanjeNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cash-plus"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator> */}
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

export default KupuvanjesScreen;
