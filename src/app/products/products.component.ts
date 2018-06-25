import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {Subscription} from 'rxjs/Subscription';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /*products cannot be observable*/
  products: Product[] = [];
  filteredProducts: Product[] = [];
  /* represent current selected category*/
  category: string;
  cart$: Observable<ShoppingCart>;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {
    this.populateProducts();
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  private populateProducts() {

    this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();

      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}


