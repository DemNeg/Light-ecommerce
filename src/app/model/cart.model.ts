import {ItemProduct} from "./item.product";
import {Client} from "./Client.model";

export class Cart{
  constructor(name:string) {
    this.name = name;
  }
  public name:string;
  public items:Map<number,ItemProduct> = new Map<number, ItemProduct>();
  public client?:Client;
}
