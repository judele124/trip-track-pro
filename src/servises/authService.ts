import { Types } from "trip-track-package";
import { API_BASE_URL } from "../env.config";
import { UseAxiosResponse } from "../hooks/useAxios";
import { getErrorMessage } from "../utils/errorMessages";
import { ServiceError } from "@/utils/ServiceError";

type Activate = UseAxiosResponse["activate"];

interface IUserResponseData {
  email: string;
  name: string;
  _id: string;
}

export const sendCode = async (
  email: string,
  activate: Activate,
): Promise<{ status: number; data?: any }> => {
  const url = `${API_BASE_URL}/auth/send-code`;
  const { error, data, status } = await activate({
    data: { email },
    url,
    method: "post",
  });

  if (error) {
    throw new ServiceError(getErrorMessage(status), status);
  }

  return { data, status };
};

export const verifyCode = async (
  data: Types["Auth"]["LoginSchema"],
  activate: Activate,
): Promise<{
  user: IUserResponseData;
  status: number;
}> => {
  const url = `${API_BASE_URL}/auth/verify-code`;
  const {
    error,
    data: resData,
    status,
  } = await activate({
    data,
    url,
    method: "post",
  });

  if (error) {
    throw new ServiceError(getErrorMessage(status), status);
  }
  delete resData.user.iv;
  return { user: resData.user, status };
};

export const logout = async (
  activate: Activate,
): Promise<{ status: number; data?: any }> => {
  const url = `${API_BASE_URL}/auth/logout`;
  const { error, data, status } = await activate({
    url,
    method: "post",
  });

  if (error) {
    throw new ServiceError(getErrorMessage(status), status);
  }

  return { status, data };
};

export const validateToken = async (
  activate: Activate,
): Promise<{ status: number; user: IUserResponseData }> => {
  const url = `${API_BASE_URL}/auth/validate-token`;
  const {
    error,
    data: user,
    status,
  } = await activate({
    url,
    method: "get",
  });

  if (error) {
    throw new ServiceError(getErrorMessage(status), status);
  }

  return { status, user };
};
