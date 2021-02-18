import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplaykitchensComponent } from './displaykitchens/displaykitchens.component';
import { RegisterKitchenComponent } from './register-kitchen/register-kitchen.component';
import { HttpClientModule } from '@angular/common/http';
import { KitchenMenuComponent } from './kitchen-menu/kitchen-menu.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyCartService } from './services/my-cart.service';
import { UserSessionService } from './services/user-session.service';
import { UserLandingComponent } from './user-landing/user-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplaykitchensComponent,
    RegisterKitchenComponent,
    KitchenMenuComponent,
    ShoppingCartComponent,
    UserLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyCartService, UserSessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
