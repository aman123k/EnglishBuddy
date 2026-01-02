import Image from "next/image";
import Link from "next/link";

interface cardProps {
  link: string;
  title: string;
  description: string;
  image: string;
  span1: string;
  span2: string;
}

function FeatureCard({
  link,
  title,
  description,
  image,
  span1,
  span2,
}: cardProps) {
  return (
    <Link href={`${link}`}>
      <div
        className=" border border-[#E9EBF9] px-8 py-6 bg-white flex items-center relative max-[650px]:px-6
      overflow-hidden justify-between rounded-3xl drop-shadow-md cursor-pointer gap-10 max-[650px]:gap-5"
      >
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[#282828] text-xl font-semibold font-nunito-sans  max-[650px]:text-lg">
            {title}
          </h1>
          <p className=" py-1.5 text-base text-gray-400 font-medium font-nunito-sans max-[650px]:text-sm">
            {description}
          </p>
          <div className=" text-[#1C398E] flex gap-3 text-sm mt-2 font-medium max-[650px]:text-xs  max-[650px]:gap-2">
            <span>{span1}</span>
            <span>{span2}</span>
          </div>
        </div>
        <div className=" relative rounded-2xl overflow-hidden flex-shrink-0">
          <div className=" absolute bg-black left-0 top-0 w-full h-full opacity-40"></div>
          <Image
            src={image}
            alt={title}
            height={1000}
            width={1000}
            className=" w-[200px] h-[150px] object-cover max-[650px]:w-[130px] max-[650px]:h-[130px] "
          />
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
