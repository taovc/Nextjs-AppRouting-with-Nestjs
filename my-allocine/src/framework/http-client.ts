import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 5000000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

Axios.interceptors.request.use((config) => {
  let token = process.env.API_KEY;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === "Invalid token. Please log in.")
    ) {
      error.response.data.message = "Invalid token. Please log in.";
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  static formatSearchParams(params: Partial<any>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
  }
}
