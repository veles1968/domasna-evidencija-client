import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(App);
// 19.11.2022: Migrating from "expo build" to "EAS Build"
// Removed from package.json:
// "main": "node_modules/expo/AppEntry.js",
