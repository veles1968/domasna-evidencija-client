import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useAuth0, Auth0Provider } from "react-native-auth0";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import OfflineNotice from "./app/components/OfflineNotice";

const Home = () => {
  const { authorize, clearSession, user } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize({ scope: "openid profile email" });
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? "Log Out" : "Log In"}
      />
    </View>
  );
};

// export default function App() {
const App = () => {
  const { authorize, clearSession, user } = useAuth0();
  // const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();

    console.log("user.email = <" + user.email + ">");
    console.log("user.password ***** = <" + user.password + ">");

    if (user) setUser(user);
  };

  const onLogin = async () => {
    try {
      await authorize({ scope: "openid profile email" });
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  const loggedIn = user !== undefined && user !== null;

  return (
    <Auth0Provider
      domain={"dev-87jky4c1.eu.auth0.com"}
      clientId={"JYHNAusX38MAW8bnpvAlcoQ7U7EWPEAJ"}
    >
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
