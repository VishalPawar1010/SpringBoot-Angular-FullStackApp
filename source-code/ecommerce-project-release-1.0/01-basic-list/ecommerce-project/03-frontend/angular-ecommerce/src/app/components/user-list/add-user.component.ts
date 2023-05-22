import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.html'],
})
export class AddUserComponent implements OnInit {
  newUserForm: Users = new Users(0, '', '', '', '', '', '');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router // private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createUser(user: Users): void {
    this.userService.createUser(user).subscribe((newUser) => {
      // Handle success or show appropriate message
    });
  }
}
