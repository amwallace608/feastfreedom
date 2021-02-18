import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { CryptoService } from '../services/crypto.service';
import { UserSessionService } from '../services/user-session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  loggedIn;
  currentUser;
  needRegister = false;
  userAlreadyExists = false;
  invalidLogin = false;

  constructor(
    private router: Router,
    private usrSessionService: UserSessionService,
    private cryptoService: CryptoService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //check if user is logged in or not
    this.usrSessionService.isUserLoggedIn().subscribe((data) => {
      this.loggedIn = data;
      console.log('user logged in? ' + data);

      if (this.loggedIn) {
        //user is logged in, get current user data
        this.usrSessionService.getCurrentUser().subscribe((data) => {
          this.currentUser = data;
          console.log('current User: ' + data);
        });
      }
    });

    //create formgroup for login page and set validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    //create formgroup for register page and set validators
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  //toggle if user needs to register/login (false is login)
  toggleRegister(){
    this.needRegister = !this.needRegister;
  }


  onSubmitLogin(loginForm){
    //attempt to log user in with credentials from form

    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    //get user by email from API
    this.userService.getUserByEmail(email).subscribe(
      (data) => {
        //check if user found with given email
        if(data.id == -1){
          //id of -1 means no user was found with given email
          this.invalidLogin = true;
        } else {
          //user found with given email, decrypt password and verify
          var foundUser = data;
          var foundPassword = this.cryptoService.decrypt(foundUser.password);
          console.log("Decrypted password: " + foundPassword);

          if(foundPassword == password){
            //password matches decrypted password from database, log user in
            this.currentUser = data;
            this.usrSessionService.logUserIn(data);
            this.loggedIn = true;

          } else {
            //password incorrect
            console.log("password incorrect: " + password);
            this.invalidLogin = true;
          }
        }
      }
    )
    
  }

  onSubmitRegister(registerForm){
    console.log(this.registerForm.get('email').value);
    //get information from form
    let newUser = new User();
    newUser.firstName = this.registerForm.get('firstName').value;
    newUser.lastName = this.registerForm.get('lastName').value;
    newUser.email = this.registerForm.get('email').value;
    //encrypt password and set encrypted value for newUser's password
    newUser.password = this.cryptoService.encrypt(this.registerForm.get('password').value);

    //post user to API
    this.userService.registerUser(newUser).subscribe(
      (data) => {
        console.log("registration result: ");
        console.log(data);
        //check if registration was successful
        if(data.id == -1){
          //id of -1 indicates user already exists with that email
          this.userAlreadyExists = true;
        } else {
          //registration success, set user as current user/log user in
          this.currentUser = data;
          this.usrSessionService.logUserIn(data);
          this.loggedIn = true;
        }
      }
    )
  }


  //logout current user
  logOut(){
    //log out user with user session service
    this.usrSessionService.logUserOut();
    //reset local data
    this.loggedIn = false;
    this.currentUser = null;
  }

  //custom validator to check that passwords match
  checkPasswords(group: FormGroup) {
    //get form values from group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    //return null if passwords are the same, or object indicating otherwise
    return password === confirmPassword ? null : { notSame: true };
  }

  //cancel button clicked, navigate back to home
  cancel(){
    this.router.navigate(['/home']);
  }

}