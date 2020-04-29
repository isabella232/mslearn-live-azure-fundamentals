import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { ShoppingCart, Order } from '../models/ShoppingCart';
import { UserAuthManager } from './UserAuthManager';

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

    public LoadProducts()
    {
        if (this.hasLoaded)
        {
            return;
        }
        
        this.isLoading = true;

        this.http.get(this.BaseApiLocation + "products").subscribe(result => {
            if (result != null)
            {
                this.allProducts.length = 0;
                let response = result as ProductsList;
                response.resources.forEach(element => {
                    this.allProducts.push(element);
                });
                this.isLoading = false;
                this.hasLoaded = true;
            }
        }, error => {
            console.error(error);
            this.isLoading = false;
            this.hasLoaded = false;
        });
    }

    isLoadingCategories: boolean = true;
    public productCategories: string[];

    public GetProductCategories()
    {
        this.isLoadingCategories = true;

        this.http.get(this.BaseApiLocation + "products/categories").subscribe(result => {
            if (result != null)
            {
                var response = ProductCategoriesRequestConvert.fromJson(result.toString());
                this.productCategories = response.resources[0].list;
                this.isLoadingCategories = false;
            }
        }, error => {
            console.error(error);
            this.isLoadingCategories = false;
        });
    }

    public isLoadingCategory: boolean = false;
    public CategoryProductList: Product[] = [];

    public GetProductsInCategory(categoryName: string)
    {
        this.isLoadingCategory = true;

        // TODO: Check the sanitization of the categoryName
        this.http.get(this.BaseApiLocation + "products/category/" + categoryName).subscribe(result => {
            if (result != null)
            {
                let response = result as ProductsList;
                response.resources.forEach(element => {
                    this.CategoryProductList.push(element);
                });
                this.isLoadingCategory = false;
            }
        }, error => {
            console.error(error);
            this.isLoadingCategory = false;
        });
    }

    public isLoadingProduct: boolean = true;
    public LoadedProduct: Product;

    public GetProduct(id: string)
    {
        this.isLoadingProduct = true;

        this.http.get(this.BaseApiLocation + "product/" + id).subscribe(result => {
            if (result != null)
            {
                let response = result as ProductsList;
                this.LoadedProduct = response.resources[0];
                this.isLoadingProduct = false;
            }
        }, error => {
            console.error(error);
            this.isLoadingProduct = false;
        });
    }

    public isSubmittingCart: boolean;
    public cartMessage: string;

    public async SubmitUserOrder(cart: ShoppingCart, userMgr: UserAuthManager, afterSubmission: postActionOperation)
    {
        // Send the cart through to the service
        this.cartMessage = "Sending cart...";
        this.http.post(this.BaseApiLocation + "order", cart, userMgr.GetOptionsWithHeaders()).subscribe(result => {
            if (result != null)
            {
                this.isSubmittingCart = false;
                afterSubmission();
                this.cartMessage = "";
            }
        }, error => {
            console.error(error);
            this.cartMessage = error.error;
            this.isSubmittingCart = false;
        });
    }

    public allOrders: Order[] = []; 
    public IsLoadingOrders = false;

    public LoadOrders(userMgr: UserAuthManager)
    {
        this.IsLoadingOrders = true;

        this.http.get(this.BaseApiLocation + "orders", userMgr.GetOptionsWithHeaders()).subscribe(result => {
            if (result != null)
            {
                this.allOrders.length = 0;
                let response = result as ExistingOrderList;
                response.resources.forEach(element => {
                    this.allOrders.push(element);
                });
                this.IsLoadingOrders = false;
            }
        }, error => {
            console.error(error);
            this.IsLoadingOrders = false;
        });
    }

    public isLoggingIn: boolean;
    public AuthMessage: string;

    private PerformLoginAction(action: string, userName: string, pwd: string, userMgr: UserAuthManager, 
        afterLogin: postActionOperation)
    {
        
        this.isLoggingIn = true;
        let path = action == "login" ? "AuthenticateUserLogin" : "RegisterNewUser";
        this.AuthMessage = action == "login" ? "Logging in..." : "Registering...";

        let body = {
            "UserName": userName,
            "Password": pwd
        };

        this.http.post(this.BaseApiLocation + path, body).subscribe(result => {
            if (result != null)
            {
                let details = result as AuthResponseDetails;
                userMgr.SetLoginDetails(details.username, details.token);
                this.isLoggingIn = false;
                this.AuthMessage = "";

                afterLogin();
            }
        }, error => {
            console.error(error);
            this.AuthMessage = error.error;
            this.isLoggingIn = false;
        });
    }

    public LoginUser(userName: string, pwd: string, userMgr: UserAuthManager, afterLogin: postActionOperation)
    {
        this.PerformLoginAction("login", userName, pwd, userMgr, afterLogin);
    }

    public RegisterUser(userName: string, pwd: string, userMgr: UserAuthManager, afterLogin: postActionOperation)
    {
        this.PerformLoginAction("register", userName, pwd, userMgr, afterLogin);
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

// Typescript definition of the JSON definitions from Product Categories
export interface ProductCategories {
    resources:      ProductCategoriesResource[];
    headers:        Headers;
    hasMoreResults: boolean;
}

export interface ProductCategoriesResource {
    id:           string;
    itemType:     string;
    list:         string[];
    _rid:         string;
    _self:        string;
    _etag:        string;
    _attachments: string;
    _ts:          number;
}

export class ProductCategoriesRequestConvert {
    public static fromJson(json: string): ProductCategories {
        return JSON.parse(json);
    }
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

//Requests for orders
export interface ExistingOrderList {
    resources:      Order[];
    headers:        Headers;
    hasMoreResults: boolean;
}

export class OrderListRequestConvert {
    public static fromJson(json: string): ExistingOrderList {
        return JSON.parse(json);
    }
}

export interface AuthResponseDetails 
{
    username: string;
    token: string;
}