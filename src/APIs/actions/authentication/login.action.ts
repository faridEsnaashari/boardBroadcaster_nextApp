import {
  LoginAction,
  LoginActionData,
} from "@/APIs/types/authentication/actions.type";
import { LoginActionTypes } from "@/APIs/types/authentication/authentication.enum";
import axios from "axios";
import { Dispatch } from "react";

export const loginAction = (
  dispatch: Dispatch<LoginAction>,
  data: LoginActionData,
) => {
  dispatch({ type: LoginActionTypes.REQUESTD_LOGIN });

  axios
    .post("/login", data)
    .then((response) => {
      dispatch({
        type: LoginActionTypes.RECIVED_LOGIN,
        statusCode: response.status,
        userToken: response?.data?.data?.userToken,
      });
    })
    .catch((error) => {
      dispatch({
        type: LoginActionTypes.FAILED_LOGIN,
        statusCode: error?.response.status,
      });
    });
};
