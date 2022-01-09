import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: any;

  constructor(private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.getAllProduct()
      .subscribe(data => {
        this.products = data;
      });
  }

  getProductByCategory(categoryName: string) {
    this.productsService.getAllProductByCategory(categoryName)
      .subscribe(data => {
        this.products = data;
      });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}


