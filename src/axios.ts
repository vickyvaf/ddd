import Axios from "axios";
import { IS_SERVER } from "swr/_internal";

type ReturnGetShownMessage = {
  message: string;
  description?: string;
};

export const axios = Axios.create({
  // if axios is called client side add /api to make Next's rewrites work
  // if axios is called server side then call API directly
  ...(IS_SERVER ? { baseURL: process.env.API_SOURCE } : { baseURL: "/api" }),
  timeout: Number(process.env.TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});
