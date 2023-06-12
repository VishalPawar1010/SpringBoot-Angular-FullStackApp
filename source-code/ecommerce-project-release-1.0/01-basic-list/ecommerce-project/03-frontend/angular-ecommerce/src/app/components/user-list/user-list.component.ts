import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from 'src/app/common/roles';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  selectedUser: Users = new Users(0, '', '', '','', '', null, false, []);
  getImage :any;
  base64Image:any;

  activeModal: any;
  studentToUpdate: Users[] = [];
  getResponse: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private authService :AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listUsers();
      // this.getUserData();
    });
  }

  

  listUsers() {
    this.userService.getUserList().subscribe((data) => {
      // this.users = data;
      console.log( 'users list' ,this.users);
      this.users = data.map((user) => {
        // this.getResponse = user;
        this.getImage = user.photos;
        this.base64Image = 'data:image/jpeg;base64,' + this.getImage;
        return { ...user, photos:this.base64Image};
      });
    });
  }
  
  
  
  
  

  goToAddUser() {
    this.router.navigate(['add-user']);
  }
  // goToUpdateUser(user: Users) {
  //   this.router.navigate(['update-user'], { state: { user } });
  // }

  openUpdateUser(userToBeUpdated: any) {
    console.log("entering update modal value == ",this.authService.isLoggedIn.value);
    // if (!this.authService.isLoggedIn.value) {
    //   console.log("in update modal value == ",this.authService.isLoggedIn.value);
    //   this.router.navigate(['/login']);
    //   // return;
    // }
    const modalRef = this.modalService.open(UpdateUserComponent);
    modalRef.componentInstance.props = { user: { ...userToBeUpdated } };

    modalRef.result.then((res) => {
      console.log('NEW USER = ', res);
      this.userService.updateUser(res.id, res).subscribe((updatedUser) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          console.log('User updated successfully');
        }
      });
    });
  }


  deleteUser(user: Users): void {
    // console.log("entering delete value == ",this.authService.isLoggedIn.value);
    // if (!this.authService.isLoggedIn.value) {
    //   console.log("in delete value == ",this.authService.isLoggedIn.value);
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
      // Handle success or show appropriate message
    });
  }
}
