import cn from "classnames";
import dynamic from "next/dynamic";
import Logo from "@/components/ui/logo";
import { client } from "@/framework";
import DashbordHeader from "@/app/dashbord/_components/header";
import LinkButton from "./button/link-button";

const AuthButton = dynamic(() => import("./button/login-button"), {
  ssr: false,
});

const Header = async ({ layout }: { layout?: string }) => {
  const data = (await client.flims.genres({})) as any;
  const startYear = 2023;
  const endYear = 1980;
  const yearDictionary = [];
  const langs = [
    { id: "en", name: "English" },
    { id: "fr", name: "French" },
    { id: "ar", name: "Arabic" },
    { id: "es", name: "Spanish" },
    { id: "de", name: "German" },
  ];

  for (let year = startYear; year >= endYear; year--) {
    yearDictionary.push({ id: year.toString(), name: year.toString() });
  }

  return (
    <header
      className={cn("site-header-with-search h-14 md:h-16 lg:h-22", {
        "lg:!h-auto": layout === "minimal",
      })}
    >
      <div
        className={cn(
          "fixed z-50 flex h-14 w-full transform-gpu items-center justify-between border-b border-border-200 bg-light px-4 py-5 shadow-sm transition-transform duration-300 md:h-16 lg:h-22 lg:px-8",
          {
            "lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none":
              layout === "minimal",
          }
        )}
      >
        <div className="flex w-full items-center lg:w-auto">
          <Logo className={`${"mx-auto lg:mx-0"}`} />
        </div>

        <DashbordHeader
          data={data}
          yearDictionary={yearDictionary}
          langs={langs}
        />

        <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10 m-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <li>
              {" "}
              <LinkButton path="/dashbord" name="HOME" />
            </li>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <li>
              {" "}
              <AuthButton />
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
