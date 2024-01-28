import { HttpClient,HttpHeaders } from "@angular/common/http";
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
    return this.http.post("api/store/detail/", detail, { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postStorekeeper(storekeeper: IStorekeeper) {
    return this.http.post("api/store/storekeeper/", storekeeper, { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) } );

  }

  deleteStorekeeper(id: number) {
    return this.http.delete("api/store/storekeeper/" + id, { observe: 'response' });
    
  }

  deleteDetail(id: number) {
    return this.http.delete("api/store/detail/" + id, { observe: 'response' });
  }
  

}
