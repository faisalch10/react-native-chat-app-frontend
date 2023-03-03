import axios from "axios";
import { BASE_URL } from "../constants";

const getAllUsers = () => {
  return axios.get(`${BASE_URL}/api/v1/users/allusers`);
};

const getAllMessagesOfChat = (chatId) => {
  return axios.get(`${BASE_URL}/api/v1/chats/${chatId}`);
};

const messageSend = (data) => {
  return axios.post(`${BASE_URL}/api/v1/chats/sendmessage`, data);
};

export { getAllUsers, getAllMessagesOfChat, messageSend };
