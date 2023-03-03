import { useEffect, useState, Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { PURPLE, WHITE, DARK } from "../constants";
import { getAllMessagesOfChat, messageSend } from "../services";
import { Feather } from "@expo/vector-icons";

var selectedChatCompare;

const Messages = ({ chatId, connection, userId }) => {
  const [messages, setMessages] = useState([]);
  const [isMessagesLoad, setIsMessagesLoad] = useState(false);

  const [messageData, setMessageData] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);

  const fetchMessages = async () => {
    setIsMessagesLoad(true);
    try {
      const response = await getAllMessagesOfChat(chatId);
      setMessages(response.data);
      connection.emit("join chat", chatId);
      setIsMessagesLoad(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendMessage = async () => {
    setIsMessageSent(true);
    try {
      const response = await messageSend({
        user_id: userId,
        content: messageData,
        chatId: chatId,
      });

      connection.emit("new message", response.data);
      setMessages([...messages, response.data]);
      setMessageData("");
      Keyboard.dismiss();
      setIsMessageSent(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (chatId && connection) {
      fetchMessages();
      selectedChatCompare = chatId;
    }
  }, [chatId]);

  useEffect(() => {
    connection.on("message recieved", (newMessageRecieved) => {
      console.log("MESSAGE RECEIVED");
      if (selectedChatCompare === newMessageRecieved.chat._id) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <View style={styles.container}>
      {isMessagesLoad ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={PURPLE} />
        </View>
      ) : (
        <Fragment>
          <FlatList
            data={messages}
            keyExtractor={(message) => message._id.toString()}
            renderItem={({ item, index, seperators }) => (
              <View
                style={[
                  styles.messageContainerSender,
                  item.sender._id.toString() === userId
                    ? { alignSelf: "flex-end", backgroundColor: "#DDDDDD" }
                    : {},
                ]}
              >
                <Text
                  style={[
                    styles.messageSenderText,
                    item.sender._id.toString() === userId
                      ? { color: DARK }
                      : {},
                  ]}
                >
                  {item.content}
                </Text>
              </View>
            )}
          />

          <View
            style={{
              bottom: 0,
              width: "100%",
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                borderColor: PURPLE,
                borderWidth: 2,
                borderRadius: 50,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <TextInput
                style={{
                  fontSize: 18,
                }}
                placeholder="Send a message"
                onChangeText={(e) => setMessageData(e)}
                value={messageData}
              />
            </View>
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                backgroundColor: PURPLE,
                padding: 10,
                marginLeft: 5,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={isMessageSent}
            >
              {isMessageSent ? (
                <ActivityIndicator size="small" color={WHITE} />
              ) : (
                <Feather name="send" size={20} color={WHITE} />
              )}
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    padding: 10,
    paddingBottom: 5,
    flex: 1,
  },

  messageContainerSender: {
    backgroundColor: PURPLE,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    maxWidth: "80%",
    alignSelf: "flex-start",
    borderRadius: 20,
  },

  messageSenderText: {
    color: WHITE,
  },
});

export default Messages;
