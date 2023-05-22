import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { UserService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticateGuard } from './authenticate.guard';
import { RequestInterceptor } from './request.interceptor';
import { AddUserComponent } from './components/user-list/add-user.component';

// const routes: Routes = [
//   {
//     path: '',
//     canActivate: [AuthenticateGuard],
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'users', component: UserListComponent },
//       { path: 'roles', component: RolesListComponent },
//       { path: 'category/:id', component: ProductListComponent },
//       { path: 'category', component: ProductListComponent },
//       { path: 'products', component: ProductListComponent },

//       { path: '', redirectTo: '/products', pathMatch: 'full' },
//       { path: '**', redirectTo: '/products', pathMatch: 'full' },
//       // { path: 'users', component: UserListComponent },
//       // { path: 'users/:id', component: UserListComponent },
//       // { path: 'roles/:id', component: UserListComponent },
//       // { path: 'roles/:id', component: RolesListComponent },

//       // { path: '', redirectTo: '/users', pathMatch: 'full' },
//       // { path: '**', redirectTo: '/users', pathMatch: 'full' },
//     ],
//   },
// ];
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    canActivate: [AuthenticateGuard],
    component: UserListComponent,
  },
  {
    path: 'add-user',
    canActivate: [AuthenticateGuard],
    component: AddUserComponent,
  },
  {
    path: 'roles',
    canActivate: [AuthenticateGuard],
    component: RolesListComponent,
  },
  {
    path: 'products',
    canActivate: [AuthenticateGuard],
    component: ProductListComponent,
  },
  {
    path: 'category',
    canActivate: [AuthenticateGuard],
    component: ProductListComponent,
  },
  {
    path: 'category/:id',
    canActivate: [AuthenticateGuard],
    component: ProductListComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserListComponent,
    AddUserComponent,
    RolesListComponent,
    ProductCategoryMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    ProductService,
    UserService,
    RolesService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
