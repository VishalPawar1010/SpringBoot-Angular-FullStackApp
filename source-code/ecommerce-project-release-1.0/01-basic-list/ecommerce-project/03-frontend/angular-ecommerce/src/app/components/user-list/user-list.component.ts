import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listUsers();
  }
  listUsers() {
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
    });
  }
}
