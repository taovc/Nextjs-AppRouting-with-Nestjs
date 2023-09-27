"use client";
import Select from "@/components/ui/select/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import cn from "classnames";

export default function CategoryTypeFilter({
  options,
  className = "defaultClassName",
  placeholder = "Select a genre",
  keys,
}: any) {
  const [mount, setMount] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMount(true);
    return () => {
      setMount(false);
    };
  }, []);
  if (!mount) return null;

  const User = sessionStorage.getItem("user");
  if (!User || pathname === "/") {
    return null;
  }

  const onGenreFilter = (option: any) => {
    // Get the current search parameters
    const currentSearchParams = new URLSearchParams(window.location.search);
    // Add or update the selected option based on the keys
    if (option) {
      currentSearchParams.set(keys, option.id);
    } else {
      currentSearchParams.delete(keys);
    }
    // Construct the new URL
    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0",
        className
      )}
    >
      <div className="w-full">
        <div className="flex gap-2">
          <Select
            options={options}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            placeholder={placeholder}
            isLoading={false}
            onChange={onGenreFilter}
            className="w-full"
            isClearable={true}
          />
        </div>
      </div>
    </div>
  );
}
