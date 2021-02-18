import { Component, OnInit } from '@angular/core';
import { Kitchen } from "../models/kitchen";
import { MenuItem } from '../models/menuItem';
import { KitchenService } from '../services/kitchen.service';
import { UploadService } from '../services/upload.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemService } from '../services/menu-item.service';

@Component({
  selector: 'app-register-kitchen',
  templateUrl: './register-kitchen.component.html',
  styleUrls: ['./register-kitchen.component.css'],
})
export class RegisterKitchenComponent implements OnInit {
  public kitchenForm1: FormGroup;
  public kitchenForm2: FormGroup;
  page: number;
  kitchen: Kitchen;
  errorMsg;
  //array of days for working day checkboxes
  workdays: Array<any> = [
    { name: 'Sunday', value: 'Sunday' },
    { name: 'Monday', value: 'Monday' },
    { name: 'Tuesday', value: 'Tuesday' },
    { name: 'Wednesday', value: 'Wednesday' },
    { name: 'Thursday', value: 'Thursday' },
    { name: 'Friday', value: 'Friday' },
    { name: 'Saturday', value: 'Saturday' },
  ];

  //array of times for start/end time selection
  worktimes: any = [
    '12:00am',
    '1:00am',
    '2:00am',
    '3:00am',
    '4:00am',
    '5:00am',
    '6:00am',
    '7:00am',
    '8:00am',
    '9:00am',
    '10:00am',
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
    '6:00pm',
    '7:00pm',
    '8:00pm',
    '9:00pm',
    '10:00pm',
    '11:00pm'
  ];

  //FileList for kitchen image file upload
  selectedFiles: FileList;

  constructor(
    private fb: FormBuilder,
    private kitchenService: KitchenService,
    private uploadService: UploadService,
    private menuItemService: MenuItemService,
    private router: Router
  ) {
    this.page = 1;
  }

  ngOnInit(): void {
    //create formgroup for first page and set validators
    this.kitchenForm1 = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );

    //create formgroup for second page and set validators
    this.kitchenForm2 = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      image: ['', [Validators.required]],
      numberOfItems: ['', [Validators.required]],
      menuItems: this.fb.array([], [Validators.required])
    });
  }

  //convenience getters for easy access to menu items 
  get m() {return this.kitchenForm2.controls.menuItems as FormArray;}
  get menuItemFormGroups() { return this.m.controls as FormGroup[];}

  //on submission of page 1 form
  onSubmitPg1(kitchenForm1) {
    //set kitchen data to first form data
    this.kitchen = new Kitchen();
    this.kitchen.name = this.kitchenForm1.get('name').value;
    this.kitchen.email = this.kitchenForm1.get('email').value;
    this.kitchen.password = this.kitchenForm1.get('password').value;

    //update page to page 2
    this.page = 2;
  }

  //on submission of page 2 form
  onSubmitPg2(kitchenForm2){
    //set kitchen data to second form data
    console.log(this.kitchenForm2.get('checkArray').value);
    console.log(this.kitchenForm2.controls);

    //trim index from start and end time strings
    let str = this.kitchenForm2.get('startTime').value;
    let startStr = str.slice(str.indexOf(' ') + 1);
    console.log(startStr);
    this.kitchen.startTime = startStr;

    str = this.kitchenForm2.get('endTime').value;
    let endStr = str.slice(str.indexOf(' ') + 1);
    console.log(endStr);
    this.kitchen.endTime = endStr;

    this.kitchen.workingDays = this.kitchenForm2.get('checkArray').value;
    //this.kitchen.startTime = this.kitchenForm2.get('startTime').value;
    //this.kitchen.endTime = this.kitchenForm2.get('endTime').value;
    this.kitchen.image = this.kitchenForm2.get('image').value;
    //TODO *****************
    //create MenuItem objects for each menu item entered, w/ id adding up from # of items in database
    var numItems;
    this.menuItemService.getNumItems().subscribe(
      (data) => {
        numItems = data;
        var numFormItems = this.kitchenForm2.get('numberOfItems').value;
        console.log(numItems);
        //iterate through all menuitems submitted in form, creating MenuItem objects for each
        var formMenu = this.kitchenForm2.get('menuItems').value;
        var menu = new Array<MenuItem>();
        var index = 0;
        for (let i = numItems; index < numFormItems; i++) {
          //create new menuItem object for each given in array, and add to menu
          menu.push(
            new MenuItem(
              i,
              formMenu[index].name,
              formMenu[index].veg,
              formMenu[index].price,
            )
          );
          index++;
        }
        //set menu for kitchen object
        this.kitchen.menu = menu;
        console.log(this.kitchen);
        //save kitchen to database/post kitchen to API
        this.kitchenService.registerKitchen(this.kitchen).subscribe(
          (data) => {
            this.kitchen = data;
            console.log(this.kitchen);
          },
          (error) => (this.errorMsg = error)
        );
        //return to main page
        this.router.navigate(['/home']);
      },
      (error) => (this.errorMsg = error)
    );
  }

  //custom validator to check passwords
  checkPasswords(group: FormGroup) {
    //get form values from group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    //return null if passwords are the same, or object indicating otherwise
    return password === confirmPassword ? null : { notSame: true };
  }

  //workdays checkbox array change
  onCheckboxChange(e) {
    //get array of checkboxes as form array
    const checkArray: FormArray = this.kitchenForm2.get(
      'checkArray'
    ) as FormArray;

    //push value to array if checked, otherwise remove from array
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(this.kitchenForm2.get('checkArray').value);
    } else {
      //unchecked - find value and remove from array
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          //remove day from array
          checkArray.removeAt(i);
          console.log(this.kitchenForm2.get('checkArray').value);
          return;
        }
        i++;
      });
    }
  }

  //start time select changed
  startChanged(e){
    console.log(e.target.value);
    //set start time value to selected value
    this.kitchenForm2.get('startTime').setValue(e.target.value);
  }

  //end time select changed
  endChanged(e){
    console.log(e.target.value);
    //sest end time value to selected value
    this.kitchenForm2.get('endTime').setValue(e.target.value);
  }

  //file selected 
  selectFile(e){
    this.selectedFiles = e.target.files;
  }

  //upload selected file to amazon S3 bucket and get url
  upload(){
    const file = this.selectedFiles.item(0);
    //upload file to bucket and set image value to url
    this.uploadService.uploadFile(file).then((data) => {
      console.log('Successfully uploaded file.', data);
      this.kitchenForm2.get('image').setValue(data.Location);
      console.log(this.kitchenForm2.get('image').value);
    });
  }

  //number of menu items changed
  onChangeItemNumber(e){
    //get number of items selected
    const numberOfItems = e.target.value || 0;
    //if more than current value of menu items
    if(this.m.length < numberOfItems){
      for( let i = this.m.length; i < numberOfItems; i++){
        this.m.push(this.fb.group({
          name: ['', Validators.required],
          price: ['', Validators.required],
          veg: ['', Validators.required]
        }));
      }
    } else {
      //less than or equal to current number of menu items
      for(let i = this.m.length; i >= numberOfItems; i--){
        this.m.removeAt(i);
      }
    }
  }

  //cancel button clicked
  cancel() {
    //use native browser confirm alert to make sure user wants to cancel registration
    if (confirm('Are you sure you want to cancel your registration?')) {
      //return to home page if cancel confirmed
      this.router.navigate(['/home']);
    }
  }
}
