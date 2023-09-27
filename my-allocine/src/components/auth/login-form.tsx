"use client";
import Logo from "@/components/ui/logo";
import Alert from "@/components/ui/alert";
import Input from "@/components/ui/forms/input";
import PasswordInput from "@/components/ui/forms/password-input";
import Button from "@/components/ui/button";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { Form } from "@/components/ui/forms/form";
import { loginSchema } from "@/lib/formValidation";
import Checkbox from "@/components/ui/forms/checkbox/checkbox";
import { loginQuery } from "@/networkclient/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileQuery } from "@/networkclient/user";
import { toast } from "react-toastify";

const loginFormSchema = loginSchema();

interface LoginUserInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function LoginForm() {
  const { closeModal } = useModalAction();
  const [serverError, setServerError] = useState(null as any);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = (await profileQuery()) as any;
      if (!res?.success) {
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashbord");
      toast.success("Welcome back, auto login success");
      closeModal();
    };
    fetchData();
  }, []);

  async function onSubmit({
    email,
    password,
    rememberMe = false,
  }: LoginUserInput) {
    const { data, success, message } = await loginQuery({
      email,
      password,
      rememberMe,
    });

    if (!success) {
      setServerError(message);
    } else {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashbord");
      closeModal();
    }
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
      <Form<LoginUserInput>
        onSubmit={onSubmit}
        validationSchema={loginFormSchema}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={"email"}
              {...register("email")}
              type="email"
              variant="outline"
              className="mb-5"
              error={errors.email?.message!}
            />
            <PasswordInput
              label={"password"}
              {...register("password")}
              error={errors.password?.message!}
              variant="outline"
              className="mb-5"
            />
            <Checkbox
              label="Remember me"
              {...register("rememberMe")}
              className="mt-5"
            />
            <div className="mt-8">
              <Button
                className="h-11 w-full sm:h-12"
                loading={false}
                disabled={false}
              >
                {"login"}
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
}

export default function LoginView() {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {"Login with your email & password"}
      </p>
      <LoginForm />
    </div>
  );
}
