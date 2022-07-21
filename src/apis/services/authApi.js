import axiosClient from "../axiosClient";
import * as types from "../types/types";

const getAllUsers = async (data) => {
  return await axiosClient
    .get(`${types.USERS_GETALL}/${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const checkLogin = async (data) => {
  return await axiosClient
    .post(types.USER_LOGIN, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const registerUser = async (data) => {
  return await axiosClient
    .post(types.USER_REGISTER, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const logout = async (data) => {
  return await axiosClient
    .get(`${types.USER_LOGOUT}/${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const setAvatar = async (data) => {
  const image = { avatarImage: data.avatarImage };
  return await axiosClient
    .post(`${types.USER_SET_AVATAR}/${data.userId}`, image)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export { checkLogin, getAllUsers, registerUser, logout, setAvatar };
