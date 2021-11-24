import {Component, OnInit} from '@angular/core';
import {CatalogServiceService} from "./services/catalog-service.service";
import {Router} from "@angular/router";
import {AuthenticationServiceService} from "./services/authentication-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'light-ecommFront';
  public categories: any;
  public currentCat: any
  constructor(private catalogueService:CatalogServiceService,
              private router:Router,
              private authenticationService:AuthenticationServiceService) {
  }

  ngOnInit(): void {
    this.authenticationService.loadUserauthenticatedFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catalogueService.getRessource("/categories")
      .subscribe(data=>{
        this.categories = data;
      },error => {
        console.log(error)
      })
  }

  getProductByCat(c: any) {
    this.currentCat = c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo() {
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo() {
    this.currentCat = undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogout() {
    //on vide le local storage
    this.authenticationService.remoteFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
