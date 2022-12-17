import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuthDomasnaEvidencija from "../auth/useAuth";

const menuItems = [
  {
    title: "Bank Account Overview",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.BANKACCOVERVIEWS_LIST,
  },
  {
    title: "Kupuvanje Vnes",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.KUPUVANJE_EDIT,
  },
  {
    title: "Potroshuvachka",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.KUPUVANJE_LIST,
  },

  {
    title: "Transakcija Vnes",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.BANKTRANSACTION_EDIT,
  },

  {
    title: "Messages",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function getImage(email) {
  if (email === "dimce.tumbov@gmail.com") {
    return require("../assets/dime.jpg");
  } else if (email === "bile@bile.de") {
    return require("../assets/bile.jpg");
  }
}

function HomeScreen({ navigation }) {
  const { userDomasnaEvidencija, logOut } = useAuthDomasnaEvidencija();
  const { user } = useAuth0();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={userDomasnaEvidencija}
          image={getImage(user.email)}
          onPress={console.log("Profile image tapped")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={logOut}
        // onPress={() => logOut()}
        // onPress={onLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default HomeScreen;
