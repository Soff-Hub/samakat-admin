import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div className="w-full flex justify-center  my-auto mt-[18%]">
      <FadeLoader   color="#3B82F6" size={80} />
    </div>
  );
}

export default Loader;
