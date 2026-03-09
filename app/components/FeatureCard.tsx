import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <Link href={`${link}`} className="group block text-decoration-none">
      <div className="bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100/50 transition-colors" />

        {/* Image Container */}
        <div className="relative w-full sm:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-black/5">
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-3 relative z-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-[#282828] text-xl font-semibold tracking-tight group-hover:text-[#1C398E] transition-colors">
              {title}
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-semibold text-[#1C398E] uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                {span1}
              </span>
              <span className="text-[10px] font-semibold text-[#1C398E] uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-md">
                {span2}
              </span>
            </div>
          </div>

          <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 text-[#1C398E] text-xs font-semibold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            Start Learning <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
