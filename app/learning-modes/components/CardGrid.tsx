// Generic grid of clickable cards used for learning mode entry points (e.g. characters).
// Each card links to a dynamic route using the provided base path and card id.
import { cardGridInterface } from "@/app/interface/cardGridInterface";
import Image from "next/image";
import Link from "next/link";
import useAuthentication from "@/app/hooks/useAuth";
import { useStore } from "@/app/store/store";
import { Lock } from "lucide-react";

function CardGrid({
  CardGridArray,
  path,
}: {
  path: string;
  CardGridArray: cardGridInterface[];
}) {
  const { userData } = useAuthentication();
  const setSubscriptionModalOpen = useStore((state) => state.setSubscriptionModalOpen);
  const isFree = !userData || userData.subscriptionPlan === "free";

  return (
    <section className="h-[calc(100dvh-75px)] max-[950px]:h-[calc(100dvh-79px)] overflow-y-auto no-scrollbar py-6 max-[850px]:pb-52">
      <div className="grid grid-cols-2 gap-5 max-[650px]:gap-3">
        {CardGridArray.map((item: cardGridInterface) => {
          return (
            <Link
              href={isFree ? "#" : `/${path}/${item._id}`}
              onClick={(e) => {
                if (isFree) {
                  e.preventDefault();
                  setSubscriptionModalOpen(true);
                }
              }}
              key={item._id}
              className="w-full relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className=" absolute bg-black w-full h-full left-0 top-0 opacity-50 z-10"></div>
              {isFree && (
                <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-amber-500 text-black p-2.5 rounded-full shadow-lg">
                    <Lock size={20} />
                  </div>
                </div>
              )}
              <div>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  height={200}
                  width={200}
                  className=" w-full max-[650px]:min-h-[130px]"
                />
              </div>
              <h2
                className=" absolute z-10 top-0 left-0 text-white px-6 
               max-[650px]:text-base py-4 text-xl font-semibold font-nunito-sans"
              >
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CardGrid;
