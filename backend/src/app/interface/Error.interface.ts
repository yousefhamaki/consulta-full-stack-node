import InsertType from "../types/general.type";

interface Error {
  name?: string;
  status?: number;
  message?: string;
  stack?: string;
}

export interface ErrorReturn {
  status: number;
  message: string;
  data: InsertType;
}

export default Error;
