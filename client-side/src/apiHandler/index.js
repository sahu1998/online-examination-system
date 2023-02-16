import axios from "axios";
export const serverURL = "http://localhost:8080/oes";
export const getApiHandler = async (endpoint) => {
  try {
    const getExamApi = await axios.get(serverURL + endpoint);
    console.log("getExamApi===", getExamApi.data);
    return getExamApi.data;
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};
