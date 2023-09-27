"use client";
import SearchBox from "@/components/ui/search/search-box";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useSearch } from "./search.context";
interface Props {
  label: string;
  variant?: "minimal" | "normal" | "with-shadow" | "flat";
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, variant, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { searchTerm, updateSearchTerm } = useSearch();
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    router.push("/dashbord" + "?search=" + e.target.search.value);
  };

  function clearSearch() {
    updateSearchTerm("");
  }
  const User = sessionStorage.getItem("user");
  if (!User || pathname === "/") {
    return null;
  }

  return (
    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={t("Search your favorite movies by title")}
      variant={variant}
      {...props}
    />
  );
};

export default Search;
