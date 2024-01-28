import { HttpClient, HttpClientJsonpModule, HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStorekeeper } from '../../models/storekeeper';
import { IDetail } from '../../models/detail';
import { StoreService } from '../../services/store.service';




@Component({
  selector: 'app-storekeepers',
  templateUrl: './storekeepers.component.html',
  styleUrl: './storekeepers.component.css'
})
export class StorekeepersComponent implements OnInit {
  public storekeepers: IStorekeeper[] = [];
  loading = true;
  completeLoad = true;
  storekeeper_id = undefined;
  storekeeper: IStorekeeper = { id: 0, fullName: "", details: [] }
  messageText="";
  messageStyle = "";

  constructor(private storeService: StoreService) { }

  ngOnInit() {

     this.getStorekeepers();
  }
  
  

  getStorekeepers() {
    this.storeService.getStrorekeepers().subscribe(
      (result) => {
        this.storekeepers = result;
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

  trackStorekeepers(index: number, storekeeper: IStorekeeper) {
    return storekeeper.id;
  }

  postStorekeeper() {
    this.storeService.postStorekeeper(this.storekeeper)
      .subscribe((response) => { this.succesfullMessage(); }, error => { this.errorMessage(); });
    this.storekeeper.fullName = "";
  }

  getCount(id: number):number {
    let sum = 0;
    this.storekeepers.find(s => s.id == id)?.details
      .filter(n => Date.parse(n.dateDelete!).toFixed() < Date.now.toString())
      .forEach(n => sum += n.count)
    return sum;
  }

  deleteStorekeeper() {
    if (this.storekeeper_id != undefined)
      this.storeService.deleteStorekeeper(this.storekeeper_id)
        .subscribe((response) => { this.succesfullMessage(); }, error => { this.errorMessage(); });
    else this.errorMessage();
    this.storekeeper_id = undefined;
  }

  errorMessage() { console.log("eroor!!! error!!! error!!!"); this.messageText = "Oops, some error"; this.messageStyle = "color:red"; }

  succesfullMessage() { console.log("good job"); this.getStorekeepers(); this.messageText = "Succesfully!"; this.messageStyle = "color:lightgreen"; }

  title = 'angularaspatlant.client.storekeepers';
}
