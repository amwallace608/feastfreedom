import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaykitchensComponent } from './displaykitchens/displaykitchens.component';
import { KitchenMenuComponent } from './kitchen-menu/kitchen-menu.component';
import { RegisterKitchenComponent } from './register-kitchen/register-kitchen.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DisplaykitchensComponent },
  { path: 'registerkitchen', component: RegisterKitchenComponent},
  { path: 'kitchen/:id', component: KitchenMenuComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'user', component: UserLandingComponent},
  //{ path: '/registeruser', component: UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  DisplaykitchensComponent,
  RegisterKitchenComponent,
  KitchenMenuComponent,
  ShoppingCartComponent,
  UserLandingComponent
]
