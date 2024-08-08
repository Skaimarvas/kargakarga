"use client";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "./ui/button";
import Image from "next/image";
import TaskForm from "./TaskForm";
import { useGetFlags } from "@/api/controller/boardController";
import TaskDetail from "./TaskDetail";

interface Iprops {
  itemsOrder: any;
  id: any;
  ITEMS: any;
  onTaskCreated: () => void;
  activeTaskColumn: number | null;
  handleNewTask: (columnId: number | null) => void;
}

const Column: React.FC<Iprops> = ({
  itemsOrder,
  id,
  ITEMS,
  activeTaskColumn,
  handleNewTask,
  onTaskCreated,
}) => {
  const isFormOpen = activeTaskColumn === id;
  const [isHovered, setIsHovered] = useState(false);
  const [flags, setFlags] = useState();
  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskDetail = (task: any) => {
    setSelectedTask(task);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  const { data, isFetching, isFetched } = useGetFlags();

  useEffect(() => {
    setFlags(data);
  }, [data, isFetched]);

  return (
    <>
      <Droppable droppableId={id}>
        {(provided: any) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="flex flex-col p-1 h-full gap-2 relative overflow-y-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isFormOpen && (
              <TaskForm
                columnId={id}
                handleNewTask={handleNewTask}
                onTaskCreated={onTaskCreated}
                boardId={Number(id.substring(7))}
              />
            )}
            {(ITEMS &&
              itemsOrder?.length > 0 &&
              itemsOrder.map((item_id: any, index: any) => {
                const item = ITEMS[item_id];
                const bgcolor = item.color;

                return (
                  <Draggable
                    draggableId={`${item_id}`}
                    index={index}
                    key={item.id}
                  >
                    {(provided) => (
                      <div
                        className={`flex flex-col gap-2 border border-gray-300 bg-white rounded-md p-3`}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        onClick={() => openTaskDetail(item)}
                      >
                        <h4 className={`font-bold`}>{item.name}</h4>
                        <div className="flex justify-between items-start ">
                          <p className="text-sm font-bold text-left">
                            {item.description}
                          </p>

                          <Image
                            width={50}
                            height={50}
                            src={`/avatar.svg`}
                            alt="avatar"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Image
                            width={10}
                            height={10}
                            src={`/calendar.png`}
                            alt="calendar"
                          />
                          <span className="text-xs text-gray-500 font-light">
                            {item?.startDate?.substring(0, 10)}
                            {` - `}
                            {item?.endDate?.substring(0, 10)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border border-white w-fit">
                          <Image
                            width={10}
                            height={10}
                            src={`/rectangle.png`}
                            alt="rectangle"
                          />
                          <span className="text-xs text-gray-500">
                            Milestone
                          </span>
                          <Image
                            className={`${bgcolor}`}
                            width={10}
                            height={10}
                            src={`/flag.svg`}
                            alt="flag"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })) || (
              <div className="flex justify-center items-center h-full">
                <Image
                  width={200}
                  height={200}
                  src={`/kargalayer.png`}
                  alt="karga"
                />
                .
              </div>
            )}
            {isHovered && !isFormOpen && (
              <div
                className={`flex justify-center items-center transition-opacity duration-200 ease-in-out px-2 z-10 ${
                  itemsOrder.length === 0
                    ? "absolute top-3 right-2 min-w-[319px] max-w-[319px]"
                    : ""
                }  `}
              >
                <Button
                  className="w-full bg-[#145389] transition-all duration-200 ease-in-out hover:bg-[#2e6697]"
                  onClick={() => handleNewTask(id)}
                >
                  + New Task
                </Button>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskDetail
        isOpen={!!selectedTask}
        onClose={closeTaskDetail}
        task={selectedTask}
        onTaskDeleted={onTaskCreated}
      />
    </>
  );
};

export default Column;
