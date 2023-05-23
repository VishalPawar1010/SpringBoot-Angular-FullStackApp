import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users, newUser } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.html'],
})
export class AddUserComponent implements OnInit {
  newUserForm: newUser = new newUser('', '', '', '');
  // roles: String = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router // private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  createUser(newUser: newUser): void {
    this.userService.createUser(newUser).subscribe((newUser) => {
      // Handle success or show appropriate message
    });
  }
}
