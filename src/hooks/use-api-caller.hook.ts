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
  SignUpActionData,
  VerifyEmailActionData,
} from "@/APIs/types/authentication/actions.type";
import {
  singUpAction,
  verifyEmailAction,
} from "@/APIs/actions/authentication/sign-up.action";

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
  const verifyEmail = (data: VerifyEmailActionData) =>
    verifyEmailAction(verifyEmailDispatch, data);

  const [signUpResult, signUpDispatch] = useReducer(
    signUpReducer,
    signUpReducerInitialState
  );
  const signUp = (data: SignUpActionData) => singUpAction(signUpDispatch, data);

  return {
    verifyEmailCaller: [verifyEmail, verifyEmailResult] as const,
    signUpCaller: [signUp, signUpResult] as const,
  };
};

export default useAPICaller;
