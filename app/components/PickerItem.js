import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

// import Text from "./Text";
// import AppText from "./Text";
import { Text } from "react-native";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <Text style={styles.text}>{item.label}</Text> */}
      {/* <Text style={styles.text}>{"aaaaaaaaaa"}</Text> */}
      <Text style={styles.text}>"aaaaaaaaaa"</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
