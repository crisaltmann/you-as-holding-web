import { request } from "../utils/request";

type Login = {
  email: string;
  password: string;
};

type LoginResponse = {
  id_usuario: number;
  token: string;
};

export const login = (login: Login) =>
  request.post("login", { json: login }).json<LoginResponse>();
