import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserListComponent,
    RolesListComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
