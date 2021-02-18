import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../models/menuItem';
import { MyCartService } from '../services/my-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: MenuItem[];
  totalPrice;

  constructor(private cartService: MyCartService, private router: Router) { }

  ngOnInit(): void {
    //get cart items from service
    this.cartService.getCart().subscribe(
      (data) => {
        this.shoppingCart = data;
        console.log(data);
      }
    )

    console.log(this.shoppingCart);
    //calculate total price of all items in cart
    this.totalPrice = 0;
    for(let i = 0; i < this.shoppingCart.length; i++){
      this.totalPrice += this.shoppingCart[i].price;
    }
  }

  clearCart(){
    this.cartService.resetCart();
    this.shoppingCart = [];
    this.totalPrice = 0;
  }
}
