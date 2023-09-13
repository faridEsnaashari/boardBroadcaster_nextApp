import { VerifyEmailAction } from "@/APIs/types/authentication/actions.type";
import { VerifyEmailActionTypes } from "@/APIs/types/authentication/authentication.enum";
import { VerifyEmailState } from "@/APIs/types/authentication/reducers.type";

export const verifyEmailInitialState: VerifyEmailState = {
  isFetching: false,
  statusCode: undefined,
};

export const verifyEmailReducer = (
  state: VerifyEmailState,
  action: VerifyEmailAction
): VerifyEmailState => {
  let currentState: VerifyEmailState = { ...state };

  switch (action.type) {
    case VerifyEmailActionTypes.REQUESTED_VERIFY_EMAIL: {
      currentState = {
        isFetching: true,
        statusCode: undefined,
      };
      break;
    }

    case VerifyEmailActionTypes.RECIVED_VERIFY_EMAIL: {
      currentState = {
        isFetching: false,
        statusCode: (action as VerifyEmailAction).statusCode,
      };
      break;
    }

    case VerifyEmailActionTypes.FAILED_VERIFY_EMAIL: {
      currentState = {
        isFetching: false,
        statusCode: (action as VerifyEmailAction).statusCode,
      };
      break;
    }
  }

  return currentState;
};
