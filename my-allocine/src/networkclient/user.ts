"use client";
import { API_ENDPOINTS } from "@/framework/api-endpoints";
import axios from "axios";
import { axiosConfig } from "@/framework/axiosConfig";

// Common function to create an Axios instance with headers and authorization
const createAxiosInstance = () => {
  let token = JSON.parse(sessionStorage.getItem("user") || "{}").tempToken;

  if (!token) {
    token = localStorage.getItem("token");
  }

  const instance = axios.create({
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export const profileQuery = async (): Promise<{
  data: any;
  message: string;
  success: boolean;
}> => {
  const axiosInstance = createAxiosInstance();

  try {
    const res = await axiosInstance.get(API_ENDPOINTS.PROFILE);

    return res.data;
  } catch (error: any) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return {
      data: {
        _id: "",
        email: "",
        profile: {},
      },
      message: error.message,
      success: false,
    };
  }
};

export const updateProfileQuery = async ({
  profile,
}: {
  profile: any;
}): Promise<{
  data: any;
  message: string;
  success: string;
}> => {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.put(API_ENDPOINTS.PROFILE, {
    profile,
  });
  return res.data;
};
