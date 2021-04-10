import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNotifications from "../hooks/useNotifications";

import ArtikalEditScreen from "../screens/ArtikalEditScreen";
import ArtikalNavigator from "./ArtikalNavigator";
import HomeNavigator from "./HomeNavigator";
import KupuvanjesScreen from "../screens/KupuvanjesScreen";
import navigation from "./rootNavigation";
import NewArtikalButton from "./NewArtikalButton";
import NewPrimanjaButton from "./NewPrimanjaButton";
import PrimanjaEditScreen from "../screens/PrimanjaEditScreen";
import PrimanjaNavigator from "./PrimanjaNavigator";
import routes from "./routes";

// 09.04.2021
// import { useNavigationState } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  const [showTab, setShowTab] = useState(false);

  // const activeRoute = () => {
  //   console.log(
  //     "this.props.navigation.state = " + this.props.navigation.state.routeName
  //   );
  // };

  // const state = useNavigationState((state) => state);
  // const routeName = state.routeNames[state.index];
  // console.log(routeName);

  // const getCurrentRoute = (nav) => {
  //   if (Array.isArray(nav.routes) && nav.routes.length > 0) {
  //     return getCurrentRoute(nav.routes[nav.index]);
  //   } else {
  //     return nav.routeName;
  //   }
  // };
  // const currentNavigation = getCurrentRoute(navigation.state);

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
    </Tab.Navigator>
  );
};

export default AppNavigator;
