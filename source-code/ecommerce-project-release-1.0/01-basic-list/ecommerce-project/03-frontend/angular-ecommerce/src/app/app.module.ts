import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { UserService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticateGuard } from './authenticate.guard';
import { RequestInterceptor } from './request.interceptor';
import { AddUserComponent } from './components/user-list/add-user/add-user.component';
import { UpdateUserComponent } from './components/user-list/update-user/update-user.component';
import { ViewUserComponent } from './components/user-list/view-user/view-user.component';

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
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthenticateGuard],
    component: LoginComponent,
  },
  { path: 'user', canActivate: [AuthenticateGuard], component: ViewUserComponent },
  {
    path: 'users',
    canActivate: [AuthenticateGuard],
    component: UserListComponent,
  },
  {
    path: 'roles',
    canActivate: [AuthenticateGuard],
    component: RolesListComponent,
  },

  {
    path: 'add-user',
    canActivate: [AuthenticateGuard],
    component: AddUserComponent,
  },
  {
    path: 'update-user',
    canActivate: [AuthenticateGuard],
    component: UpdateUserComponent,
  },


  {
    path: '**',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent,
    RolesListComponent,
    LoginComponent,
    UpdateUserComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    UserService,
    RolesService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
