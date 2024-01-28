import { IStorekeeper } from "./storekeeper";

export interface IDetail {
  id: number;
  itemCode: string;
  itemName: string;
  count: number;
  storekeeperId: number;
  dateCreate: string;
  dateDelete?: string;
  storekeeper: IStorekeeper;
}
