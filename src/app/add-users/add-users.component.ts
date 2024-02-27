import { Component } from '@angular/core';
import { User } from '../models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { Route, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent {

  u:User=new User();

  message="";
  ajout=false;

  reactiveForm=new FormGroup({
  username: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
  birthDate: new FormControl('', [Validators.required]),
  photoFile: new FormControl<null | File>(null),
  password: new FormControl('', [Validators.required]),

})

  constructor(private usersService:UsersService,private router:Router) { }

  ngOnInit(): void {
  }

  saveUser(){
    console.log(this.reactiveForm);
    let u = this.reactiveForm.getRawValue();
    console.log("u = ", u);
    this.usersService.addUser(u).pipe(
      catchError((error)=>{
        console.error('Error adding user:', error);
        return throwError('Failed to add user. Please try again.')
        
      }
      )
    ).subscribe(()=>
    this.router.navigate(['']));
    // this.message='User ajouté avec suucés !'
    // this.ajout=true;

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.reactiveForm.patchValue({
        photoFile: file
      });
    }
  }
  get username(){
    return this.reactiveForm.get('username');
  }
  get email(){
    return this.reactiveForm.get('email');
  }
  get phone(){
    return this.reactiveForm.get('phone');
  }
  get birthDate(){
    return this.reactiveForm.get('birthDate');
  }
  get photoFile(){
    return this.reactiveForm.get('photoFile');
  }
  get password(){
    return this.reactiveForm.get('password');
  }

}
