import { API_ENDPOINTS } from "@/framework/api-endpoints";
import axios from "axios";
import { axiosConfig } from "@/framework/axiosConfig";

const axiosInstance = axios.create(axiosConfig);

export const filmQuery = async ({
  year,
  page,
  with_genres,
  language,
  query,
}: {
  year?: string;
  page?: number;
  with_genres?: string;
  language?: string;
  query?: string;
}) => {
  const params = {
    page: page || 1,
    language: language || "en",
    with_genres: with_genres || "",
    year: year || "",
    query: query || "",
  };
  const res = await axiosInstance.get(API_ENDPOINTS.FILMS, { params });
  return res.data.results;
};

export const filmGenreQuery = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.FILM_GENRES);
  return res.data.genres;
};

export const filmDetailQuery = async (id: string) => {
  const res = await axiosInstance.get(API_ENDPOINTS.FILM_DETAIL(id));
  return res.data;
};
