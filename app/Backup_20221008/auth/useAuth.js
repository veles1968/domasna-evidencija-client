import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    console.log("START authToken");

    const user = jwtDecode(authToken);

    console.log("      authToken = " + authToken);

    setUser(user);
    authStorage.storeToken(authToken);

    console.log("END authToken");
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
