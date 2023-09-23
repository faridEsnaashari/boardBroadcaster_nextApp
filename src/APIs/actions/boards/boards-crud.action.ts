import {
  BoardCrudAction,
  ApiBoardResponse,
  UpdateBoardActionData,
  CreateBoardActionData,
  DeleteBoardActionData,
} from "@/APIs/types/boards/actions.type";
import {
  CreateBoardActionTypes,
  DeleteBoardAcrionTypes,
  UpdateBoardActionTypes,
} from "@/APIs/types/boards/boards.enum";
import axios from "axios";
import { Dispatch } from "react";

export const createBoardAction = (
  dispatch: Dispatch<BoardCrudAction<CreateBoardActionTypes>>,
  data: CreateBoardActionData,
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

export const updateBoardAction = (
  dispatch: Dispatch<BoardCrudAction<UpdateBoardActionTypes>>,
  data: UpdateBoardActionData,
) => {
  dispatch({ type: UpdateBoardActionTypes.REQUESTED_BOARD_UPDATE });

  const { id, ...rest } = data;

  axios
    .put<ApiBoardResponse>(`/board/${id}`, rest)
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

export const deleteBoardAction = (
  dispatch: Dispatch<BoardCrudAction<DeleteBoardAcrionTypes>>,
  data: DeleteBoardActionData,
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
        error: data.id,
      });
    });
};
