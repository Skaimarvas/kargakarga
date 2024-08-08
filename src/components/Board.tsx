"use client";

import { useGetBoards } from "@/api/controller/boardController";
import Column from "@/components/Column";
import { mockBoard } from "@/mock/mockData";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Image from "next/image";
import { useEffect, useState } from "react";

const Board = () => {
  const [kanbanData, setKanbanData] = useState<any>();
  const [activeTaskColumn, setActiveTaskColumn] = useState<number | null>(null);

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "COLUMN") {
      const newColumnsOrder = Array.from(kanbanData.columnsOrder);
      const [removed] = newColumnsOrder.splice(source.index, 1);
      newColumnsOrder.splice(destination.index, 0, removed);

      setKanbanData((prevData: any) => ({
        ...prevData,
        columnsOrder: newColumnsOrder,
      }));
    } else {
      const sourceCol = kanbanData.columns[source.droppableId];
      const destinationCol = kanbanData.columns[destination.droppableId];
      const sourceItems = Array.from(sourceCol.itemsOrder);
      const [removedItem] = sourceItems.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceItems.splice(destination.index, 0, removedItem);
        setKanbanData((prevData: any) => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceCol.id]: {
              ...sourceCol,
              itemsOrder: sourceItems,
            },
          },
        }));
      } else {
        const destinationItems = Array.from(destinationCol.itemsOrder);
        destinationItems.splice(destination.index, 0, removedItem);

        setKanbanData((prevData: any) => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceCol.id]: {
              ...sourceCol,
              itemsOrder: sourceItems,
            },
            [destinationCol.id]: {
              ...destinationCol,
              itemsOrder: destinationItems,
            },
          },
        }));
      }
    }
  };

  const { data, isFetching, isFetched, refetch } = useGetBoards();

  const handleNewTask = (columnId: number | null) => {
    if (activeTaskColumn === columnId) {
      setActiveTaskColumn(null);
    } else {
      setActiveTaskColumn(columnId);
    }
  };

  useEffect(() => {
    if (data && data.status) {
      const columnsOrder = data.data.map(
        (column: any) => `column-${column.id}`
      );

      const columns = data?.data?.reduce((acc: any, column: any) => {
        acc[`column-${column.id}`] = {
          id: `column-${column.id}`,
          title: column.name,
          itemsOrder: column.tasks
            .map((task: any) => `item-${task.id}`)
            .sort((a: number, b: number) => a - b),
        };
        return acc;
      }, {});

      const items = data.data
        .flatMap((column: any) => column.tasks)
        .reduce((acc: any, task: any) => {
          acc[`item-${task.id}`] = task;
          return acc;
        }, {});

      setKanbanData({
        columnsOrder,
        columns,
        items,
      });
    }
  }, [data]);

  if (!kanbanData && isFetching) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <span>Yükleniyor</span>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full overflow-hidden">
      {
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div
                className="flex h-full gap-1  w-fit overflow-x-auto overflow-y-hidden"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {kanbanData?.columnsOrder.map((colId: any, index: number) => {
                  const column = kanbanData.columns[colId];
                  return (
                    <Draggable draggableId={colId} key={colId} index={index}>
                      {(provided) => (
                        <div
                          className="flex flex-col bg-white border border-gray-300 h-full gap-1 min-w-[335px] max-w-[335px] rounded-lg shadow-sm"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between px-3 py-4 shadow-md w-full"
                          >
                            <div className="flex items-center gap-2">
                              <h3 className="text-normal text-blue-500">
                                {column?.title}
                              </h3>
                              {column?.itemsOrder.length > 0 && (
                                <div className="flex items-center justify-center bg-blue-100 rounded-full  px-2 border-2 border-blue-200">
                                  <span className="text-blue-700">
                                    {column.itemsOrder.length}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Image
                                width={20}
                                height={20}
                                src={`/plus.png`}
                                alt="plus"
                              />
                              <Image
                                width={20}
                                height={20}
                                src={`/more-circle.png`}
                                alt="circle"
                              />
                            </div>
                          </div>
                          <Column
                            id={colId}
                            itemsOrder={column?.itemsOrder}
                            ITEMS={kanbanData.items}
                            activeTaskColumn={activeTaskColumn}
                            handleNewTask={handleNewTask}
                            onTaskCreated={refetch}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      }
    </div>
  );
};

export default Board;
