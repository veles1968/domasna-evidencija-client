import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNotifications from "../hooks/useNotifications";

import ArtikalEditScreen from "../screens/ArtikalEditScreen";
import ArtikalNavigator from "./ArtikalNavigator";
import BankTransactionsScreen from "../screens/BankTransactionsScreen";
import HomeNavigator from "./HomeNavigator";
import KupuvanjesScreen from "../screens/KupuvanjesScreen";
import navigation from "./rootNavigation";
import NewArtikalButton from "./NewArtikalButton";
import NewPrimanjaButton from "./NewPrimanjaButton";
import PrimanjaEditScreen from "../screens/PrimanjaEditScreen";
import PrimanjaNavigator from "./PrimanjaNavigator";
import routes from "./routes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";

// 09.04.2021
// import { useNavigationState } from "@react-navigation/native";
//10.04.2021
// import ScreenContext from "./app/navigation/ScreenContext";
// 12.04.2021
// import { TabBar } from "../components/TabBar";
// import HomeScreen from "../screens/HomeScreen";
var showTab = false;
function Primanja() {
  return <PrimanjaNavigator> {(showTab = true)} </PrimanjaNavigator>;
}

const Tab = createBottomTabNavigator();

const ShowScreen = () => {
  // return true;
  if (state.route.name === "AAA") return false;
};

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator initialRouteName={HomeNavigator}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="basketball-hoop"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Artikli"
        component={ArtikalNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bread-slice"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ArtikalEdit"
        component={ArtikalEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewArtikalButton
              onPress={() => navigation.navigate(routes.ARTIKAL_EDIT)}
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
        name="PrimanjaEdit"
        component={PrimanjaEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewPrimanjaButton
              onPress={() => navigation.navigate(routes.PRIMANJA_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons />,
        })}
      />
      <Tab.Screen
        name="Primanja"
        component={PrimanjaNavigator}
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

      <Tab.Screen
        name="BankTransactions"
        component={BankTransactionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
