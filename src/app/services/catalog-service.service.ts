import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/Product.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  constructor(private httpClient : HttpClient) { }
  public host = environment.host;

  public getRessource(url:any)
  {
    return this.httpClient.get(this.host+url);
  }
  public getProduct(url:string):Observable<Product>
  {
    return this.httpClient.get<Product>(  url);
  }


  uploadPhotoProduct(file:File,idProduct:number):Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file',file);
    const req = new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formdata,{
      reportProgress: true,
      responseType: 'text',
    });
    return this.httpClient.request(req);
  }

}
