import axios from "axios";

export const serverURL = "http://localhost:8000/api";

const postApiHandler = async (endPoint, value) => {
  try {
    const res = await axios.post(serverURL + endPoint, value);
    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};

const getApiHandler = async (endPoint) => {
  try {
    const res = await axios.get(serverURL + endPoint);
    return res.data;
  } catch (err) {
    console.log("errors=>", err);
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
    const res = await axios.put(serverURL + endPoint, value);

    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};

export { getApiHandler, postApiHandler, deleteApiHandler, putApiHandler };
