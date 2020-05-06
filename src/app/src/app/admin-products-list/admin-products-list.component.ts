import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';

@Component({
  selector: 'admin-app-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {

  public items: Product[];
  public dataClient: DataClient;
  public formatter: FormattingHelpers;
  public loaded: boolean = false;

  constructor(dataClient: DataClient, formatter: FormattingHelpers) { 
    this.dataClient = dataClient;
    this.formatter = formatter;
  }

  async ngOnInit() {
    await this.dataClient.LoadProducts();
    this.items = this.dataClient.allProducts;
    this.loaded = true;
  } 
  
}
