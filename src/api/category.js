import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const categoryUrl = "api/category";

export const categoryCreate = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/${categoryUrl}`, body);
    return response.data;
  } catch (error) {
    console.error("Error during categoryCreate:", error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(`${baseURL}/${categoryUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error during getCategory:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${categoryUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error during getCategory:", error);
    throw error;
  }
};

export const updateCategoryById = async (id, body) => {
  return await axios.put(`${baseURL}/${categoryUrl}/${id}`, body);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${baseURL}/${categoryUrl}/${id}`);
};
