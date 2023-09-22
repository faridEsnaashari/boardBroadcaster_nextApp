import { BoardCrudAction } from "@/APIs/types/boards/actions.type";
import {
  CreateBoardActionTypes,
  DeleteBoardAcrionTypes,
  UpdateBoardActionTypes,
} from "@/APIs/types/boards/boards.enum";
import { BoardCrudState } from "@/APIs/types/boards/reducer.type";
import { BoardColor } from "@/common/types/entities.type";

export const createBoardInitialState: BoardCrudState = {
  isFetching: false,
};

export const createBoardReducer = (
  state: BoardCrudState,
  action: BoardCrudAction<CreateBoardActionTypes>,
): BoardCrudState => {
  let currentState: BoardCrudState = { ...state };

  switch (action.type) {
    case CreateBoardActionTypes.REQUESTED_BOARD_CREATE: {
      currentState = {
        isFetching: true,
      };
      break;
    }

    case CreateBoardActionTypes.RECIVED_BOARD_CREATE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        error: undefined,
        board: {
          _id: action.board?._id as string,
          name: action.board?.name as string,
          color: action.board?.color as BoardColor,
          boardIdentifier: action.board?.boardIdentifier as string,
        },
      };
      break;
    }

    case CreateBoardActionTypes.FAILED_BOARD_CREATE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        board: undefined,
        error: action.error,
      };
      break;
    }
  }

  return currentState;
};

export const updateBoardInitialState: BoardCrudState = {
  isFetching: false,
};

export const updateBoardReducer = (
  state: BoardCrudState,
  action: BoardCrudAction<UpdateBoardActionTypes>,
): BoardCrudState => {
  let currentState: BoardCrudState = { ...state };

  switch (action.type) {
    case UpdateBoardActionTypes.REQUESTED_BOARD_UPDATE: {
      currentState = {
        isFetching: true,
      };
      break;
    }

    case UpdateBoardActionTypes.RECIVED_BOARD_UPDATE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        error: undefined,
        board: {
          _id: action.board?._id as string,
          name: action.board?.name as string,
          color: action.board?.color as BoardColor,
          boardIdentifier: action.board?.boardIdentifier as string,
        },
      };
      break;
    }

    case UpdateBoardActionTypes.FAILED_BOARD_UPDATE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        board: undefined,
        error: action.error,
      };
      break;
    }
  }

  return currentState;
};

export const deleteBoardInitialState: BoardCrudState = {
  isFetching: false,
};

export const deleteBoardReducer = (
  state: BoardCrudState,
  action: BoardCrudAction<DeleteBoardAcrionTypes>,
): BoardCrudState => {
  let currentState: BoardCrudState = { ...state };

  switch (action.type) {
    case DeleteBoardAcrionTypes.REQUESTED_BOARD_DELETE: {
      currentState = {
        isFetching: true,
      };
      break;
    }

    case DeleteBoardAcrionTypes.RECIVED_BOARD_DELETE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        error: undefined,
        board: {
          _id: action.board?._id as string,
          name: action.board?.name as string,
          color: action.board?.color as BoardColor,
          boardIdentifier: action.board?.boardIdentifier as string,
        },
      };
      break;
    }

    case DeleteBoardAcrionTypes.FAILED_BOARD_DELETE: {
      currentState = {
        isFetching: false,
        statusCode: action.statusCode,
        error: action.error,
      };
      break;
    }
  }

  return currentState;
};
