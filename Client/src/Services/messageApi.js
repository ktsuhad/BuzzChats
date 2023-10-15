import axios from "axios";

const BASE_URL = "http://localhost:5000/api/message";

const messageApi = {
  //send messagemessage
  sendChat: async (content, chatId, token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/`,
        { content, chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  //fetching all messages
  fetchAllMessages: async (chatId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default messageApi;
