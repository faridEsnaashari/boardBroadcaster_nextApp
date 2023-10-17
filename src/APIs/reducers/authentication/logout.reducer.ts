import { LogoutAction } from "@/APIs/types/authentication/actions.type";
import { LogoutActionTypes } from "@/APIs/types/authentication/authentication.enum";
import { LogoutState } from "@/APIs/types/authentication/reducers.type";

export const logoutInitialState: LogoutState = {
  isFetching: false,
  statusCode: undefined,
};

export const logoutReducer = (
  state: LogoutState,
  action: LogoutAction,
): LogoutState => {
  let currentState: LogoutState = { ...state };

  switch (action.type) {
    case LogoutActionTypes.REQUESTD_LOGOUT: {
      currentState = {
        isFetching: true,
        statusCode: undefined,
      };
      break;
    }

    case LogoutActionTypes.RECIVED_LOGOUT: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
      };
      break;
    }

    case LogoutActionTypes.FAILED_LOGOUT: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
      };
      break;
    }
  }

  return currentState;
};
