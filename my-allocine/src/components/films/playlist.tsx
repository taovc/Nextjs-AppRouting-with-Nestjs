"use client";
import Logo from "@/components/ui/logo";
import Alert from "@/components/ui/alert";
import Input from "@/components/ui/forms/input";
import Button from "@/components/ui/button";
import { Form } from "@/components/ui/forms/form";
import { useState } from "react";
import { updateProfileQuery } from "@/networkclient/user";

function PlayListForm() {
  const [serverError, setServerError] = useState(null as any);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;

  async function onSubmit({ listName }: { listName: string }) {
    const data = await updateProfileQuery({
      profile: { playlist: listName, create: true },
    });
    if (!data?.success) {
      setServerError(data?.message);
      return;
    }
    user.profile = {
      ...data?.data,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  }

  return (
    <>
      <Alert
        variant="error"
        message={serverError}
        className="mb-6"
        closeable={true}
        onClose={() => setServerError(null)}
      />
      <Form<{
        listName: string;
      }>
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={"List Name"}
              {...register("listName")}
              type="listName"
              variant="outline"
              className="mb-5"
              error={errors.listName?.message!}
            />
            <div className="mt-8">
              <Button
                className="h-11 w-full sm:h-12"
                loading={false}
                disabled={false}
              >
                {"Create"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default function PlayListView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {"Create a play list"}
      </p>
      <PlayListForm />
    </div>
  );
}
