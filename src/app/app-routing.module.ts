import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ModelComponent } from './model/model.component';
import { ViewinventoryComponent } from './viewinventory/viewinventory.component';

const routes: Routes = [
  {path: '', redirectTo: 'viewinventory', pathMatch: 'full'},
  {path: 'manufacturer', component: ManufacturerComponent},
  {path: 'model', component: ModelComponent},
  {path: 'viewinventory', component: ViewinventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
