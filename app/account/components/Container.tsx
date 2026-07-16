import usePostAPIRequest from "@/app/hooks/usePostAPIRequest";
import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { IoMdPerson } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdSupportAgent } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { GET_USER_INFORMATION } from "@/app/queryKeys/allQueryKeys";
import { deleteClientCookie } from "@/app/utils/cookie";

function Container() {
  const { setAccountSidebar, setUser } = useStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Hook for making POST API requests with loading states and error handling
  const { mutateAsync: mutatePost } = usePostAPIRequest();

  const handleProfileSidebar = (title: string) => {
    setAccountSidebar({
      isOpen: true,
      title: title,
    });
  };

  // Logs the user out and clears any cached user info to prevent redirect loops.
  const handleLogout = async () => {
    const path = "/api/logoutUser";
    // Call backend to destroy the session/cookies.
    const response = await mutatePost({ path, data: {} });
    if (response?.status) {
      // Clear local user and remove cached user info to avoid stale redirects.
      deleteClientCookie("lingo_logged_in");
      setUser(null);
      queryClient.removeQueries({
        queryKey: GET_USER_INFORMATION("/api/userInformation"),
      });
      const redirectPath = response.route ?? "/login";
      router.push(redirectPath);
    }
  };

  return (
    <section className=" bg-white py-4 px-6 max-[950px]:bg-[#E9EBF9] rounded-2xl flex flex-col gap-6">
      <h1 className="font-nunito-sans text-xl font-semibold text-[#282828]">
        Account settings
      </h1>

      <section className=" flex flex-col gap-5 max-[950px]:gap-4">
        {/* Profile */}
        <div
          onClick={() => handleProfileSidebar("Profile")}
          className=" group flex items-center gap-3 max-[950px]:border-white max-[950px]:bg-white
         border-[#E9EBF9] border px-5 rounded-2xl cursor-pointer py-3"
        >
          <IoMdPerson size={22} className="group-hover:text-[#1C398E]" />
          <div className=" flex flex-col gap-0">
            <h6 className="group-hover:text-[#1C398E] text-base font-nunito-sans text-[#282828] font-semibold">
              Profile
            </h6>
            <span className=" group-hover:text-[#6687eb] text-xs text-[#868686]">
              Manage your profile details.
            </span>
          </div>
        </div>
        {/* Setting */}
        <div
          onClick={() => handleProfileSidebar("Settings")}
          className=" group flex items-center gap-3 max-[950px]:border-white max-[950px]:bg-white
         border-[#E9EBF9] border px-5 rounded-2xl cursor-pointer py-3"
        >
          <IoSettingsOutline size={22} className="group-hover:text-[#1C398E]" />
          <div className=" flex flex-col gap-0">
            <h6 className="group-hover:text-[#1C398E] text-base font-nunito-sans text-[#282828] font-semibold">
              Settings
            </h6>
            <span className=" group-hover:text-[#6687eb] text-xs text-[#868686]">
              Manage your account settings.
            </span>
          </div>
        </div>
        {/* Support  */}
        <div
          onClick={() => handleProfileSidebar("Support")}
          className=" group flex items-center gap-3 max-[950px]:border-white max-[950px]:bg-white
         border-[#E9EBF9] border px-5 rounded-2xl cursor-pointer py-3"
        >
          <MdSupportAgent size={22} className="group-hover:text-[#1C398E]" />
          <div className=" flex flex-col gap-0">
            <h6 className="group-hover:text-[#1C398E] text-base font-nunito-sans text-[#282828] font-semibold">
              Support
            </h6>
            <span className=" group-hover:text-[#6687eb] text-xs text-[#868686]">
              Help center and contact.
            </span>
          </div>
        </div>
        {/* Logout */}
        <div
          onClick={handleLogout}
          className=" group flex items-center gap-3 max-[950px]:border-white max-[950px]:bg-white
         border-[#E9EBF9] border px-5 rounded-2xl cursor-pointer py-3"
        >
          <LuLogOut size={22} className=" text-red-600" />
          <div className=" flex flex-col gap-0">
            <h6 className="text-base font-nunito-sans text-red-600 font-semibold">
              Log out
            </h6>
            <span className=" group-hover:text-red-600 text-xs text-[#868686]">
              Log out from this profile.
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Container;
