"use client";
import Board from "@/components/Board";
import NavigationTabs from "@/components/NavigationTabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BoardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span>Yükleniyor</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center w-full bg-[#E4ECF9] h-full py-5 px-8  ">
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

export default BoardPage;
