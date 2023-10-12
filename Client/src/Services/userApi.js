import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

const userApi = {
  register: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
