import {
  SignUpAction,
  VerifyEmailAction,
} from "@/APIs/types/authentication/actions.type";
import {
  SignUpActionTypes,
  VerifyEmailActionTypes,
} from "@/APIs/types/authentication/authentication.enum";
import {
  SignUpState,
  VerifyEmailState,
} from "@/APIs/types/authentication/reducers.type";

export const verifyEmailInitialState: VerifyEmailState = {
  isFetching: false,
  statusCode: undefined,
};

export const verifyEmailReducer = (
  state: VerifyEmailState,
  action: VerifyEmailAction,
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
        statusCode: action.statusCode,
      };
      break;
    }

    case VerifyEmailActionTypes.FAILED_VERIFY_EMAIL: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
      };
      break;
    }
  }

  return currentState;
};

export const signUpReducerInitialState: SignUpState = {
  isFetching: false,
  statusCode: undefined,
};

export const signUpReducer = (
  state: SignUpState,
  action: SignUpAction,
): SignUpState => {
  let currentState: SignUpState = { ...state };

  switch (action.type) {
    case SignUpActionTypes.REQUESTED_SIGNUP: {
      currentState = {
        isFetching: true,
        statusCode: undefined,
      };
      break;
    }

    case SignUpActionTypes.RECIVED_SIGNUP: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
      };
      break;
    }

    case SignUpActionTypes.FAILED_SIGNUP: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
      };
      break;
    }
  }

  return currentState;
};
