import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const inquiryUrl = "api/inquiry";

const dashBoardUrl = "api/dashboard";

export const inquiryCreate = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/${inquiryUrl}`, body);
    return response.data;
  } catch (error) {
    console.error("Error during inquiryCreate:", error);
    throw error;
  }
};

export const dashBoard = async () => {
  try {
    const response = await axios.get(`${baseURL}/${dashBoardUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error during getData:", error);
    throw error;
  }
};

export const getInquiry = async () => {
  try {
    const response = await axios.get(`${baseURL}/${inquiryUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error during getData:", error);
    throw error;
  }
};
