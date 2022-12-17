import React from "react";
import { useContext } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import SInfo from "react-native-sensitive-info";

import AuthContext from "../auth/context";
import Button from "../components/Button";
import routes from "../navigation/routes";
import useAuthDomasnaEvidencija from "../auth/useAuth";
import authStorage from "../auth/storage";

function WelcomeScreen({ navigation }) {
  const { authorize, clearSession, user, getCredentials } = useAuth0();
  const { userDomasnaEvidencija, setUserDomasnaEvidencija } =
    useContext(AuthContext);
  const auth = useAuthDomasnaEvidencija();

  // const getUserData = async (access_token) => {
  //   const accessToken = access_token
  //     ? access_token
  //     : await SInfo.getItem("accessToken", {});

  //   const data = await auth0.auth.userInfo({ token: accessToken });
  //   return data;
  // };

  const login = async () => {
    try {
      console.log("START login");

      // Begin 1/5 Create code verifier
      // try {
      //   const crypto = require("node:crypto");
      // } catch (err) {
      //   console.log("crypto support is disabled!");
      // }
      // const { randomBytes } = await import("node:crypto");
      // var verifier = base64URLEncode(crypto.randomBytes(32));

      // const credentials = await authorize({
      //   scope: "openid offline_access profile email",
      // });
      await authorize(
        { scope: "openid offline_access profile email" }
        // (response_type = "1234")
      );
      // const credentials = await authorize({ scope: "openid profile email" });
      // try {
      // const credentials = await getCredentials();
      // const credentials = await credentialsManager.getCredentials();
      // } catch (error) {
      //   console.log(error);
      // }

      // const accessToken = await getAccessTokenSilently();
      // const { access_token } = await getCredentials();
      const accessToken = "";
      // const accessToken = access_token;
      // const { accessToken } = await getCredentials();
      // const { accessToken } = getCredentials();
      // const { accessToken } = awaitgetAccessTokenSilently();
      // const accessToken = credentials.accessToken;
      // const { idToken } = await getCredentials();
      // await getCredentials();
      // await SInfo.setItem("accessToken", credentials.accessToken, {});
      // await SInfo.setItem("refreshToken", credentials.refreshToken, {});
      // const user_data = await getUserData(accessToken);
      // console.log("credentials  = " + JSON.stringify(credentials, null, 2));
      // const user = await getUserData(credentials.idToken);
      // console.log("user.name = " + user.name);
      // console.log("user.email = " + user.email);
      // console.log("accessToken = " + accessToken);

      // if (credentials.idToken) {
      auth.logIn("ReactNative@doma.de", accessToken);
      setUserDomasnaEvidencija(user.email);
      // setUserDomasnaEvidencija("user.email");
      // }

      console.log("END login");

      // Alert.alert("AccessToken: " + accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  if (loggedIn) setUserDomasnaEvidencija(user.email);

  const onLogout = async () => {
    try {
      // await clearSession();
      auth.logOut();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Domashna Evidencija@App 1.0 Dev</Text>
        <Text style={styles.tagline}>26.11.2022</Text>
        {user && (
          <Text>
            You are logged in as {user.name} {user.email}{" "}
          </Text>
        )}
        {!user && <Text>You are not logged in</Text>}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title={loggedIn ? "Log Out" : "Log In"}
          // onPress={() => navigation.navigate(routes.LOGIN)}
          // onPress={login}
          // onPress={loggedIn ? onLogout : login}
          onPress={loggedIn ? onLogout : () => login()}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
