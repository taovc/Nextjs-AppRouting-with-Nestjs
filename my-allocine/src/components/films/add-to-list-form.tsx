"use client";
import Logo from "@/components/ui/logo";
import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/forms/form";
import Select from "@/components/ui/select/select";
import { filmGenreQuery } from "@/networkclient/film";
import { use, useEffect, useState } from "react";
import { updateProfileQuery } from "@/networkclient/user";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { toast } from "react-toastify";

interface AddToPlayListInput {
  filmId: string;
  listName: string;
}

function AddToPlayListForm({ filmId }: { filmId: any }) {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;
  const { closeModal } = useModalAction();
  const playlist = user?.profile?.playlist;

  async function onSubmit({ listName }: AddToPlayListInput) {
    let newPlaylist = [];
    try {
      newPlaylist = playlist?.map((list: any) => {
        if (
          list.title === listName &&
          !list.movies.includes(filmId.toString())
        ) {
          list.movies.push(filmId);
        } else if (
          list.title === listName &&
          list.movies.includes(filmId.toString())
        ) {
          throw new Error("Film already in playlist");
        }
        return list;
      });
    } catch (error) {
      toast.error("Film already in this playlist");
      return;
    }
    const newProfile = await updateProfileQuery({
      profile: {
        ...user.profile,
        playlist: newPlaylist,
      },
    });
    if (!newProfile?.success) {
      toast.error("Playlist not updated");
      return;
    }
    user.profile = {
      ...newProfile?.data,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    closeModal();
  }

  return (
    <>
      <Alert variant="error" message={""} className="mb-6" closeable={true} />
      <Form<AddToPlayListInput> onSubmit={onSubmit}>
        {({ setValue, formState: { errors } }) => (
          <>
            <Select
              options={playlist || []}
              getOptionLabel={(genre: any) => genre.title}
              getOptionValue={(genre: any) => genre.title}
              isLoading={false}
              onChange={(e: any) => {
                setValue("listName", e?.title);
              }}
            />
            <div className="mt-8">
              <Button
                className="h-11 w-full sm:h-12"
                loading={false}
                disabled={false}
              >
                {"Continue"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default function AddToPlayListView({ filmId }: { filmId: string }) {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {"Select your playlist to add this film"}
      </p>
      <AddToPlayListForm filmId={filmId} />
    </div>
  );
}
