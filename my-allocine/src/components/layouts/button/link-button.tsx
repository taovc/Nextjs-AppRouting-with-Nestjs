"use client";
import { usePathname } from "next/navigation";

export default function LinkButton({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  const pathname = usePathname();

  if (pathname === path) {
    return null;
  }

  return (
    <span
      className="flex items-center custom-hover-effect cursor-pointer font-normal text-heading no-underline transition duration-200 hover:text-accent focus:text-accent"
      onClick={() => {
        window.location.href = path;
      }}
    >
      {name}
    </span>
  );
}
