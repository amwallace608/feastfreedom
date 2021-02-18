import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KitchenService } from '../services/kitchen.service';

@Component({
  selector: 'app-displaykitchens',
  templateUrl: './displaykitchens.component.html',
  styleUrls: ['./displaykitchens.component.css']
})
export class DisplaykitchensComponent implements OnInit {

  public kitchens = [];
  public errorMsg;

  //constructor
  constructor(private kitchenService: KitchenService, private router: Router) { }

  //get list of kitchens from API
  ngOnInit(): void {
    this.kitchenService.getKitchens().subscribe(
      (data) => {
        //kitchens retrieved from API/db
        this.kitchens = data;
        console.log(data);
      },
      (error) => (this.errorMsg = error)
    )
  }

  viewMenu(kitchen){
    console.log(kitchen);
    this.router.navigate(['/kitchen', kitchen.id]);
  }

}
