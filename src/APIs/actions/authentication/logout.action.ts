import { LogoutAction } from "@/APIs/types/authentication/actions.type";
import { LogoutActionTypes } from "@/APIs/types/authentication/authentication.enum";
import axios from "axios";
import { Dispatch } from "react";

export const logoutAction = (dispatch: Dispatch<LogoutAction>) => {
  dispatch({ type: LogoutActionTypes.REQUESTD_LOGOUT });

  axios
    .get("/logout")
    .then((response) => {
      dispatch({
        type: LogoutActionTypes.RECIVED_LOGOUT,
        statusCode: response.status,
      });
    })
    .catch((error) => {
      dispatch({
        type: LogoutActionTypes.FAILED_LOGOUT,
        statusCode: error?.response.status,
      });
    });
};
