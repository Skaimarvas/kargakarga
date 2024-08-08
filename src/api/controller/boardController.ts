import { useQuery } from "@tanstack/react-query";
import http from "../apiProvider";
import { postTaskType } from "@/interfaces/board";

export const useGetBoards = () =>
  useQuery({
    queryKey: ["getBoard"],
    queryFn: () => getBoards(),
  });

export const getBoards = () => http.get(`/boards`).then((res: any) => res.data);

export const useGetFlags = () =>
  useQuery({
    queryKey: ["getFlags"],
    queryFn: () => getFlags(),
  });

export const getFlags = () =>
  http.get(`/commons/flags`).then((res: any) => res.data.data);

export const postTask = (taskForm: postTaskType) =>
  http.post(`/tasks`, taskForm);

export const deleteTask = (code: number) => http.delete(`/tasks/${code}`);
