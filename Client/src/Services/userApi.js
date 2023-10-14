import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

const userApi = {
  //register user
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
  // login user
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
  // all user
  allUser: async (keyword, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/?search=${keyword}`, {
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

export default userApi;
