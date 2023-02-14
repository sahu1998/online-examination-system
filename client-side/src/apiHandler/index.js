import axios from "axios";

export const serverURL = "http://localhost:8080/oes";
export const getApiHandler = async (endpoint) => {
  const result = await axios.get(serverURL + endpoint);
  return result.data;
};
