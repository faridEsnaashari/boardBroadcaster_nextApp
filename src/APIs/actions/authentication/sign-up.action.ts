import {
  VerifyEmailAction,
  VerifyEmailActionData,
} from "@/APIs/types/authentication/actions.type";
import { VerifyEmailActionTypes } from "@/APIs/types/authentication/authentication.enum";
import axios from "axios";
import { Dispatch } from "react";

export const verifyEmailAction = (
  dispatch: Dispatch<VerifyEmailAction>,
  verificationToken: VerifyEmailActionData
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
