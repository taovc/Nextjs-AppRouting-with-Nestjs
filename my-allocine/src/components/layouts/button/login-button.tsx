"use client";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginButton() {
  const { openModal } = useModalAction();
  const user = sessionStorage.getItem("user");
  const pathname = usePathname();

  function handleAuth() {
    if (user) {
      sessionStorage.removeItem("user");
      window.location.href = "/";
      toast.success("Logout success");
    } else return openModal("LOGIN_VIEW");
  }

  useEffect(() => {}, [pathname]);

  return (
    <span
      className="flex items-center custom-hover-effect cursor-pointer font-normal text-heading no-underline transition duration-200 hover:text-accent focus:text-accent"
      onClick={() => handleAuth()}
    >
      {/* {"LOGIN"} */}
      {user ? "LOGOUT" : "LOGIN"}
    </span>
  );
}
