import {Component, OnInit} from '@angular/core';
import {CatalogServiceService} from "../../services/catalog-service.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationServiceService} from "../../services/authentication-service.service";
import {Product} from "../../model/Product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products : any;
  public editPhoto: boolean=false;
  public currentProduct: any;
  public selectedFiles: any;
  public progress!: number;
  public currentFileUpload: any;
  public title:string="";
  public timeStamp:number=0;
  constructor(public catalogueService : CatalogServiceService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              public authService:AuthenticationServiceService) {}

  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd ){
        let url = val.url;
        //console.log(url);
        let p1 = this.activatedRoute.snapshot.params.p1;
        if(p1 == 1)
        {
          this.title = "SELECTION"
          this.getProducts("/products/search/selectedProducts");
        }
        else if (p1 == 2){
          let idCat = this.activatedRoute.snapshot.params.p2;
          this.title = "PRODUITS DE LA CATEGORIE"+idCat
          this.getProducts("/categories/"+idCat+"/products");

        }
        else if (p1 == 3){
          this.title = "PRODUITS EN PROMOTION"
          this.getProducts("/products/search/promoProducts");
        }
        else if (p1 == 4){
          this.title = "PRODUITS DISPONIBLE "
          this.getProducts("/products/search/dispoProducts");
        }else if (p1 == 5){
          this.getProducts("/products/search/dispoProducts");
        }

      }
    });
    let p1 = this.activatedRoute.snapshot.params.p1;
    if(p1 == 1)
    {
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url:any) {
    this.catalogueService.getRessource(url)
      .subscribe(data=>{
        this.products = data;
      },error => {
        console.log(error)
      })
  }

  onEditPPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event:any) {
      this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
     this.progress = 0;
     this.currentFileUpload = this.selectedFiles.item(0);
     this.catalogueService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
       .subscribe(event =>{
         if(event.type === HttpEventType.UploadProgress){
           // @ts-ignore
           this.progress = Math.round(100*event.loaded / event.total);
         }else  if(event instanceof HttpResponse){
            alert("Fin de telechargement ...");
            this.timeStamp = Date.now();
            //this.getProducts("/products/search/selectedProducts");
         }
       },err=>{
         alert("Problème de chargement");
       })
  }

  getTS() {
    return this.timeStamp;
  }

  onAddProductToCart(p: any) {

  }

  onProductDetail(p: Product) {
    let url =btoa(p._links.product.href)
    this.router.navigateByUrl("product-details/"+url);
  }
}
