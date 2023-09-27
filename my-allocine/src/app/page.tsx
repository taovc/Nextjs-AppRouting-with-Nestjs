// "use client";
const homePages = [
  "https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/ff708b8f-bb94-4c1a-8758-5474c47741df/FR-fr-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg",
  "https://res.cloudinary.com/djjxcsdai/image/upload/v1693584803/samples/imges/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230901181110_gqlvu4.png",
  "https://res.cloudinary.com/djjxcsdai/image/upload/v1693584803/samples/imges/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230901181131_mioztp.png",
];

export default function HomeApp() {
  return (
    <div
      className="bg-white"
      style={{
        minHeight: "90vh",
      }}
    >
      <div className="mt-10">
        <div className="relative">
          <img
            className="w-full sm:h-full md:h-screen object-contain"
            src={homePages[0]}
            alt="Image"
          />
          <img
            className="w-full sm:h-full md:h-screen object-contain"
            src={homePages[1]}
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
}
