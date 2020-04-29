import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { AboutComponent } from './about/about.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { DataClient } from './services/data-client';
import { RouterModule } from '@angular/router';
import { Product } from './models/Product';
import { CartItem } from './models/CartItem';
import { ShoppingCart } from './models/ShoppingCart';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginUserComponent } from './login-user/login-user.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductComponent,
    ViewCartComponent,
    AboutComponent,
    NavmenuComponent,
    LoginUserComponent,
    ViewOrdersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: AboutComponent },
      { path: 'cart', component: ViewCartComponent },
      { path: 'product', component: ProductComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'orders', component: ViewOrdersComponent },
      { path: 'login', component: LoginUserComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
