import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/ShoppingCart';
import { DataClient } from '../services/data-client';
import { UserAuthManager } from '../services/UserAuthManager';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  public cart: ShoppingCart;
  public data: DataClient;
  public userMgr: UserAuthManager;

  constructor(globalCart: ShoppingCart, data: DataClient, userMgr: UserAuthManager) { 
    this.cart = globalCart;  
    this.data = data;
    this.userMgr = userMgr;
  }

  ngOnInit(): void {
  }
}
