import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyCartService } from './services/my-cart.service';
import { UserSessionService } from './services/user-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FeastFreedom';
  myCart = [];
  loggedIn;
  currentUser;
  userName = "Log In";
  constructor(private cartService: MyCartService, private router: Router, private userSession: UserSessionService){
    this.cartService.getCart().subscribe(
      (data) => {
        this.myCart = data;
        console.log(data);
    }
    );
    this.userSession.isUserLoggedIn().subscribe((data) => {
      this.loggedIn = data;
      console.log('user logged in? ' + data);

      if (this.loggedIn) {
        //user is logged in, get current user data
        this.userSession.getCurrentUser().subscribe((data) => {
          this.currentUser = data;
          console.log('current User: ' + data);
          this.userName = data.firstName + ' ' + data.lastName;
        });
      } else {
        //no user currently logged in
        this.userName = "Log In";
      }
    });
    
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToCart(){
    this.router.navigate(['shoppingcart']);
  }

  providerRegister(){
    this.router.navigate(['registerkitchen']);
  }

  goToUser(){
    this.router.navigate(['user']);
  }
}
