import axios from "axios";

const BASE_URL = "http://localhost:5000/api/chat";

const chatApi = {
  //access chat
  accessChat: async (userId, token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  //fetch all chats
  fetchChats: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default chatApi;
