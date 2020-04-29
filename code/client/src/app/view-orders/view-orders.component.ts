import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { DataClient } from '../services/data-client';
import { ShoppingCart, Order } from '../models/ShoppingCart';
import { FormattingHelpers } from '../services/FormattingHelpers';
import { UserAuthManager } from '../services/UserAuthManager';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  public items: Order[];
  public store: DataClient;
  public userMgr: UserAuthManager;
  public formatter: FormattingHelpers;
  public loaded: boolean = false;

  constructor(dataClient: DataClient, formatter: FormattingHelpers, userMgr: UserAuthManager) { 
    this.store = dataClient;
    this.formatter = formatter;
    this.userMgr = userMgr;
    this.loadItems();
  }

  loadItems()
  {
    this.store.LoadOrders(this.userMgr);
    this.items = this.store.allOrders;
    this.loaded = true;
  }

  ngOnInit(): void {
  }

}
