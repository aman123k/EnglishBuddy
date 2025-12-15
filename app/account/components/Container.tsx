import { useStore } from "@/app/store/store";
import { IoMdPerson } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdSupportAgent } from "react-icons/md";

function Container() {
  const { setAccountSidebar } = useStore();

  const handleProfileSidebar = (title: string) => {
    setAccountSidebar({
      isOpen: true,
      title: title,
    });
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
