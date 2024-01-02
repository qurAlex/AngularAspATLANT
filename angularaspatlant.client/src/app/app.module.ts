import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './component/details/details.component';
import { StorekeepersComponent } from './component/storekeepers/storekeepers.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    StorekeepersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, RouterOutlet,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
