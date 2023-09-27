"use client";
import Search from "@/components/ui/search/search";
import CategoryTypeFilter from "@/components/ui/search-type-filter";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/layouts/button/login-button";
import LinkButton from "@/components/layouts/button/link-button";

export default function DashbordHeader({
  data,
  yearDictionary,
  langs,
}: {
  data: any;
  yearDictionary: any;
  langs: any;
}) {
  const pathname = usePathname();

  if (pathname !== "/dashbord") {
    return null;
  }

  return (
    <>
      <div className="mx-auto hidden w-full overflow-hidden px-10 lg:block xl:w-11/12 2xl:w-10/12">
        <Search label={"text-search-label"} variant="minimal" />
      </div>

      <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <li>
            {" "}
            <CategoryTypeFilter
              options={yearDictionary}
              placeholder={"Years"}
              keys={"year"}
            />
          </li>
        </div>
      </ul>

      <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <li>
            {" "}
            <CategoryTypeFilter
              options={langs}
              placeholder={"Lang"}
              keys={"language"}
            />
          </li>
        </div>
      </ul>

      <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <li>
            {" "}
            <CategoryTypeFilter
              options={data?.genres}
              placeholder={"Genre"}
              keys={"with_genres"}
            />
          </li>
        </div>
      </ul>

      <ul className="translate-x-7 hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <li>
            {" "}
            <LinkButton path="/profile" name="PROFILE" />
          </li>
        </div>
      </ul>
    </>
  );
}
