// Full-screen loader used while chat data or characters are being fetched.
import Lottie from "lottie-react";
import chatsLoader from "../learning-modes/data/chatsLoading.json";
function Loader() {
  // Loader dimensions are now handled responsively via Tailwind classes
  return (
    <div className=" absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
      <Lottie
        loop={true}
        autoplay={true}
        animationData={chatsLoader}
        className="h-[400px] w-[500px] max-[650px]:h-[300px] max-[650px]:w-[300px]"
      />
    </div>
  );
}

export default Loader;
