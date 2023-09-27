"use client";
import { useRouter, usePathname } from "next/navigation";
import { BackArrowRound } from "@/components/icons/back-arrow-round";
import { ToastContainer } from "react-toastify";

const privateRoutes = ["/dashbord", "/profile"];

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = sessionStorage.getItem("user");

  if (privateRoutes.includes(usePathname()) && !user) {
    return (
      <div className="relative flex justify-center w-full min-h-screen py-5 md:py-8">
        <button
          className="absolute flex items-center justify-center w-8 h-8 text-gray-200 transition-colors md:w-16 md:h-16 top-5 md:top-1/2 ltr:left-5 rtl:right-5 ltr:md:left-10 rtl:md:right-10 md:-mt-8 md:text-gray-300 hover:text-gray-400"
          onClick={router.back}
        >
          <BackArrowRound />
        </button>
        <div className="flex flex-col my-auto">
          {/* <LoginView /> */}
          <p className="text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
            {"You must be logged in to access this page"}
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default PrivateRoute;
