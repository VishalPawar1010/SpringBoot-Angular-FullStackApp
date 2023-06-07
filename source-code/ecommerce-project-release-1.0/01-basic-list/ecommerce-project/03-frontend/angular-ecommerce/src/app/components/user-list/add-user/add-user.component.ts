import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users, newUser } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/common/roles';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  // newUserForm: newUser = new newUser('', '', '', '');

  newUserForm: Users = new Users(0, '', '', '','',null,false,[]);
  errorMessage: String = '';
  message: string = '';
  newlyAddedUser: any;
  roleId: any;
  
  // roles: String = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router // private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
    
  }
  
  createUser(users:Users): void {
    const roleId = this.roleId; 

    const role = new Roles(roleId, null, null);

    users.roles.push(role);
    
    console.log("REQUEST for new user = ",users);
    this.userService.createUser(users).subscribe(
      (res) => {
        this.message = 'User created successfully';
        console.log('NEW USER = ', res);
        this.newlyAddedUser = res;
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
  // createUser(newUser: newUser): void {
  //   this.userService.createUser(newUser).subscribe(
  //     (res) => {
  //       this.message = 'User created successfully';
  //       console.log('NEW USER = ', res);
  //       this.newlyAddedUser = res;
  //     },
  //     (error) => {
  //       this.errorMessage = 'Something went wrong';
  //       console.log('ERROR = ', error);
  //     }
  //   );
  // }
}
