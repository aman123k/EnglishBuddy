import Lottie from "lottie-react";
import React, { useState } from "react";
import successLoader from "../../../public/Images/success.json";

function LoaderDialog() {
  const dimensions = { height: 250, width: 250 };
  const [isComplete, setIsComplete] = useState(true);
  setTimeout(() => {
    setIsComplete(false);
  }, 2500);
  return (
    <section>
      <div className=" flex justify-center items-center -my-10">
        <Lottie
          loop={true}
          autoplay={true}
          animationData={successLoader}
          height={dimensions.height}
          width={dimensions.width}
          style={{ height: dimensions.height, width: dimensions.width }}
        />
      </div>
      <div className=" text-center nunito-sans ">
        <p className=" font-semibold text-xl text-[#282828]">
          Personalization in {isComplete ? "progress" : "Complete"}{" "}
        </p>
        <p className=" text-[#7a7a7a] mt-3 text-base max-w-[370px] font-medium max-[650px]:text-sm mx-auto">
          {isComplete
            ? "We are creating your personalized learning plan. This may take a few moments."
            : "Your personalized learning plan is ready! Let's get started on your language learning journey."}
        </p>
      </div>
    </section>
  );
}

export default LoaderDialog;
