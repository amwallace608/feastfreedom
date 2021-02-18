import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { MenuItem } from '../models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {
 
  private myCart: ReplaySubject<MenuItem[]> = new ReplaySubject<MenuItem[]>();

  //update cart
  public updateCart(newCart: MenuItem[]){
    this.myCart.next(newCart);
  }

  //get the cart
  public getCart(){
    return this.myCart.asObservable();
  }

  //reset cart
  public resetCart(){
    this.myCart.next(new Array<MenuItem>());
  } 
}
