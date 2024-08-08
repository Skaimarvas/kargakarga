import Image from "next/image";
import React from "react";
import ActivityCard from "./ActivityCard";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { deleteTask } from "@/api/controller/boardController";

interface Iprop {
  isOpen: boolean;
  onClose: () => void;
  onTaskDeleted: () => void;
  task: any;
}

const TaskDetail: React.FC<Iprop> = ({
  isOpen,
  onClose,
  task,
  onTaskDeleted,
}) => {
  if (!isOpen) return null;

  const deleteRequest = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      onTaskDeleted();
      onClose();
      toast.success("Task was deleted");
    },
  });

  const activities = Array.from({ length: 10 });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative flex flex-col bg-white w-full  h-full max-h-[90%] mx-4 rounded-md shadow-lg z-10">
        <div className="flex justify-between items-center border-b border-gray-300 h-11 py-8 px-2 shadow-sm ">
          <div className="flex gap-10 items-center px-4">
            <div className="flex gap-2">
              <Image width={15} height={15} src={`/up.svg`} alt="up" />
              <Image width={15} height={15} src={`/down.svg`} alt="down" />
            </div>
            <div className="flex gap-5">
              <Image width={20} height={20} src={`/home.svg`} alt="home" />
              <Image width={5} height={5} src={`/right.svg`} alt="right" />
              <span>25 Proje</span>
              <Image width={5} height={5} src={`/right.svg`} alt="right" />
              <span>Projects</span>
              <Image width={5} height={5} src={`/right.svg`} alt="right" />
              <span>Frontend Case</span>
              <Image width={20} height={20} src={`/move.svg`} alt="right" />
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <Image width={20} height={20} src={`/moredot.svg`} alt="more" />
            <Image
              width={20}
              height={20}
              src={`/newWindow.svg`}
              alt="newWindow"
            />
            <Image width={20} height={20} src={`/star.svg`} alt="star" />
            <button onClick={onClose}>
              <Image width={20} height={20} src={`/close.svg`} alt="close" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 overflow-auto p-4h-full">
            <div className="p-6 bg-white shadow rounded-lg w-full">
              <div className="flex justify-between items-center ">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center w-80">
                    <input type="radio" className="mr-2" checked readOnly />
                    <h1 className="text-lg font-bold">
                      Bu örnek görevdir. Örnek görevin içeriğine dair açıklama
                      detail'da bulunmaktadır.
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500">ID: #435365</p>
                    <Image
                      width={20}
                      height={20}
                      src={`/copy.svg`}
                      alt="close"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center w-60 border border-gray-300 shadow-sm rounded-sm p-2">
                  <input type="radio" className="mr-2" checked readOnly />
                  <span>05.02.2024 - 20.04.2024</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-10 items-center">
                  <div>
                    <h2 className="font-semibold">Task Status</h2>
                    <p className="text-green-500">Open</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Assignment</h2>
                    <div className="flex items-center">
                      <Image
                        src="/avatar.svg"
                        alt="Profile"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <Image
                        src="/avatar.svg"
                        alt="Profile"
                        width={24}
                        height={24}
                        className="rounded-full -ml-2"
                      />
                      <Image
                        src="/avatar.svg"
                        alt="Profile"
                        width={24}
                        height={24}
                        className="rounded-full -ml-2"
                      />
                      <span className="ml-2">+5</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold">Priority</h2>
                    <Image
                      src="/flag.png"
                      alt="flag"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <Button
                  className="bg-[#145389] transition-all duration-200 ease-in-out hover:bg-[#2e6697]"
                  onClick={() => deleteRequest.mutate(task?.code)}
                >
                  Delete
                </Button>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold">Description</h2>
                <p className="text-gray-500">{task.description}</p>
              </div>
              <div className="border border-gray-300 py-2 bg-gray-100 rounded-sm mt-4 ">
                <div className="flex justify-evenly items-center ">
                  <button className="flex items-center gap-2 border-b-2 border-blue-500 pb-1">
                    <Image
                      src="/attachment.svg"
                      alt="attachment"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Attachment
                  </button>
                  <button className="flex items-center gap-2 border-b-2 border-blue-500 pb-1">
                    <Image
                      src="/attachment.svg"
                      alt="attachment"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Sub Task
                  </button>
                  <button className="flex items-center gap-2 border-b-2 border-blue-500 pb-1">
                    <Image
                      src="/attachment.svg"
                      alt="attachment"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    Comment
                  </button>
                </div>
                <div className="mt-2 p-4 bg-white  rounded-lg">
                  <div className="flex justify-between bg-white items-center">
                    <div className="flex flex-col ">
                      <div className="flex items-center">
                        <input type="radio" className="mr-2" checked readOnly />
                        <p className="font-semibold">Task Content #2334453</p>
                      </div>

                      <p className="text-gray-500">
                        05.01.2024 - 12.03.2024{" "}
                        <span className="ml-2">Milestone Name</span>
                      </p>
                    </div>
                    <Image
                      src="/avatar.svg"
                      alt="Profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-96 bg-[#F3F6FD] border border-1 h-full overflow-y-auto">
            <div className="flex bg-white justify-between shadow-md px-2 py-4 sticky top-0">
              <h4 className="text-[#145389] font-bold">Activity</h4>
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  src={`/search.svg`}
                  alt="search"
                />
                <Image
                  width={20}
                  height={20}
                  src={`/filter2.svg`}
                  alt="filter2"
                />
              </div>
            </div>
            {activities.map((_, index) => (
              <ActivityCard key={index} />
            ))}
          </div>
          <div className="flex flex-col items-center w-20 gap-5 h-full">
            <div className="flex flex-col w-full border border-b shadow-sm py-3 gap-2">
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">Activity</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">Condition</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">Meeting</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">QA</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">Docs</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  width={25}
                  height={25}
                  src={`/message.svg`}
                  alt="message"
                />
                <span className="text-xs">QA</span>
              </div>
            </div>

            <Image width={20} height={20} src={`/plus.svg`} alt="plus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
