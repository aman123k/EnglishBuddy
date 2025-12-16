"use client";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/store";
import Container from "./components/Container";
import Header from "./components/Header";
import ProfileSidebar from "./components/ProfileSidebar";
import useDeleteAPIRequest from "@/app/hooks/useDeleteAPIRequest";
import { GET_USER_INFORMATION } from "../queryKeys/allQueryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function Account() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { accountSidebar, setUser } = useStore();
  const { mutateAsync: mutateDelete } = useDeleteAPIRequest();

  const handleDelete = async () => {
    const path = "/api/deleteUser";
    // Call backend to destroy the session/cookies.
    const response = await mutateDelete({ path, data: {} });
    if (response?.status) {
      // Clear local user and remove cached user info to avoid stale redirects.
      setUser(null);
      queryClient.removeQueries({
        queryKey: GET_USER_INFORMATION("/api/userInformation"),
      });
      const redirectPath = response.route ?? "/login";
      router.push(redirectPath);
    }
  };

  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section
          className={`${
            !accountSidebar?.isOpen ? "w-full" : "w-[55%] max-[950px]:w-full"
          } flex flex-col gap-4 px-6 max-[950px]:px-4 relative ease-in-out duration-500`}
        >
          <Header />
          <Container />
          {/* Delete Account BTN */}
          <div className="bg-white py-4 px-6 max-[950px]:bg-[#E9EBF9] rounded-2xl">
            <div
              onClick={handleDelete}
              className=" group flex items-center gap-3 max-[950px]:border-white max-[950px]:bg-white
         border-[#E9EBF9] border px-5 rounded-2xl cursor-pointer py-3"
            >
              <MdDelete size={22} className=" text-red-600" />
              <div className=" flex flex-col gap-0">
                <h6 className="text-base font-nunito-sans text-red-600 font-semibold">
                  Delete account
                </h6>
                <span className=" group-hover:text-red-600 text-xs text-[#868686]">
                  This action can not be undone.
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Profile Side Bar */}
        <section
          className={`${
            accountSidebar?.isOpen ? "w-[30%] " : "hidden"
          } bg-white px-5 min-[950px]:relative`}
        >
          <ProfileSidebar />
        </section>
      </section>
    </section>
  );
}

export default Account;
