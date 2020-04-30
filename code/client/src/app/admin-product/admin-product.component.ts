import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  data: DataClient;
  formatter: FormattingHelpers;
  id: string;
  hasLoaded: boolean;
  productForm: FormGroup;
  
  constructor(dataClient: DataClient, formatter: FormattingHelpers, route: ActivatedRoute, private formBuilder: FormBuilder) { 
    
    this.formatter = formatter;
    this.data = dataClient;
    this.id = route.snapshot.paramMap.get("productId");
    
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stockUnits: ['', Validators.required]
    });
    
    this.hasLoaded = true;
  }

  async ngOnInit() {
    await this.data.GetProduct(this.id);
    
    this.productForm.controls["id"].setValue(this.data.LoadedProduct.id);
    this.productForm.controls["name"].setValue(this.data.LoadedProduct.name);
    this.productForm.controls["description"].setValue(this.data.LoadedProduct.description);
    this.productForm.controls["category"].setValue(this.data.LoadedProduct.category);
    this.productForm.controls["price"].setValue(this.data.LoadedProduct.price);
    this.productForm.controls["stockUnits"].setValue(this.data.LoadedProduct.stockUnits);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
  }
}
