import FilmsHome from "@/app/dashbord/_components/home";

export default async function Dashbord() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <FilmsHome />
    </div>
  );
}
