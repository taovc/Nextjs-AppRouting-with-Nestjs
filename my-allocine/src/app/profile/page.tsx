import ProfileHome from "@/app/profile/_components/home";
import PlayList from "./_components/playlist";

export default async function Profile() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <ProfileHome />
      <PlayList />
    </div>
  );
}
