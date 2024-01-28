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
  detail: IDetail = {
    id: 0,
    itemCode: "",
    itemName: "",
    count: 0,
    storekeeperId: 0,
    dateCreate: "",
    dateDelete: undefined,
    storekeeper: { id: 0, fullName: "", details:[] }
  }
  loading = true;
  completeLoad = false;
  messageText = "";
  messageStyle = "";

  constructor(private storeService: StoreService) { }
  
  ngOnInit() {
    this.getDetails();
    this.getStorekeepers();
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
      },
      (error) => {
        console.error(error);
      }
    );
  }


  trackDetails(index: number, detail: IDetail) {
    return detail.id;
  }
  
  postDetail() {
    this.storeService.postDetail(this.detail)
      .subscribe((response) => {  this.succesfullMessage(); }, error => { this.errorMessage(); console.log(error) });
    this.detail = {
      id: 0,
      itemCode: "",
      itemName: "",
      count: 0,
      storekeeperId: 0,
      dateCreate: "",
      dateDelete: undefined,
      storekeeper: { id: 0, fullName: "", details: [] }
    }
  }

  deleteDetail() {
    if (this.detail_id != undefined)
      this.storeService.deleteDetail(this.detail_id)
        .subscribe((response) => { this.succesfullMessage(); }, error => { this.errorMessage(); });
    else this.errorMessage();
    this.detail_id = undefined;
  }

  errorMessage() { console.log("eroor!!! error!!! error!!!"); this.messageText = "Oops, some error"; this.messageStyle = "color:red"; }

  succesfullMessage() { console.log("good job"); this.getDetails(); this.messageText = "Succesfully!"; this.messageStyle = "color:lightgreen"; }

  
  title = 'angularaspatlant.client.details';
}
