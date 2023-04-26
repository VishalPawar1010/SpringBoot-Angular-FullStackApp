import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  // currentRoleId: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

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
}
