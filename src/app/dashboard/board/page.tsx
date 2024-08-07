import Board from "@/components/Board";
import NavigationTabs from "@/components/NavigationTabs";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-full bg-[#E4ECF9] py-10 px-8  ">
      <div className="flex justify-between w-full">
        {" "}
        <h3 className="text-[#145389] font-semibold text-[22px] ">
          Frontend Case
        </h3>
        <Image width={30} height={30} src={`/filter.svg`} alt="filter" />
      </div>
      <div className="flex w-full">
        <NavigationTabs />
      </div>
      <Board />
    </div>
  );
};

export default Page;
