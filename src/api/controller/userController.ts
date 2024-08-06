import { loginType } from "@/interfaces/user";
import http from "../apiProvider";

export const loginRequest = (loginData: loginType) =>
  http.post(`/auth/login`, loginData);
