import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Guid } from '../guid';

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
            let products = result["products"] as Product[];
            products.forEach(element => {
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
            this.LoadedProduct = result["product"];
        }

        this.isLoadingProduct = false;
    }

    public async UpsertProduct(product: Product): Promise<any>
    {
        this.isLoadingProduct = true;

        let result: any;
        try {
            if(product.id == null)
            {
                product.id = Guid.newGuid();
                result = await this.http.post(this.BaseApiLocation + "product", product).toPromise();    
            }
            else
            {
                result = await this.http.put(this.BaseApiLocation + "product/" + product.id, product).toPromise();    
            }
            
        } catch (error) {
           console.error(error); 
        }
        
        this.isLoadingProduct = false;
    }
}