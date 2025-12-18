type CommonSidebarProps = {
  header: string;
  description: string;
};

function CommonSidebar({ header, description }: CommonSidebarProps) {
  return (
    <section className={`w-[30%] bg-white px-5 max-[950px]:hidden`}>
      <div
        className={`max-[950px]:z-50 max-[950px]:absolute max-[950px]:bottom-0 max-[950px]:left-0 bg-white
              max-[950px]:w-full  max-[950px]:bg-[#E9EBF9] max-[950px]:rounded-t-2xl `}
      >
        <div
          className=" max-[950px]:rounded-2xl max-[950px]:mx-[20px]
            max-[950px]:px-6 max-[950px]:pb-6 max-[950px]:my-[34px] bg-white"
        >
          {/* Header section of the sidebar, displaying title and a close button. */}
          <header
            className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
               justify-between"
          >
            <h1>Information</h1>
          </header>

          <section className=" flex flex-col gap-4 border border-[#E9EBF9] rounded-2xl p-5 mt-8">
            <h1 className=" text-[#282828] font-nunito-sans text-xl tracking-wide font-semibold">
              {header}
            </h1>
            <p className=" text-[#868686] text-base font-medium font-nunito-sans">
              {description}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export default CommonSidebar;
