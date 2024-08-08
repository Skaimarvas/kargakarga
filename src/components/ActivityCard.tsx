import Image from "next/image";
import React from "react";

const ActivityCard = () => {
  return (
    <div className="flex items-start gap-1 w-full py-2 px-1">
      <div>
        <Image width={100} height={100} src={`/avatar.svg`} alt="avatar" />
      </div>
      <div className="flex flex-col text-sm w-fit">
        <div className="flex justify-start  items-center gap-2">
          <span className="font-bold">Kaim Arvas</span>
          <span className="text-xs font-light">5 Hours Ago</span>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className="min-h-3 min-w-3 rounded-full bg-green-500"></div>
    </div>
  );
};

export default ActivityCard;
