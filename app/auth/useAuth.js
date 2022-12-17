import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { useAuth0 } from "react-native-auth0";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuthDomasnaEvidencija = () => {
  const { userDomasnaEvidencija, setUserDomasnaEvidencija } =
    useContext(AuthContext);
  const { clearSession } = useAuth0();

  const logIn = (userName, authToken) => {
    console.log("START logIn(authToken)");

    // const userDomasnaEvidencija = jwtDecode(authToken);

    console.log("      authToken = " + authToken);

    // setUserDomasnaEvidencija(userName);
    // setUserDomasnaEvidencija("TestUser1944");

    authStorage.storeToken(authToken);

    console.log("      userDomasnaEvidencija = " + userDomasnaEvidencija);

    console.log("END logIn(authToken)");
  };

  // const logOut = () => {
  //   setUser(null);
  //   authStorage.removeToken();
  // };
  const logOut = async () => {
    try {
      console.log("START logOut");
      await clearSession();
      setUserDomasnaEvidencija(null);
      console.log("END  logOut");
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  return { userDomasnaEvidencija, logIn, logOut };
};
