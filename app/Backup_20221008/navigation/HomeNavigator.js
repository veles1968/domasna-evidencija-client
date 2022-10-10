import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BankAccOverviewsScreen from "../screens/BankAccOverviewsScreen";
import BankTransactionEditScreen from "../screens/BankTransactionEditScreen";
import KupuvanjesScreen from "../screens/KupuvanjesScreen";
import KupuvanjeEditScreen from "../screens/KupuvanjeEditScreen";
import MessagesScreen from "../screens/MessagesDimeScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="BankAccOverviews"
      options={{ title: "Banka" }}
      component={BankAccOverviewsScreen}
    />
    <Stack.Screen
      name="Kupuvanjes"
      options={{ title: "Kupuvanje" }}
      component={KupuvanjesScreen}
    />
    <Stack.Screen
      name="KupuvanjeEdit"
      options={{ title: "Kupuvanje Vnes" }}
      component={KupuvanjeEditScreen}
    />
    <Stack.Screen
      name="BankTransactionEdit"
      options={{ title: "Vnes, promena" }}
      component={BankTransactionEditScreen}
    />
    <Stack.Screen name="MessagesDimeMoj" component={MessagesScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
