"use client";
import cn from "classnames";
import { useEffect } from "react";
import Helium from "@/components/ui/films/cards/helium";
import { useSearch } from "../../../components/ui/search/search.context";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { filmGenreQuery, filmQuery } from "@/networkclient/film";

export default function FilmsHome() {
  let column = "auto";
  const { searchTerm } = useSearch();
  const genreIds = useSearchParams().get("with_genres") || "";
  const year = useSearchParams().get("year") || "";
  const language = useSearchParams().get("language") || "";
  const [films, setFilms] = useState([] as any);
  let data = [] as any;
  let genreDic = {} as any;

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;
    const fetchData = async () => {
      if (!genreIds)
      data = await filmQuery({
        year: year,
        language: language,
        with_genres: user?.profile?.genre,
        query: "",
      });
      genreDic = await filmGenreQuery();
      data = data?.map((film: any) => {
        let genreNames = film.genre_ids?.map(
          (genreId: any) =>
            genreDic.find((genre: any) => genre.id === genreId)?.name
        );
        return {
          ...film,
          genreNames: genreNames.join(", "), // Join genre names into a string
        };
      });
      setFilms(data);
    };
    fetchData();
  }, [genreIds, year, language]);

  useEffect(() => {
    if (window.innerWidth <= 550) {
      column = "mobile";
    } else {
      column = "auto";
    }
  }, []);

  useEffect(() => {
    if (genreIds || year || language) {
      const fetchData = async () => {
        const data = await filmQuery({
          year: year,
          language: language,
          with_genres: genreIds,
          query: "",
        });
        setFilms(data);
      };
      fetchData();
    } else {
      setFilms(data.results);
    }
  }, [genreIds, year, language]);

  let searchTermLower = searchTerm.toLowerCase();
  let newData = films?.filter((film: any) =>
    film.original_title.toLowerCase().includes(searchTermLower)
  );

  return (
    <div className="flex border-t border-solid border-border-200 border-opacity-70">
      <div className={cn("w-full", "px-4 pb-8 lg:p-8")}>
        <div
          className={cn({
            "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 m-2":
              column === "auto",
          })}
        >
          {newData?.map((film: any) => (
            <Helium
              key={film.id}
              data={{
                name: film?.original_title,
                image: {
                  url: "https://image.tmdb.org/t/p/w500" + film.poster_path,
                },
                description: film.overview,
                release_date: film.release_date,
                genreNames: film.genreNames,
                id: film.id,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
