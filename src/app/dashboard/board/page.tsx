import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col  items-center w-full bg-[#E4ECF9] py-10 px-8  ">
      <div className="flex justify-between w-full">
        {" "}
        <span>Board Name</span>
        <span>Filter</span>{" "}
      </div>
      <div>Board List</div>
      <div>Board</div>
    </div>
  );
};

export default Page;
