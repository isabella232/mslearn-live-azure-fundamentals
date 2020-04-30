import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })  
export class DataClient {
    private BaseApiLocation: string = "http://localhost:7071/api/";
    //private BaseApiLocation: string = "https://lotsandlotsofbooksapi.azurewebsites.net/api/";

    public allProducts: Product[] = [];
    public isLoading: boolean = true;
    public hasLoaded: boolean = false;

    constructor(private http: HttpClient)
    {
    }    

    public async LoadProducts()
    {
        if (this.hasLoaded)
        {
            return;
        }
        
        this.isLoading = true;

        const result = await this.http.get(this.BaseApiLocation + "products").toPromise();
        if (result != null)
        {
            this.allProducts.length = 0;
            let response = result as ProductsList;
            response.resources.forEach(element => {
                this.allProducts.push(element);
            });
            this.hasLoaded = true;    
        }
        this.isLoading = false;
    }

    public isLoadingProduct: boolean = true;
    public LoadedProduct: Product;

    public async GetProduct(id: string): Promise<any>
    {
        this.isLoadingProduct = true;

        const result = await this.http.get(this.BaseApiLocation + "product/" + id).toPromise();
        if (result != null)
        {
            let response = result as ProductsList;
            this.LoadedProduct = response.resources[0];
        }

        this.isLoadingProduct = false;
    }
}

type postActionOperation = () => void;

// Common Imports
export interface Headers {
    "x-ms-request-charge":           number;
    "x-ms-documentdb-query-metrics": XMSDocumentdbQueryMetrics;
}

export interface XMSDocumentdbQueryMetrics {
}

// Product List imports
export interface ProductsList {
    resources:      Product[];
    headers:        Headers;
    hasMoreResults: boolean;
}

export class ProductListRequestConvert {
    public static fromJson(json: string): ProductsList {
        return JSON.parse(json);
    }
}