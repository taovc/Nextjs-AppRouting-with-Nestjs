import cn from "classnames";
import Image from "next/image";
import { useModalAction } from "@/components/ui/modal/modal.context";

type HeliumProps = {
  data: any;
  className?: string;
  genreNames?: string;
};

const Helium: React.FC<HeliumProps> = ({ data, className }) => {
  const { name, image, description } = data ?? {};
  const { openModal } = useModalAction();

  let truncatedName = "";
  if (name !== undefined)
    truncatedName = name?.length > 27 ? name?.slice(0, 27) + "..." : name;

  const handleProductQuickView = () => {
    openModal("FILM_DETAIL_VIEW", { data });
  };

  return (
    <article
      className={cn(
        "product-card cart-type-helium h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex h-48 w-auto items-center justify-center sm:h-64"
        role="button"
      >
        <span className="sr-only">{"text-product-image"}</span>
        <Image
          src={image?.url}
          alt={name}
          className="fill w-auto h-full"
          priority={true}
          width="100"
          height="100"
        />
      </div>
      {/* End of product image */}
      <header className="relative p-3 md:p-5 md:py-6">
        <h1
          //   onClick={handleProductQuickView}
          role="button"
          className="w-40 h-7 overflow-hidden text-overflow-ellipsis"
        >
          {truncatedName.length > 15
            ? truncatedName.slice(0, 15) + " ..."
            : truncatedName}
        </h1>
        <p className="text-xs text-muted whitespace-pre-line w-40 h-10">
          {/* @ts-ignore */}
          {description?.length > 60 ? (
            <span>
              {description?.slice(0, 60)}{" "}
              <span className="text-accent">...</span>
            </span>
          ) : (
            description
          )}
        </p>

        <div className="relative mt-7 flex min-h-6 items-center justify-between md:mt-8">
          <div className="relative">
            <span className="text-sm font-semibold text-accent md:text-base">
              {data?.release_date}
            </span>
          </div>

          <button
            onClick={() => handleProductQuickView()}
            className="order-5 flex items-center justify-center rounded-full border-2 border-border-100 bg-light px-3 py-2 text-sm font-semibold text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-light focus:border-accent focus:bg-accent focus:text-light focus:outline-none sm:order-4 sm:justify-start sm:px-5"
          >
            <span>{"DETAILS"}</span>
          </button>
        </div>
      </header>
    </article>
  );
};

export default Helium;
