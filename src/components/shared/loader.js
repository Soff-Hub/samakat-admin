import React from "react";
import { ClockLoader } from "react-spinners";

function Loader() {
  return (
    <div className="w-full flex justify-center  my-auto mt-[18%]">
      <ClockLoader color="#3B82F6" size={150} />
    </div>
  );
}

export default Loader;
