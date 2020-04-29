import { Injectable } from '@angular/core';
import { Product } from './Product';
import { CartItem } from './CartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCart {
    public Name: string;
    public Address: string;
    public PhoneNumber: string;
    public Email: string;

    Items: CartItem[] = [];
    TotalPrice: number = 0;
    TotalItemCount: number = 0;
    HasItems: boolean = false;    

    ShoppingCart() {
        this.Clear();
    }

    FindItem(item: Product): CartItem {
        for (var i = 0; i < this.Items.length; i++) {
            if (this.Items[i].Item.id == item.id) {
                return this.Items[i];
            }
        }
        return null;
    }

    Clear()
    {
        this.Items.length = 0;
        this.Name = "";
        this.Address = "";
        this.PhoneNumber = "";
        this.Email = "";
        this.TotalPrice = 0;
        this.TotalItemCount = 0;
        this.HasItems = false; 

        this.UpdateTotals();
        this.UpdateValidState();
    }

    AddItemToCart(item: Product, qty: number) {
        let cartItem = this.FindItem(item);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.Item = item;
            this.Items.push(cartItem);
        }
        cartItem.Quantity += qty;
        cartItem.SubTotal = cartItem.Quantity * item.price;
        this.UpdateTotals();
        this.UpdateValidState();
    }

    RemoveItemFromCart(item: Product) {
        let cartItem = this.FindItem(item);
        if (cartItem != null) {
            const index = this.Items.indexOf(cartItem, 0);
            this.Items.splice(index, 1);
        }
        this.UpdateTotals();
        this.UpdateValidState();
    }

    UpdateTotals() {
        var total = 0;
        var itemCount = 0;
        for (var i = 0; i < this.Items.length; i++) {
            var item = this.Items[i];
            item.SubTotal = item.Quantity * item.Item.price;
            total += item.SubTotal;
            itemCount += item.Quantity;
        }
        this.TotalPrice = total;
        this.HasItems = this.Items.length > 0;
        this.TotalItemCount = itemCount;
    }

    public ValidationErrors: string[] = [];
    public IsCartValid: boolean;

    private UpdateValidState() 
    {
        this.ValidationErrors.length = 0;

        // Check Cart Validity
        if (this.TotalItemCount <= 0)
        {
            this.ValidationErrors.push("You must have at least one item in your cart");
        }

        this.IsCartValid = this.ValidationErrors.length == 0;
    }
}

export class Order extends ShoppingCart
{
    public userAccount: string;
    public id: string;
    public status: string;
    public dateSubmitted: string;
}