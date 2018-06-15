import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs/Subscription';
import { Product } from './../../models/product';
import {DataTableResource} from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.products = products;
        this.initilzeTable(products);
      });
  }

  private initilzeTable(products: Product[]) {
    /* to serve data for data table*/
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset : 0 }).then(
      items => this.items = items
    );
    this.tableResource.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
/*code to filter total data*/
  filter(query: string) {
    console.log(query);
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    /* after adding data table, filtering is updated*/
    this.initilzeTable(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params).then(
      items => this.items = items
    );
  }
}
