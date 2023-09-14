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

axios.defaults.baseURL = API_URL;
const userToken = global?.localStorage?.getItem("userToken");
if (userToken) {
  axios.defaults.headers.common["Authorization"] = userToken;
}

export const useAPICaller = () => {
  const [verifyEmailResult, verifyEmailDispatch] = useReducer(
    verifyEmailReducer,
    verifyEmailInitialState
  );
  const verifyEmail = <T>(data: T) =>
    verifyEmailAction<T>(verifyEmailDispatch, data);

  const [signUpResult, signUpDispatch] = useReducer(
    signUpReducer,
    signUpReducerInitialState
  );
  const signUp = <T>(data: T) => singUpAction<T>(signUpDispatch, data);

  const [loginResult, loginDispatch] = useReducer(
    loginReducer,
    loginInitialState
  );
  const login = <T>(data: T) => loginAction<T>(loginDispatch, data);

  return {
    verifyEmailCaller: [verifyEmail, verifyEmailResult] as const,
    signUpCaller: [signUp, signUpResult] as const,
    loginCaller: [login, loginResult] as const,
  };
};

export default useAPICaller;
