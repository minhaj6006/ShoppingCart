import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  url: string = `${baseUrl}`;
  cartItemList: Product[] = [];
  productList = new BehaviorSubject<Product[]>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: Product) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((price: Product) => {
      grandTotal -= price.pPrice;
      console.log(grandTotal);
    });
    return grandTotal;
  }

  removeCartItem(item: Product) {
    this.cartItemList.map((cartItemId: Product, index: number) => {
      if (item.pId === cartItemId.pId) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
