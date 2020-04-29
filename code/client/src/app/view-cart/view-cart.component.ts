import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ShoppingCart } from '../models/ShoppingCart';
import { DataClient } from '../services/data-client';
import { Product } from '../models/Product';
import { FormattingHelpers } from '../services/FormattingHelpers';
import { UserAuthManager } from '../services/UserAuthManager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  public cart: ShoppingCart;
  public dataClient: DataClient;
  public usrManager: UserAuthManager;
  public formatHelper: FormattingHelpers;

  public userForm;

  constructor(dataClient: DataClient, globalCart: ShoppingCart, usrManager: UserAuthManager,
      formatHelper: FormattingHelpers, private formBuilder: FormBuilder, private router: Router) { 
    this.cart = globalCart;
    this.dataClient = dataClient;
    this.formatHelper = formatHelper;
    this.usrManager = usrManager;

    this.userForm = this.formBuilder.group({
      name: '',
      address: '',
      email: '',
      phone: ''
    });
  }

  ngOnInit(): void {
  }

  public removeItem(product: Product)
  {
    this.cart.RemoveItemFromCart(product);
  }

  public onSubmit(userData)
  {
    this.cart.Name = userData.name;
    this.cart.Address = userData.address;
    this.cart.Email = userData.email;
    this.cart.PhoneNumber = userData.phone;

    // Send the cart through to the server
    let response = this.dataClient.SubmitUserOrder(this.cart, this.usrManager, () => {
      this.cart.Clear();
      if (this.usrManager.IsLoggedIn)
      {
        this.router.navigateByUrl("orders");
      } else {
        this.router.navigateByUrl("products");
      }  
    });
  }
}
