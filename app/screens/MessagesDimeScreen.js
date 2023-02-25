import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";

const initialMessages = [
  {
    id: 4,
    title: "Version",
    description: "Update - 25.02.2023 1552, ORACLE Instance started, new Token",
    image: require("../assets/dime.jpg"),
  },
  {
    id: 3,
    title: "Version",
    description: "Update - 24.02.2023 0824, new Token",
    image: require("../assets/dime.jpg"),
  },
  {
    id: 3,
    title: "Version",
    description: "Update - 30.01.2023 1932, new Token",
    image: require("../assets/dime.jpg"),
  },
  {
    id: 2,
    title: "Version",
    description: "Update - 25.01.2023 1834, ORACLE Client, mTLS",
    image: require("../assets/dime.jpg"),
  },
  {
    id: 1,
    title: "Version",
    description: "Update - 31.12.2022 1026, new Token",
    image: require("../assets/dime.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/dime.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
// const styles = StyleSheet.create({
//   screen: {
//     padding: 20,
//     backgroundColor: colors.light,
//   },
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

export default MessagesScreen;
