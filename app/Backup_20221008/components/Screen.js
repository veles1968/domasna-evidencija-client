import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native";

function Screen({ children, editScreen = false, style }) {
  if (editScreen)
    //+DT-20210508: For edit screens we need a scroll down functionality with ScrollView
    return (
      <SafeAreaView style={[styles.screen, style]}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.view, style]}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );

  //+DT-20210508: Listing screens
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight - 40, //+-DT-20210503
    // paddingTop: 15, //-DT-20210503
    flex: 1,
  },
  view: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});

export default Screen;
