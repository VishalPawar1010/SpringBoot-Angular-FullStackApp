import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users, newUser } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/common/roles';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  selectedPhoto: any;
  selectedPhotoURL: any;
  
  // roles: String = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ,
    private sanitizer: DomSanitizer// private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
    
  }
  
  createUser(users:Users): void {
    const roleId = this.roleId; 

    const role = new Roles(roleId, null, null);

    users.roles.push(role);
  
    const formData = new FormData();
    formData.append('photoFile', this.selectedPhoto as File);
    console.log('photoFile', this.selectedPhoto as File); // Handle this.selectedPhoto as a File
    formData.append('newUser', JSON.stringify(users));
    console.log('newUser', JSON.stringify(users));
    
    console.log("REQUEST for new user = ",users);
    this.userService.createUser(formData).subscribe(
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
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPhotoURL = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedPhoto = undefined;
      this.selectedPhotoURL = undefined;
    }
  }
  
  
  
}
