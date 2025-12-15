import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <header
      className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
"
    >
      <IoArrowBackOutline
        onClick={() => router.back()}
        size={20}
        className="inline-block cursor-pointer"
      />
      <h1>Account</h1>
    </header>
  );
}

export default Header;
