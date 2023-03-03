import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";

import { getAllUsers } from "./services";
import { BASE_URL, LIGHT, PURPLE, WHITE } from "./constants/index";
import Screen from "./components/Screen";
import Messages from "./components/Messages";
import ListItem from "./components/lists/ListItem";
import ListItemSeperator from "./components/lists/ListItemSeparator";

const connection = io(BASE_URL);

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data);
    } catch (err) {
      console.log("ERROR", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (connection && userId) {
      connection.emit("setup", { _id: userId });
    }
    // eslint-disable-next-line
  }, [connection, userId]);

  return (
    <Screen style={{ backgroundColor: LIGHT }}>
      <View
        style={{
          backgroundColor: PURPLE,
          padding: 15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedChat && (
          <Ionicons
            style={styles.goBack}
            name="arrow-back"
            size={30}
            color={WHITE}
            onPress={() => setSelectedChat(null)}
          />
        )}
        <Entypo name="chat" size={30} color={WHITE} />
        <Text
          style={{
            color: WHITE,
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Your Chats
        </Text>
      </View>
      {!selectedChat && (
        <FlatList
          data={users}
          keyExtractor={(user) => user._id.toString()}
          renderItem={({ item, index, seperators }) => (
            <ListItem
              title={item.name}
              subTitle={item.email}
              image={item.imageUrl}
              onPress={() => {
                if (item.email.includes("faisal")) {
                  setUserId("63ff216deaca161642fb9fac");
                } else if (item.email.includes("sara")) {
                  setUserId("63ff2149eaca161642fb9fa8");
                }
                setSelectedChat("64004f06a26584d294f12aeb");
              }}
            />
          )}
          ItemSeparatorComponent={() => <ListItemSeperator />}
        />
      )}

      {selectedChat && (
        <Messages
          chatId={selectedChat}
          connection={connection}
          userId={userId}
        />
      )}
    </Screen>
  );
};

export default App;

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    left: 20,
    padding: 12,
  },
});
