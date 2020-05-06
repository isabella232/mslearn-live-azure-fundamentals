import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public items: Product[];
  public data: DataClient;
  public formatter: FormattingHelpers;
  public loaded: boolean = false;

  constructor(dataClient: DataClient, formatter: FormattingHelpers) { 
    this.data = dataClient;
    this.formatter = formatter;
  }

  async ngOnInit() {
    await this.data.LoadProducts();
    this.items = this.data.allProducts;
    this.loaded = true;
  }
}