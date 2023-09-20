import axios, { AxiosInstance } from "axios";
import { ServerApisResponse } from "./server-apis.type";
import { cookies } from "next/headers";
import { API_URL } from "@/config";

export async function getUserData(data: boolean): Promise<ServerApisResponse> {
  const axiosInstance = configAxios();
  const response = await axiosInstance.get(`/user?complete=${data}`);

  const { _id, name, email, boards } = response.data.data;

  return {
    statusCode: response.status,
    data: {
      _id,
      name,
      email,
      boards,
    },
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
