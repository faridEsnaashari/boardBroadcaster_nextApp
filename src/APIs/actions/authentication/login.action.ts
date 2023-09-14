import { LoginAction } from "@/APIs/types/authentication/actions.type";
import { LoginActionTypes } from "@/APIs/types/authentication/authentication.enum";
import axios from "axios";
import { Dispatch } from "react";

export const loginAction = <T>(dispatch: Dispatch<LoginAction>, data: T) => {
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
