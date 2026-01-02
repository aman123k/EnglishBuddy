// Full-screen loader used while chat data or characters are being fetched.
import Lottie from "lottie-react";
import chatsLoader from "../learning-modes/data/chatsLoading.json";
function Loader() {
  const dimensions = { height: 400, width: 500 };
  return (
    <div className=" absolute left-[50%] top-[50%] max-[950px]:mt-[50%] translate-y-[-50%] translate-x-[-50%]">
      <Lottie
        loop={true}
        autoplay={true}
        animationData={chatsLoader}
        height={dimensions.height}
        width={dimensions.width}
        style={{
          height: dimensions.height,
          width: dimensions.width,
        }}
      />
    </div>
  );
}

export default Loader;
