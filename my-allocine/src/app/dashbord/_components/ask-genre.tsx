"use client";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { useEffect, useState } from "react";

export default function GenreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal } = useModalAction();
  const [userGenre, setUserGenre] = useState<string | null>(null);

  useEffect(() => {
    const checkUserGenre = async () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;

      if (user?.profile?.genre) {
        setUserGenre(user.profile.genre);
      } else {
        openModal("FILM_GENRE_VIEW");
        setTimeout(checkUserGenre, 1000);
      }
    };
    checkUserGenre();
  }, [userGenre, openModal]);

  return <div>{children}</div>;
}
