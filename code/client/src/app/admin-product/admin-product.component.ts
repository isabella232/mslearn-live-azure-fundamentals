import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataClient } from '../services/data-client';
import { FormattingHelpers } from '../services/FormattingHelpers';
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from '../models/Product';

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
  isCreateNewMode: boolean;

  constructor(dataClient: DataClient, formatter: FormattingHelpers, route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {

    this.formatter = formatter;
    this.data = dataClient;
    this.id = route.snapshot.paramMap.get("productId");

    this.isCreateNewMode = this.id == "$new";

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stockUnits: ['', Validators.required],
      thumbnailImage: ['', Validators.required]
    });

    this.hasLoaded = true;
  }

  async ngOnInit() {
    if (this.isCreateNewMode) {
      this.data.LoadedProduct = new Product();
      this.data.LoadedProduct.thumbnailImage = "p001.png";
    }
    else {
      await this.data.GetProduct(this.id);
    }

    this.productForm.controls["name"].setValue(this.data.LoadedProduct.name);
    this.productForm.controls["description"].setValue(this.data.LoadedProduct.description);
    this.productForm.controls["category"].setValue(this.data.LoadedProduct.category);
    this.productForm.controls["price"].setValue(this.data.LoadedProduct.price);
    this.productForm.controls["stockUnits"].setValue(this.data.LoadedProduct.stockUnits);
    this.productForm.controls["thumbnailImage"].setValue(this.data.LoadedProduct.thumbnailImage);
  }

  async onSubmit() {
    console.warn(this.productForm.value);
    
    const product = new Product();

    product.id = this.isCreateNewMode ? null : this.id;
    product.name = this.productForm.controls["name"].value;
    product.description = this.productForm.controls["description"].value;
    product.category = this.productForm.controls["category"].value;
    product.price = this.productForm.controls["price"].value;
    product.stockUnits = this.productForm.controls["stockUnits"].value;

    product.itemType = this.isCreateNewMode ? "product" : this.data.LoadedProduct.itemType;
    product.thumbnailImage = this.productForm.controls["thumbnailImage"].value;

    await this.data.UpsertProduct(product);

    this.router.navigate(['/admin/products']);
  }
}
