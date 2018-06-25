import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {Order} from '../models/order';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;

  shipping = {};
  userId: string;
  userSubscrption: Subscription;
  constructor(private router: Router, private authServcie: AuthService, private orderService: OrderService ) { }

  ngOnInit() {
    this.userSubscrption = this.authServcie.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscrption.unsubscribe();
  }
  /*
 * $key used when read node from firebase
 * key used when u store a node in firebase*/
}
