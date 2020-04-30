import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data: DataClient;
  formatter: FormattingHelpers;
  id: string;
  hasLoaded: boolean;
  
  constructor(dataClient: DataClient, formatter: FormattingHelpers, route: ActivatedRoute) { 
    this.data = dataClient;
    this.formatter = formatter;
    this.id = route.snapshot.paramMap.get("productId");
    this.data.GetProduct(this.id);
    this.hasLoaded = true;
  }
  
  ngOnInit(): void {
    
  }

  addToCart(product: Product)
  {
  }
}
