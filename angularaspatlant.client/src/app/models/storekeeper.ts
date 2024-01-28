import { IDetail } from "./detail";

export interface IStorekeeper {
  id: number;
  fullName: string;
  details: IDetail[];
}
