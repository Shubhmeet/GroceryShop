import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  constructor(private shoppinngCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppinngCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppinngCartService.removeFromCart(this.product);
  }

}
