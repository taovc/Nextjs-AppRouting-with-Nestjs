"use client";
import dynamic from "next/dynamic";
import Modal from "@/components/ui/modal/modal";
import { useModalAction, useModalState } from "./modal.context";
import FilmGenreView from "@/components/films/film-genre-form";
import Popup from "@/components/films/popup";
import PlayListForm from "@/components/films/playlist";
import AddToPlayListView from "@/components/films/add-to-list-form";
const Login = dynamic(() => import("@/components/auth/login-form"));

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "LOGIN_VIEW" && <Login />}
      {view === "FILM_GENRE_VIEW" && <FilmGenreView />}
      {view === "FILM_DETAIL_VIEW" && <Popup film={data} />}
      {view === "CREATE_PLAYLIST_VIEW" && <PlayListForm />}
      {view === "FILM_PLAYLIST_VIEW" && <AddToPlayListView filmId={data} />}
    </Modal>
  );
};

export default ManagedModal;
