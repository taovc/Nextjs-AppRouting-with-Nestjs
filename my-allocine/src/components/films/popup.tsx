import Details from "./details";

interface ProductPopupProps {
  film: any;
}
const Popup: React.FC<ProductPopupProps> = ({ film }) => {
  return (
    <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
      <Details product={film?.data} backBtn={false} isModal={true} />
    </article>
  );
};

export default Popup;
