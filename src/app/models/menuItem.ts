import { Kitchen } from "./kitchen";

export class MenuItem {
  id: number;
  name: string;
  veg: boolean;
  price: number;
  kitchen: Kitchen;

  constructor(id, name, veg, price){
    this.id = id;
    this.name = name;
    this.veg = veg;
    this.price = price;
  }

}