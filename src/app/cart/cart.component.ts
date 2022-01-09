import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  products: Product[] = [];
  isLoading: boolean = false;
  grandTotal!: number;
  checkoutForm!: FormGroup;
  fullName!: string;
  email!: string;
  address!: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutServise: CheckoutService) { }

  ngOnInit(): void {
    this.addToCartItem();
    this.initForm();
  }

  addToCartItem() {
    this.cartService.getProducts().subscribe((data) => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  initForm() {
    this.checkoutForm = new FormGroup({
      fullName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", Validators.required)
    })
  }

  removeItem(item: Product) {
    this.cartService.removeCartItem(item);
  }

  checkout() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      this.checkoutServise.checkout(this.checkoutForm.value)
        .subscribe(data => {
          console.log(data);
          this.cartService.removeAllCart();
          this.router.navigate(['']);
        });
    } else {
      console.error("form is empty");
    }
  }
}
