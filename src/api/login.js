import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const loginUrl = "api/auth/login";

export const login = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/${loginUrl}`, body);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const userCreate = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/api/user/register`, body);
    return response.data;
  } catch (error) {
    console.error("Error during userCreate:", error);
    throw error;
  }
};
