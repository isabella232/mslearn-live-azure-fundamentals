import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCart } from '../models/ShoppingCart';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data: DataClient;
  cart: ShoppingCart;
  formatter: FormattingHelpers;
  id: string = "cap";
  hasLoaded: boolean;
  
  constructor(dataClient: DataClient, globalCart: ShoppingCart, formatter: FormattingHelpers) { 
    this.data = dataClient;
    this.cart = globalCart;    
    this.formatter = formatter;
    
    this.id = "cap";
    this.loadItems();
  }

  loadItems()
  {
    this.data.GetProduct(this.id);
    this.hasLoaded = true;
  }

  ngOnInit(): void {
    
  }

  addToCart(product: Product)
  {
    this.cart.AddItemToCart(product, 1);
  }
}
