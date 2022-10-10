import { useContext } from "react";

import ScreenContext from "../navigation/ScreenContext";

export default useScreen = () => {
  const { screen, setScreen } = useContext(ScreenContext);

  const openScreen = (screenName) => {
    console.log("START openScreen");

    setScreen(screenName);

    console.log("END openScreen");
  };

  return { screen };
};
