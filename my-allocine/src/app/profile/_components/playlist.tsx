"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useModalAction } from "@/components/ui/modal/modal.context";

export default function PlayList() {
  const { openModal } = useModalAction();

  function handleOpenModal() {
    openModal("CREATE_PLAYLIST_VIEW");
  }

  return (
    <>
      <div className="relative flex-grow mt-7 md:mt-8"></div>
      <button
        onClick={handleOpenModal}
        className="absolute bottom-5 right-5 order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-5"
      >
        <AddBoxIcon className="mr-2" />
        <span>{"Create a play list"}</span>
      </button>
    </>
  );
}
