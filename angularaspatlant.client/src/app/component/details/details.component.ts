import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IDetail } from '../../models/detail';
import { IStorekeeper } from '../../models/storekeeper';
import { StoreService } from "../../services/store.service";




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  public details: IDetail[] = [];
  public storekeepers: IStorekeeper[] = [];
  public detail_id: number | undefined;
  loading = true;
  completeLoad = false;
  detail: IDetail = {
      id: 0,
      item_code: '',
      item_name: '',
      count: 0,
      storeKeeper_id: 0,
      date_Create: '',
      date_Delete: ''
  };
; 

  constructor(private storeService: StoreService, ) {}
  
  ngOnInit() {
    setInterval(() => this.getStorekeepers(), 1000);
    setInterval(() => this.getDetails(), 1000);
  }

  getDetails() {
    this.storeService.getDetails().subscribe(
      (result) => {
        this.details = result;
        this.completeLoad = true;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.completeLoad = false;
        this.loading = false;
      }
    );
  }
  
  getStorekeepers() {
    this.storeService.getStrorekeepers().subscribe(
      (result) => {
        this.storekeepers = result;
        this.completeLoad = true;
      },
      (error) => {
        console.error(error);
        this.completeLoad = false;
      }
    );
  }

  getStorekeeperName(id: number): string {
    let name = this.storekeepers.find(n => n.id == id)?.full_name
    if (name) return name;
    return "";
  }

  getDate(date: string): string{
    if (date != undefined)
      return date.split('T')[0];
    return "";
  }

  trackDetails(index: number, detail: IDetail) {
    return detail.id;
  }

  trackStorekeepers(index: number, storekeeper: IStorekeeper) {
    return storekeeper.id;
  }

  postDetail() {

    if (this.detail.item_code != "" && this.detail.item_name != "" && this.detail.date_Create != "" && this.detail.storeKeeper_id!=0)
    this.storeService.postDetail(this.detail);
    this.detail = {
      id: 0,
      item_code: '',
      item_name: '',
      count: 0,
      storeKeeper_id: 0,
      date_Create: '',
      date_Delete: ''
    };
  }

  deleteDetail() {
    console.log(this.detail_id);
    if (this.detail_id) {
      this.storeService.deleteDetail(this.detail_id);
    }
    this.detail_id = undefined;
  }

  title = 'angularaspatlant.client.details';
}
