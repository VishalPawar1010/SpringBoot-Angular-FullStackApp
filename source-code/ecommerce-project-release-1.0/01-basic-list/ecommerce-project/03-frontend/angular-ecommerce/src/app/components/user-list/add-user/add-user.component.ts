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

  newUserForm: Users = new Users(0, '', 'Admin@123', '','','','',false,[]);
  errorMessage: String = '';
  message: string = '';
  newlyAddedUser: any;
  roleId: any;
  selectedPhoto: any;
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL
  email: string;
  emailExists: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router ,
  
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
    
  }
  
  createUser(users:Users): void {

    // Add role input to users
    const roleId = this.roleId; 
    const role = new Roles(roleId, null, null);
    users.roles.push(role);
    users.photos = null

    
    console.log("REQUEST for new user = ",users);
    this.userService.createUser(users).subscribe(
      (res) => {

        this.message = 'User created successfully';
        console.log('NEW USER = ', res);
        this.newlyAddedUser = res;
  
        // Redirect to the ViewUserComponent with the newly created user's ID
        this.router.navigate([ 'user', this.newlyAddedUser.id]);
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
  generateEmail() {
    const firstName = this.newUserForm.firstName;
    const lastName = this.newUserForm.lastName;
    const firstLetter = firstName.charAt(0).toLowerCase();
    const generatedEmail = `${firstLetter}${lastName.toLowerCase()}@gmail.com`;
  
    // Assign the generated email to the email property
    this.newUserForm.email = generatedEmail;
  }
  
  checkEmailExists() {
    const enteredEmail = this.newUserForm.email;
    this.userService.checkEmail(enteredEmail)  
      .subscribe((result) => {
          this.emailExists = result;
        }, (error) => {
          console.error('Error checking email:', error);
        });
 
    // this.httpClient.get<boolean>(`your-backend-api-url/check-email?email=${enteredEmail}`)
    //   .subscribe((result) => {
    //     this.emailExists = result;
    //   }, (error) => {
    //     console.error('Error checking email:', error);
    //   });
  }
  
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  
  //   if (file && file.size <= 2 * 1024 * 1024 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
  //     this.selectedPhoto = file;
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.selectedPhotoURL = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.selectedPhotoURL =  'assets/images/avatar.png';
  //     this.selectedPhoto =  'assets/images/avatar.png';
    
  //   }
  // }
  
  
  
}
