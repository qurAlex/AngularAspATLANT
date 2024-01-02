import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './component/details/details.component';
import { StorekeepersComponent } from './component/storekeepers/storekeepers.component';

export const routes: Routes = [
  { path: 'details', component: DetailsComponent },
  { path: 'storekeepers', component: StorekeepersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
