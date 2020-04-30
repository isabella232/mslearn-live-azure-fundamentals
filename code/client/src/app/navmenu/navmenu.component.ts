import { Component, OnInit } from '@angular/core';
import { DataClient } from '../services/data-client';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  public data: DataClient;

  constructor(data: DataClient) { 
    this.data = data;
  }

  ngOnInit(): void {
  }
}
