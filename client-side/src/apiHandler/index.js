import axios from "axios";
export const serverURL = "http://localhost:8080/oes";

const postApiHandler = async (endPoint, value) => {
  try {
    console.log("value post",value );
    const res = await axios.post(serverURL + endPoint, value);
    console.log("post res",res.data);
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
  console.log("endPoint===",endPoint);
  console.log("v=778787778==>", value);
  try {
    console.log("value put------",value);
    const res = await axios.put(serverURL + endPoint, value);
console.log("res==========put=====",res);
    return res.data;
  } catch (err) {
    console.log("errors=>", err);
  }
};
export const getByIdApiHandler = async (endPoint) => {
  try {
    const res = await axios.get(serverURL + endPoint);
    console.log("res=>",res);
    return res.data
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export { getApiHandler, postApiHandler, deleteApiHandler, putApiHandler };
