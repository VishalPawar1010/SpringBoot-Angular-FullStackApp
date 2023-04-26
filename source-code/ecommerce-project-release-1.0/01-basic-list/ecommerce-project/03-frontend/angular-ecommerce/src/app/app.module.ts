import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { UserService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
  // { path: 'users/:id', component: UserListComponent },
  // { path: 'roles/:id', component: UserListComponent },
  // { path: 'roles/:id', component: RolesListComponent },

  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  // { path: '**', redirectTo: '/users', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserListComponent,
    RolesListComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ProductService, UserService, RolesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
