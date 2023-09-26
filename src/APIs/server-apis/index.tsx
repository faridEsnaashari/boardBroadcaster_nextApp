import axios, { AxiosInstance } from "axios";
import { BoardExistsActionData, ServerApisResponse } from "./server-apis.type";
import { cookies } from "next/headers";
import { API_URL } from "@/config";
import { ApiUser } from "../types/boards/entities.type";
import { User } from "@/common/types/entities.type";

export async function doesBoardExists(
  data: BoardExistsActionData,
): Promise<ServerApisResponse> {
  const axiosInstance = configAxios();
  const response = await axiosInstance.get<ServerApisResponse>(
    `/board/identifier/${data.boardIdentifier}`,
  );

  return response.data;
}

export async function getUserData(data: boolean): Promise<User> {
  const axiosInstance = configAxios();
  const response = await axiosInstance.get<ServerApisResponse<ApiUser>>(
    `/user?complete=${data}`,
  );

  const { _id, name, email, boards: apiBoards } = response.data.data;
  const boards = apiBoards.map((board) => ({ ...board, owner: undefined }));

  return {
    _id,
    name,
    email,
    boards,
  };
}

function configAxios(): AxiosInstance {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken");

  return axios.create({
    baseURL: API_URL,
    headers: { Cookie: `${token?.name}=${token?.value}` },
  });
}
