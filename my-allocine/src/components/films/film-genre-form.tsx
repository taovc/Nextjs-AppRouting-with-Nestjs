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

interface filmGenreInput {
  genre: any;
}

function FilmGenreForm() {
  const [genre, setGenre] = useState([] as any);
  const user = sessionStorage.getItem("user") as any;
  const { closeModal } = useModalAction();

  useEffect(() => {
    const fetchData = async () => {
      const data = await filmGenreQuery();
      setGenre(data);
    };
    fetchData();
  }, []);

  async function onSubmit({ genre }: filmGenreInput) {
    const newProfile = await updateProfileQuery({
      profile: {
        ...user.profile,
        genre: genre?.id,
      },
    });
    let userJson = JSON.parse(user);
    userJson = {
      ...userJson,
      profile: {
        ...userJson.profile,
        genre: newProfile?.data?.genre,
      },
    };
    sessionStorage.setItem("user", JSON.stringify(userJson));
    closeModal();
  }

  return (
    <>
      <Alert variant="error" message={""} className="mb-6" closeable={true} />
      <Form<filmGenreInput> onSubmit={onSubmit}>
        {({ setValue, formState: { errors } }) => (
          <>
            <Select
              options={genre}
              getOptionLabel={(genre: any) => genre.name}
              getOptionValue={(genre: any) => genre.id}
              isLoading={false}
              onChange={(e) => {
                setValue("genre", e);
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

export default function FilmGenreView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {"Select your favorite genre"}
      </p>
      <FilmGenreForm />
    </div>
  );
}
