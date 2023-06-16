import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Users[] = [];
  selectedUser: Users = new Users(0, '', '', '', '', '', null, false, []);
  getImage: any;
  base64Image: any;
  profilePics: Map<String, String> = new Map<String, String>();
  activeModal: any;
  studentToUpdate: Users[] = [];
  getResponse: any;
  dtOptions: DataTables.Settings = {};

  defaultImage = {
    male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
    female:
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2.webp',
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.route.paramMap.subscribe(() => {
      console.log('users list component');
      this.listUsers();
    });
  }

  listUsers() {
    console.log('users list component = list-user method');

    this.userService.getUserList().subscribe((data) => {
      this.users = data;

      console.log('users list', this.users);
      this.users = data.map((user) => {
        if (user.photos) {
          this.getImage = user.photos;
          this.base64Image = 'data:image/png;base64,' + this.getImage;
          return { ...user, photos: this.base64Image };
        }
        return {
          ...user,
          photos:
            user.gender === 'male'
              ? this.defaultImage['male']
              : this.defaultImage['female'],
        };
      });
    });
  }

  goToAddUser() {
    this.router.navigate(['add-user']);
  }
  viewUser(user: Users): void {
    this.router.navigate(['user', { id: user.id }]);
  }

  openUpdateUser(userToBeUpdated: any) {
    const modalRef = this.modalService.open(UpdateUserComponent, {
      modalDialogClass: 'modal-lg',
    });
    modalRef.componentInstance.props = { user: { ...userToBeUpdated } };
    modalRef.result.then((res) => {
      if (!res) return;

      console.log('NEW USER = ', res);
      this.userService.updateUser(res.id, res).subscribe((updatedUser) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        updatedUser.photos = this.defaultImage[updatedUser.gender];
        if (index !== -1) {
          this.users[index] = updatedUser;
          console.log('User updated successfully');
        }
      });
    });
  }

  deleteUser(user: Users): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmed) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.users = this.users.filter((u) => u.id !== user.id);
      });
    }
  }
}
