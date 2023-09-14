import { LoginAction } from "@/APIs/types/authentication/actions.type";
import { LoginActionTypes } from "@/APIs/types/authentication/authentication.enum";
import {
  LoginState,
  VerifyEmailState,
} from "@/APIs/types/authentication/reducers.type";

export const loginInitialState: LoginState = {
  isFetching: false,
  statusCode: undefined,
  userToken: undefined,
};

export const loginReducer = (
  state: LoginState,
  action: LoginAction
): VerifyEmailState => {
  let currentState: LoginState = { ...state };

  switch (action.type) {
    case LoginActionTypes.REQUESTD_LOGIN: {
      currentState = {
        isFetching: true,
        statusCode: undefined,
        userToken: undefined,
      };
      break;
    }

    case LoginActionTypes.RECIVED_LOGIN: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        userToken: action.userToken,
      };
      break;
    }

    case LoginActionTypes.FAILED_LOGIN: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        userToken: undefined,
      };
      break;
    }
  }

  return currentState;
};
