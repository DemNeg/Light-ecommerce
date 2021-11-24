import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./components/login/login.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";

const routes: Routes = [
  {path:"products/:p1/:p2",component:ProductsComponent},
  {path:"",redirectTo:'products/1/0',pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"product-details/:url", component:ProductDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
