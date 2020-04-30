import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AdminProductsListComponent } from './admin-products-list/admin-products-list.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AdminProductsListComponent,
    ProductComponent,
    AdminProductComponent,
    AboutComponent,
    NavmenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: AboutComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'admin/products', component: AdminProductsListComponent },
      { path: 'admin/product/:productId', component: AdminProductComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
