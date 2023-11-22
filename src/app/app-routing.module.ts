import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductitemComponent } from './productitem/productitem.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'product/:id',component:ProductitemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
