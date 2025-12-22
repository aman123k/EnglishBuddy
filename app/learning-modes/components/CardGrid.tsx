// Generic grid of clickable cards used for learning mode entry points (e.g. characters).
// Each card links to a dynamic route using the provided base path and card id.
import { cardGridInterface } from "@/app/interface/cardGridInterface";
import Image from "next/image";
import Link from "next/link";

function CardGrid({
  CardGridArray,
  path,
}: {
  path: string;
  CardGridArray: cardGridInterface[];
}) {
  return (
    <section className="h-[calc(100dvh-75px)] max-[950px]:h-[calc(100dvh-79px)] overflow-y-auto no-scrollbar py-6">
      <div className="grid grid-cols-2 gap-5 max-[650px]:gap-3">
        {CardGridArray.map((item: cardGridInterface) => {
          return (
            <Link
              href={`/${path}/${item._id}`}
              key={item._id}
              className="w-full relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className=" absolute bg-black w-full h-full left-0 top-0 opacity-50"></div>
              <div>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  height={200}
                  width={200}
                  className=" w-full"
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
