"use client";
import Truncate from "@/components/ui/truncate";
import classNames from "classnames";
import { updateProfileQuery } from "@/networkclient/user";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { toast } from "react-toastify";

type Props = {
  product: any;
  backBtn?: boolean;
  isModal?: boolean;
  isProductPage?: boolean;
};
const Details: React.FC<Props> = ({ product, isModal = false }) => {
  const { id, name, image, description, genreNames } = product ?? {};
  let user = JSON.parse(sessionStorage.getItem("user") || "{}") as any;
  const { openModal, closeModal } = useModalAction();

  async function onLike() {
    user.profile.like.push(id);
    const newProfile = await updateProfileQuery({
      profile: {
        ...user.profile,
        like: user.profile.like,
      },
    });
    if (!newProfile?.success) {
      toast.error("Can't un like for this version");
      closeModal();
      return;
    }
    user = {
      ...user,
      profile: {
        ...user.profile,
        like: newProfile?.data?.like,
      },
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    toast.success("Liked");
    closeModal();
  }

  async function onSeen() {
    user.profile.history.push(id);
    const newProfile = await updateProfileQuery({
      profile: {
        ...user.profile,
        history: user.profile.history,
      },
    });
    if (!newProfile?.success) {
      toast.error("Can't unSeen for this version");
      closeModal();
      return;
    }
    user = {
      ...user,
      profile: {
        ...user.profile,
        history: newProfile?.data?.history,
      },
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    toast.success("Have seen it");
    closeModal();
  }

  return (
    <article className="rounded-lg bg-light">
      <div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row relative">
        <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="product-gallery h-full">
            <img
              src={image?.url}
              alt={name}
              className="object-cover w-full h-full rounded-lg"
            ></img>
          </div>
        </div>

        <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16  mb-10">
          <div className="w-full">
            <div className="flex w-full items-start justify-between space-x-8 rtl:space-x-reverse">
              <h1
                className={classNames(
                  `text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-3xl`,
                  {
                    "cursor-pointer transition-colors hover:text-accent":
                      isModal,
                  }
                )}
              >
                {genreNames}
              </h1>
            </div>
            <div className="my-5 flex items-center md:my-10">
              <span className="flex items-center">
                <ins className="text-xl md:text-3xl font-semibold text-accent no-underline">
                  {name}
                </ins>
              </span>
            </div>

            {description && (
              <div className="mt-3 text-sm leading-7 text-body md:mt-4 whitespace-pre-line">
                <Truncate
                  character={150}
                  {...(!isModal && {
                    compressText: "see more",
                  })}
                >
                  {description}
                </Truncate>
              </div>
            )}
          </div>

          <div className="grid items-center lg:grid-row-2 gap-3 right-0 mt-3 mr-10 grid-flow-col">
            <div className="w-full">
              <button
                onClick={() => onLike()}
                className={`order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-5 ${
                  user?.profile?.like?.includes(id.toString())
                    ? "bg-red-700 text-cyan-50"
                    : ""
                }`}
              >
                <span>{"⭐ LIKE"}</span>
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => openModal("FILM_PLAYLIST_VIEW", id)}
                className="order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-5"
              >
                <span>{"❤ TO LIST"}</span>
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => onSeen()}
                className={`order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-5 ${
                  user?.profile?.history?.includes(id.toString())
                    ? "bg-red-700 text-cyan-50"
                    : ""
                }`}
              >
                <span>{"❌ HAVE SEEN"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Details;
