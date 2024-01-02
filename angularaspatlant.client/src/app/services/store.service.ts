import { HttpClient } from "@angular/common/http";
import { IDetail } from "../models/detail";
import { Observable } from "rxjs";
import { IStorekeeper } from "../models/storekeeper";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private http: HttpClient) { }

  getDetails(): Observable<IDetail[]>
  {
    return this.http.get<IDetail[]>("api/store/details");
  }

  getStrorekeepers(): Observable<IStorekeeper[]>
  {
    return this.http.get<IStorekeeper[]>("api/store/storekeepers");
  }

  postDetail(detail: IDetail) {
    console.log(detail);
    this.http.post("api/store/detail", {
      item_code: detail.item_code,
      item_name: detail.item_name,
      count: detail.count,
      storeKeeper_id: detail.storeKeeper_id,
      date_Create: detail.date_Create,
    })
      .subscribe();
  }

  postStorekeeper(name: string)  {
    this.http.post("api/store/storekeeper/", { name: name }).subscribe();

  }

  deleteStorekeeper(id: number) {
    this.http.delete("api/store/storekeeper/" + id).subscribe();
  }

  deleteDetail(id: number) {
    console.log("удаляем " + id)
    this.http.delete("api/store/detail/" + id).subscribe();
  }
  

}
