import React from "react";

function Footer() {
  return (
    <section className=" bg-white max-[650px]:bg-[#F5F5FC] rounded-xl w-full">
      <input
        type="text"
        className=" w-full rounded-xl p-4 text-[#282828] font-nunito-sans font-medium text-base outline-none"
        placeholder="Type a message..."
      />
    </section>
  );
}

export default Footer;
