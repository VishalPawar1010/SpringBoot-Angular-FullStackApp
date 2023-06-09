import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users, newUser } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/common/roles';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls:['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  // newUserForm: newUser = new newUser('', '', '', '');

  newUserForm: Users = new Users(0, '', '', '','','',false,[]);
  errorMessage: String = '';
  message: string = '';
  newlyAddedUser: any;
  roleId: any;
  selectedPhoto: String | Blob;
  
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
  
    const formData = new FormData();
    formData.append('user', JSON.stringify(users)); // Convert the user object to JSON string and append it
      // formData.append('file', this.selectedPhoto);
    
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
 

onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file && file.size <= 2 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    this.selectedPhoto = file;
  } else {
    // Handle file selection error (size or format not supported)
    this.selectedPhoto = undefined;
  }
}
  
}
