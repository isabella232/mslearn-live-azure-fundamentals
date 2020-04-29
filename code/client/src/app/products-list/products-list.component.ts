import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { DataClient } from '../services/data-client';
import { ShoppingCart } from '../models/ShoppingCart';
import { FormattingHelpers } from '../services/FormattingHelpers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public items: Product[];
  public store: DataClient;
  public cart: ShoppingCart;
  public formatter: FormattingHelpers;
  public loaded: boolean = false;

  constructor(dataClient: DataClient, globalCart: ShoppingCart, formatter: FormattingHelpers) { 
    this.store = dataClient;
    this.cart = globalCart;    
    this.formatter = formatter;
    this.loadItems();
  }

  loadItems()
  {
    this.store.LoadProducts();
    this.items = this.store.allProducts;
    this.loaded = true;
  }

  ngOnInit(): void {
  }
  
  public addToCart(product: Product)
  {
    this.cart.AddItemToCart(product, 1);
  }
}
