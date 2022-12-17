import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";
import config from "./app/auth/auth0-configuration";
// import Entypo from "@expo/vector-icons/Entypo";
// import * as SplashScreen from "expo-splash-screen";
import "expo-dev-client";

import { Auth0Provider } from "react-native-auth0";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import OfflineNotice from "./app/components/OfflineNotice";

export default function App() {
  const [userDomasnaEvidencija, setUserDomasnaEvidencija] = useState();
  const [isReady, setIsReady] = useState(false);

  // const restoreUser = async () => {
  //   const userDomasnaEvidencija = await authStorage.getUser();

  //   console.log(
  //     "userDomasnaEvidencija.email = <" + userDomasnaEvidencija.email + ">"
  //   );
  //   console.log(
  //     "userDomasnaEvidencija.password ***** = <" +
  //       userDomasnaEvidencija.password +
  //       ">"
  //   );

  //   if (userDomasnaEvidencija) setUserDomasnaEvidencija(userDomasnaEvidencija);
  // };

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={() => console.log("Greshka vo AppLoading")}
  //     />
  //   );

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <AuthContext.Provider
        value={{ userDomasnaEvidencija, setUserDomasnaEvidencija }}
      >
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {userDomasnaEvidencija ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
