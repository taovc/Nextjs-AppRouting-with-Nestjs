"use client";
import ListGroup from "@/components/list-mui/list-group";
import StarBorder from "@mui/icons-material/StarBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { profileQuery } from "@/networkclient/user";
import { useEffect, useState } from "react";
import { filmDetailQuery } from "@/networkclient/film";

export default function ProfileHome() {
  const [liked, setLiked] = useState([] as any);
  const [seen, setSeen] = useState([] as any);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;
  const [playlist, setPlaylist] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await profileQuery()).data.user.profile as any;

      const liked = await Promise.all(
        data?.like?.map(async (id: string) => {
          return await filmDetailQuery(id);
        })
      );
      const seen = await Promise.all(
        data?.history?.map(async (id: string) => {
          return await filmDetailQuery(id);
        })
      );
      if (user?.profile?.playlist) {
        const movies = await Promise.all(
          user?.profile?.playlist?.map(async (list: any) => {
            return {
              ...list,
              movies: await Promise.all(
                list?.movies?.map(async (id: string) => {
                  return await filmDetailQuery(id);
                })
              ),
            };
          })
        );
        setPlaylist(movies);
      }
      setLiked(liked);
      setSeen(seen);
    };
    fetchData();
  }, []);

  return (
    <>
      <ListGroup
        header={"MY Profile List"}
        listData={[
          {
            name: "Like",
            MainIcon: FavoriteIcon,
            SubIcon: StarBorder,
            datas: liked,
          },
          {
            name: "Already Seen",
            MainIcon: CheckCircleIcon,
            SubIcon: StarBorder,
            datas: seen,
          },
        ]}
      />
      <ListGroup
        header={"MY Play List"}
        listData={playlist?.map((list: any) => {
          return {
            name: list?.title,
            MainIcon: FormatListBulletedIcon,
            SubIcon: StarBorder,
            datas: list?.movies,
          };
        })}
      />
    </>
  );
}
