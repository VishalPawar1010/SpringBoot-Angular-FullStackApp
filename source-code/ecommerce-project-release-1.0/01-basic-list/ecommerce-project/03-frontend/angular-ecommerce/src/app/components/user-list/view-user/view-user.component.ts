import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  user: any;
  profilePic: any;
  userEmail: string = "";
  tempProfilePic: any;
  showAlert: boolean = false;
  showMessage: boolean = false;
  file: File | undefined;
  @ViewChild('fileInput') fileInput: ElementRef;

  defaultImage = {
    male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
    female: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2.webp'
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('in view-user');
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId).subscribe(
      (res) => {
        this.userEmail = res.email;
        
        console.log(res);
        this.userService.getImage(this.userEmail).subscribe((imageData: Blob) => {
          console.log(this.userEmail);
          const reader = new FileReader();
          reader.onloadend = () => {
            this.profilePic = reader.result;
            // this.tempProfilePic = this.profilePic
          };
          reader.readAsDataURL(imageData);
        });
        this.user = res;
      },
      (error) => {
        console.log('ERROR:', error);
      }
    );
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (res: any) => {
      this.profilePic = res.target.result;
    };
    reader.readAsDataURL(this.file);
    if(this.file){
      this.showMessage = true;
    }
  }

  updateImage() {
    this.showAlert = true;
  }

  deleteImage(){
    console.log("test delete");
    this.userService.deleteProfilePic(this.userEmail).subscribe(res=>{
      this.profilePic= 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
      // this.profilePic = this.userService.getImage(this.userEmail).subscribe((imageData: Blob) => {
      //   console.log(this.userEmail);
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     this.profilePic = reader.result;
      //     // this.tempProfilePic = this.profilePic
      //   };
      //   reader.readAsDataURL(imageData);
      // });;
    });
  }

  closeAlert() {
    this.showAlert = false;
    this.showMessage = false;
    this.profilePic = this.tempProfilePic;
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('profilePic', this.file);
      this.userService.updateProfilePic(formData, this.userEmail).subscribe((res: any) => {
        this.profilePic = res;
      });
    }
    this.showAlert = false;
    this.showMessage = false;
  }

}
