import Image from "next/image";

const Header = () => {
  return (
    <nav className="flex justify-between items-center shadow-sm h-16 px-4 ">
      <div>
        <span className="text-[#145389] text-[20px] font-fortuna font-bold">
          kargakarga
        </span>
      </div>
      <div className="flex">
        <Image
          className="text-[#FFFFFF] "
          width={25}
          height={25}
          src={"/bell.svg"}
          alt="."
        />
        <Image width={50} height={50} src={"/25.png"} alt="." />
      </div>
    </nav>
  );
};

export default Header;
