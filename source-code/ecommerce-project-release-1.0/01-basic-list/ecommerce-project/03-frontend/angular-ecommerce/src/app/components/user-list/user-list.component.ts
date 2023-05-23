import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  activeModal: any;

  // userNew: Users = new Users(0, '', '', '', '', '', '');
  // userForm: FormGroup;
  // currentRoleId: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router // private formBuilder: FormBuilder
  ) {
    // this.userForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    // });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listUsers();
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
      this.users = data;
    });
  }
  goToAddUser() {
    this.router.navigate(['add-user']);
  }

  // createUser(user: Users): void {
  //   this.userService.createUser(user).subscribe((newUser) => {
  //     this.users.push(newUser);
  //     // Handle success or show appropriate message
  //   });
  // }
  updateUser(user: Users): void {
    this.userService.updateUser(user.id, user).subscribe((updatedUser) => {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        // Handle success or show appropriate message
      }
    });
  }
  deleteUser(user: Users): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
      // Handle success or show appropriate message
    });
  }
}
