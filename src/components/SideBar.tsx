"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const SideBar = () => {
  const [isDrawer, setIsDrawer] = useState(false);

  const drawerHandler = () => {
    setIsDrawer(!isDrawer);
  };

  const projectList = [
    {
      projectName: "Proje İsim 1",
      subMenu: [
        {
          name: "Overview",
          count: 10,
        },
        {
          name: "Notifications",
          count: 10,
        },
        {
          name: "Analytics",
          count: 10,
        },
        {
          name: "Reports",
          count: 10,
        },
      ],
    },
    {
      projectName: "Proje İsim 2",
      subMenu: [
        {
          name: "Overview",
          count: 10,
        },
        {
          name: "Notifications",
          count: 10,
        },
        {
          name: "Analytics",
          count: 10,
        },
        {
          name: "Reports",
          count: 10,
        },
      ],
    },
    {
      projectName: "Proje İsim 3",
      subMenu: [
        {
          name: "Overview",
          count: 10,
        },
        {
          name: "Notifications",
          count: 10,
        },
        {
          name: "Analytics",
          count: 10,
        },
        {
          name: "Reports",
          count: 10,
        },
      ],
    },
    {
      projectName: "Proje İsim 4",
      subMenu: [
        {
          name: "Overview",
          count: 10,
        },
        {
          name: "Notifications",
          count: 10,
        },
        {
          name: "Analytics",
          count: 10,
        },
        {
          name: "Reports",
          count: 10,
        },
      ],
    },
  ];

  return (
    <div className="flex h-full relative">
      <div className="flex flex-col justify-end items-center  bg-[#363F72] w-[72px] pb-2 ">
        <Image
          className="border-black border-[1px] rounded-full"
          src={"/avatar.svg"}
          width={50}
          height={50}
          alt="profile image"
        />
      </div>
      <button
        onClick={drawerHandler}
        className={`absolute  hover:bg-[#485497] focus:ring-2 focus:ring-[#6678d9] active:bg-[#252b4e] rounded-sm shadow-lg  h-10 w-10 p-1   left-12 top-6 transition-all duration-200 ease-in-out  ${
          isDrawer
            ? "left-[350px] bg-[#FFFFFF] border-black border-[1px]"
            : "left-12 bg-[#363F72] border-white border-[1px]"
        } flex items-center justify-center`}
        aria-label="Toggle Drawer"
      >
        <Image
          className={`transform transition-transform duration-300 ease-in-out ${
            isDrawer ? "rotate-180" : ""
          }`}
          src={`/chevronRight.svg`}
          width={20}
          height={20}
          alt="chevron"
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isDrawer ? "w-[300px] opacity-100" : "w-0 opacity-0"
        } shadow-md overflow-hidden`}
      >
        {" "}
        <div className="flex flex-col gap-5 justify-between w-[300px] h-full items-center pt-10 px-6 pb-2">
          <div className="flex flex-col gap-3 w-full">
            <div>
              <h4 className="text-left">Projeler</h4>
            </div>
            <div>
              <Accordion type="single" collapsible>
                {projectList.map((project) => (
                  <AccordionItem
                    key={project.projectName}
                    value={project.projectName}
                    className="border-none"
                  >
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full h-3 w-3 bg-red-500"></div>
                        {project.projectName}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-5">
                      {project.subMenu.map((sub) => (
                        <div
                          key={sub.name}
                          className="flex justify-between pl-6"
                        >
                          <span> {sub.name} </span>
                          <div className="rounded-full bg-[#E4ECF9] border border-[#667085] shadow-sm  py-1 px-2 ">
                            <span>{sub.count}</span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <button className="flex items-center gap-2 ">
              <Image width={15} height={15} src={`/graph.svg`} alt="graph" />
              <span>Proje Oluştur</span>
            </button>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <span className="font-bold">Kaim Arvas</span>
              <span className="font-light">skaimarvas@gmail.com</span>
            </div>
            <div className="flex justify-center items-center">
              <Image width={20} height={20} src={`/circle.svg`} alt="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
