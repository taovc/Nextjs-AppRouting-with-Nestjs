import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

class Client {
  flims = {
    all: ({ year, with_genres, language, ...params }: Partial<any>) => {
      const queryParams = {
        year,
        with_genres,
        language,
        ...params,
      };
      return HttpClient.get(API_ENDPOINTS.FILMS, queryParams);
    },
    genres: ({ ...params }: Partial<any>) => {
      return HttpClient.get(API_ENDPOINTS.FILM_GENRES, params);
    },
  };
}

export const client = new Client();
