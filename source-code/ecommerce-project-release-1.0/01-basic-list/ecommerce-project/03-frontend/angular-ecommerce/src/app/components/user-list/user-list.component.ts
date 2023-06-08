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
  selectedUser: Users = new Users(0, '', '', '', '', '', false, []);

  activeModal: any;
  studentToUpdate: Users[] = [];
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
    // check if given id is available
    // const hasRoleId: boolean = this.route.snapshot.paramMap.has('id');

    // if (hasRoleId) {
    //   this.currentRoleId = +this.route.snapshot.paramMap.get('id')!;
    // }else{
    //   this.currentRoleId
    // }

    this.userService.getUserList().subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  goToAddUser() {
    this.router.navigate(['add-user']);
  }
  // goToUpdateUser(user: Users) {
  //   this.router.navigate(['update-user'], { state: { user } });
  // }

  openUpdateUser(userToBeUpdated: any) {
    if (this.authService.isLoggedIn.value) {
      this.router.navigate(['/login']);
      return;
    }
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

  // createUser(user: Users): void {
  //   this.userService.createUser(user).subscribe((newUser) => {
  //     this.users.push(newUser);
  //     // Handle success or show appropriate message
  //   });
  // }
  // getUserDataById(user: Users) {
  //   debugger;
  //   this.selectedUser = user;
  //   console.log('update user =' + user);
  // }

  // openEditModal(user: Users) {
  //   this.selectedUser = { ...user };
  //   this.activeModal = 'update';
  //   $('#updateUserModal').modal('show'); // Open the modal
  // }

  // updateUser() {
  //   this.index = this.users.findIndex((u) => u.id === updatedUser.id);
  //       if (index !== -1) {
  //         this.users[index] = updatedUser;
  //         // HauserService
  //     .updateUser(this.selectedUser.id, this.selectedUser)
  //     .subscribe((updatedUser) => {
  //       const ndle success or show appropriate message
  //       }
  //       $('#updateUserModal').modal('hide');
  //     });
  // }

  // updateUser(user: Users): void {
  //   this.userService.updateUser(user.id, user).subscribe((updatedUser) => {
  //     const index = this.users.findIndex((u) => u.id === updatedUser.id);
  //     if (index !== -1) {
  //       this.users[index] = updatedUser;
  //       // Handle success or show appropriate message
  //     }
  //   });
  // }
  deleteUser(user: Users): void {
    if (this.authService.isLoggedIn.value) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
      // Handle success or show appropriate message
    });
  }
}
