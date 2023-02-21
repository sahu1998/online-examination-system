import axios from "axios";
export const serverURL = "http://localhost:8080/oes";

const postApiHandler = async (endPoint, value) => {
  try {
    const res = await axios.post(serverURL + endPoint, value);
    console.log("postres", res)
    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};

const getApiHandler = async (endpoint) => {
  try {
    const getExamApi = await axios.get(serverURL + endpoint);
    console.log("getExamApi===", getExamApi.data);
    return getExamApi.data;
  } catch (error) {
    return { message: error.message, status: 400 };
  }
};

const deleteApiHandler = async (endPoint) => {
  try {
    const res = await axios.delete(serverURL + endPoint);

    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};
const putApiHandler = async (endPoint, value) => {
  try {
    console.log("put", value)
    const res = await axios.put(serverURL + endPoint, value);
    console.log("res", res)
    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};

export { getApiHandler, postApiHandler, deleteApiHandler, putApiHandler };
