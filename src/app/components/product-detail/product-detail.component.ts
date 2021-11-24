import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogServiceService} from "../../services/catalog-service.service";
import {Product} from "../../model/Product.model";
import {AuthenticationServiceService} from "../../services/authentication-service.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

 public currentProduct!: Product;
  public mode: number=0;
  private timeStamp: number=0;
  public editPhoto: boolean=false;
  progress!: number;
  private selectedFiles:any;
  private currentFileUpload: any;
  constructor(private router:Router, private activatedRoute:ActivatedRoute,
              public catalogService:CatalogServiceService,
              public authService:AuthenticationServiceService) { }

  ngOnInit(): void {
    let url = atob(this.activatedRoute.snapshot.params.url)
    this.catalogService.getProduct(url).subscribe(data=>{
      this.currentProduct = data;
    })
  }

  onEditProduct() {
      this.mode =1;
  }

  getTS() {
    return this.timeStamp;
  }

  onEditPhoto(p: Product) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
      .subscribe(event =>{
        if(event.type === HttpEventType.UploadProgress){
          // @ts-ignore
          this.progress = Math.round(100*event.loaded / event.total);
        }else  if(event instanceof HttpResponse){
          alert("Fin de telechargement ...");
          this.timeStamp = Date.now();
          this.editPhoto = false;
          //this.getProducts("/products/search/selectedProducts");
        }
      },err=>{
        alert("Problème de chargement");
      })
  }

  onAddProductToCart(currentProduct: Product) {

  }

  onUpdateProduct(dataForm: any) {
     /* let url = this.currentProduct._links.self.href;
      this.catalogService.patchRessource(url,dataForm)
        .subscribe(d=>{
          this.currentProduct = d;
          this.mode = 0;
        },err=>{
          console.log(err);
        })*/
  }

}
