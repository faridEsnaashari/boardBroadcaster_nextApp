import { useReducer } from "react";

import { API_URL } from "@/config";
import axios from "axios";
import {
  signUpReducer,
  signUpReducerInitialState,
  verifyEmailInitialState,
  verifyEmailReducer,
} from "@/APIs/reducers/authentication/sign-up.reducer";

import {
  singUpAction,
  verifyEmailAction,
} from "@/APIs/actions/authentication/sign-up.action";
import {
  loginInitialState,
  loginReducer,
} from "@/APIs/reducers/authentication/login.reducer";
import { loginAction } from "@/APIs/actions/authentication/login.action";
import {
  createBoardInitialState,
  createBoardReducer,
  deleteBoardInitialState,
  deleteBoardReducer,
  updateBoardInitialState,
  updateBoardReducer,
} from "@/APIs/reducers/boards/boards-crud.reducer";
import {
  createBoardAction,
  deleteBoardAction,
  updateBoardAction,
} from "@/APIs/actions/boards/boards-crud.action";
import {
  LoginActionData,
  SignupActionData,
  VerifyEmailActionData,
} from "@/APIs/types/authentication/actions.type";
import {
  CreateBoardActionData,
  DeleteBoardActionData,
  UpdateBoardActionData,
} from "@/APIs/types/boards/actions.type";

axios.defaults.baseURL = API_URL;
const userToken = global?.localStorage?.getItem("userToken");
axios.defaults.withCredentials = true;
if (userToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + userToken;
}

export const useAPICaller = () => {
  const [verifyEmailResult, verifyEmailDispatch] = useReducer(
    verifyEmailReducer,
    verifyEmailInitialState,
  );
  const verifyEmail = (data: VerifyEmailActionData) =>
    verifyEmailAction(verifyEmailDispatch, data);

  const [signUpResult, signUpDispatch] = useReducer(
    signUpReducer,
    signUpReducerInitialState,
  );
  const signUp = (data: SignupActionData) => singUpAction(signUpDispatch, data);

  const [loginResult, loginDispatch] = useReducer(
    loginReducer,
    loginInitialState,
  );
  const login = (data: LoginActionData) => loginAction(loginDispatch, data);

  const [createBoardResult, createBoardDispatch] = useReducer(
    createBoardReducer,
    createBoardInitialState,
  );
  const createBoard = (data: CreateBoardActionData) =>
    createBoardAction(createBoardDispatch, data);

  const [updateBoardResult, updateBoardDispatch] = useReducer(
    updateBoardReducer,
    updateBoardInitialState,
  );
  const updateBoard = (data: UpdateBoardActionData) =>
    updateBoardAction(updateBoardDispatch, data);

  const [deleteBoardResult, deleteBoardDispatch] = useReducer(
    deleteBoardReducer,
    deleteBoardInitialState,
  );
  const deleteBoard = (data: DeleteBoardActionData) =>
    deleteBoardAction(deleteBoardDispatch, data);

  return {
    verifyEmailCaller: [verifyEmail, verifyEmailResult] as const,
    signUpCaller: [signUp, signUpResult] as const,
    loginCaller: [login, loginResult] as const,
    boardCaller: {
      create: [createBoard, createBoardResult] as const,
      update: [updateBoard, updateBoardResult] as const,
      delete: [deleteBoard, deleteBoardResult] as const,
    },
  };
};

export default useAPICaller;
