import { API_BASE_URL } from "@/env.config";
import { UseAxiosResponse } from "@/hooks/useAxios";
import { Types } from "trip-track-package";

export const tripCreate = async (
  activate: UseAxiosResponse["activate"],
  tripData: Types["Trip"]["Model"],
): Promise<{ status: number; data?: any }> => {
  const { data, status } = await activate({
    url: `${API_BASE_URL}/trip/create`,
    method: "post",
    data: tripData,
  });

  return { data, status };
};

export const tripGet = async (
  activate: UseAxiosResponse["activate"],
  id: string,
) => {
  const { data, status } = await activate({
    url: `${API_BASE_URL}/trip/get/${id}`,
    method: "get",
  });

  return { data, status };
};
