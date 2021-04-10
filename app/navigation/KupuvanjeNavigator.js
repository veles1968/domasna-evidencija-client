import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import KupuvanjeEditScreen from "../screens/KupuvanjeEditScreen";
import KupuvanjesScreen from "../screens/KupuvanjesScreen";

const Stack = createStackNavigator();

const KupuvanjeNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Kupuvanjes"
      component={KupuvanjesScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="Kupuvanjes" component={KupuvanjesScreen} /> */}
    <Stack.Screen name="KupuvanjeEdit" component={KupuvanjeEditScreen} />
  </Stack.Navigator>
);

export default KupuvanjeNavigator;
