import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { KitchenService } from '../services/kitchen.service';
import { MyCartService } from '../services/my-cart.service';

@Component({
  selector: 'app-kitchen-menu',
  templateUrl: './kitchen-menu.component.html',
  styleUrls: ['./kitchen-menu.component.css'],
})
export class KitchenMenuComponent implements OnInit {
  cartItems = [];
  kitchenId;
  kitchen;
  menu;
  errorMsg;

  //constructor
  constructor(
    private kitchenService: KitchenService,
    private cartService: MyCartService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //get kitchen id and kitchen
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id);
      this.kitchenId = id;

      //get kitchen by ID from API/DB
      this.kitchenService.getKitchen(this.kitchenId).subscribe(
        (data) => {
          //kitchen retrieved
          this.kitchen = data;
          this.menu = this.kitchen.menu;
          console.log(this.kitchen);
        },
        (error) => (this.errorMsg = error)
      );
    });
  }

  onItemSelected(event, item){
    if(event.target.checked){
      //item was checked, add it to cart list
      this.cartItems.push(item);
      console.log(this.cartItems);
    } else {
      //item was unchecked, remove it from cart list
      this.cartItems = this.cartItems.splice(this.cartItems.indexOf(item), 1);
      console.log(this.cartItems);
    }
  }

  addToCart(){
    let myCart = [];
    this.cartService.getCart().subscribe(
      (data) => {
        myCart = data;
      }
    )

    if (myCart == undefined){
      this.cartService.updateCart(this.cartItems);
    } else {
      //update cart - concat items to current cart
      this.cartService.updateCart(
        myCart.concat(this.cartItems)
      );
    }
    //navigate to cart
    //console.log(myCart);
    this.router.navigate(['shoppingcart']);
  }

  //back button clicked
  back() {
    this.router.navigate(['/home']);
  }
}
