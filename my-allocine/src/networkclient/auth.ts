import { API_ENDPOINTS } from "@/framework/api-endpoints";
import axios from "axios";
import { axiosConfig } from "@/framework/axiosConfig";

const axiosInstance = axios.create(axiosConfig);

export const loginQuery = async ({
  email,
  password,
  rememberMe,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<{
  data: {
    user: {
      _id: string;
      email: string;
      profile: any;
    };
    token: string;
  };
  message: string;
  success: string;
}> => {
  const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
    email,
    password,
    rememberMe,
  });
  return res.data;
};
