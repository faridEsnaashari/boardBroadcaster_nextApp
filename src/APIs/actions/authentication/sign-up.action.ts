import {
  SignUpAction,
  VerifyEmailAction,
} from "@/APIs/types/authentication/actions.type";
import {
  SignUpActionTypes,
  VerifyEmailActionTypes,
} from "@/APIs/types/authentication/authentication.enum";
import axios from "axios";
import { Dispatch } from "react";

export const verifyEmailAction = <T>(
  dispatch: Dispatch<VerifyEmailAction>,
  verificationToken: T,
) => {
  dispatch({ type: VerifyEmailActionTypes.REQUESTED_VERIFY_EMAIL });

  axios
    .get(`/verifyEmail/${verificationToken}`)
    .then((response) => {
      dispatch({
        type: VerifyEmailActionTypes.RECIVED_VERIFY_EMAIL,
        statusCode: response.status,
      });
    })
    .catch((error) => {
      dispatch({
        type: VerifyEmailActionTypes.FAILED_VERIFY_EMAIL,
        statusCode: error?.response.status,
      });
    });
};

export const singUpAction = <T>(dispatch: Dispatch<SignUpAction>, data: T) => {
  dispatch({ type: SignUpActionTypes.REQUESTED_SIGNUP });

  axios
    .post("/register", data)
    .then((response) => {
      dispatch({
        type: SignUpActionTypes.RECIVED_SIGNUP,
        statusCode: response.status,
      });
    })
    .catch((error) => {
      dispatch({
        type: SignUpActionTypes.FAILED_SIGNUP,
        statusCode: error?.response.status,
      });
    });
};
