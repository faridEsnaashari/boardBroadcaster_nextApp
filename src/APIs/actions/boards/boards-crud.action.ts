import {
  BoardCrudAction,
  ApiBoardResponse,
} from "@/APIs/types/boards/actions.type";
import {
  CreateBoardActionTypes,
  DeleteBoardAcrionTypes,
  UpdateBoardActionTypes,
} from "@/APIs/types/boards/boards.enum";
import axios from "axios";
import { Dispatch } from "react";

export const createBoardAction = <T>(
  dispatch: Dispatch<BoardCrudAction<CreateBoardActionTypes>>,
  data: T,
) => {
  dispatch({ type: CreateBoardActionTypes.REQUESTED_BOARD_CREATE });

  axios
    .post<ApiBoardResponse>("/board", data)
    .then((response) => {
      dispatch({
        type: CreateBoardActionTypes.RECIVED_BOARD_CREATE,
        statusCode: response.status,
        board: response?.data?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CreateBoardActionTypes.FAILED_BOARD_CREATE,
        statusCode: error?.response.status,
        error: error?.response.message,
      });
    });
};

export const updateBoardAction = <T>(
  dispatch: Dispatch<BoardCrudAction<UpdateBoardActionTypes>>,
  data: T,
) => {
  dispatch({ type: UpdateBoardActionTypes.REQUESTED_BOARD_UPDATE });

  axios
    .put<ApiBoardResponse>(`/board/${data.id}`, data)
    .then((response) => {
      dispatch({
        type: UpdateBoardActionTypes.RECIVED_BOARD_UPDATE,
        statusCode: response.status,
        board: response?.data?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UpdateBoardActionTypes.FAILED_BOARD_UPDATE,
        statusCode: error?.response.status,
        error: id,
      });
    });
};

export const deleteBoardAction = <T>(
  dispatch: Dispatch<BoardCrudAction<DeleteBoardAcrionTypes>>,
  data: T,
) => {
  dispatch({ type: DeleteBoardAcrionTypes.REQUESTED_BOARD_DELETE });

  axios
    .delete<ApiBoardResponse>(`/board/${data.id}`)
    .then((response) => {
      dispatch({
        type: DeleteBoardAcrionTypes.RECIVED_BOARD_DELETE,
        statusCode: response.status,
        board: response?.data?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DeleteBoardAcrionTypes.FAILED_BOARD_DELETE,
        statusCode: error?.response.status,
        error: data as string,
      });
    });
};
