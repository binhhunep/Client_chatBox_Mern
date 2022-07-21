import axiosClient from "../axiosClient";
import * as types from "../types/types";

const getMessages = async (data) => {
  return await axiosClient
    .post(types.MESSAGE_GET_MGS, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const addMessage = async (data) => {
  return await axiosClient
    .post(types.MESSAGE_ADD_MGS, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export { getMessages, addMessage };
