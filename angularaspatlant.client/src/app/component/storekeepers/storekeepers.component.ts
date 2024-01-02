import { HttpClient } from '@angular/common/http';
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
  public details: IDetail[] = [];
  loading = true;
  completeLoad = true;
  storekeeper_id = undefined;
  storekeeper_fullname = "";

  constructor(private storeService: StoreService,) { }

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

  trackStorekeepers(index: number, storekeeper: IStorekeeper) {
    return storekeeper.id;
  }

  postStorekeeper() {
    if (this.storekeeper_fullname!="")
    this.storeService.postStorekeeper(this.storekeeper_fullname);
    this.storekeeper_fullname = "";
  }

  getCount(id: number):number {
    let sum = 0;
    this.details
      .filter(n => n.storeKeeper_id == id)
      .filter(n => Date.parse(n.date_Delete).toFixed() < Date.now.toString())
      .forEach(n => sum += n.count)
    return sum;
  }

  deleteStorekeeper() {
    if (this.storekeeper_id != undefined && this.getCount(this.storekeeper_id) == 0)
      this.storeService.deleteStorekeeper(this.storekeeper_id);
    this.storekeeper_id = undefined;
  }

  title = 'angularaspatlant.client.storekeepers';
}
