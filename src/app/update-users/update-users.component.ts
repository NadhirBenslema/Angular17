import { Component } from '@angular/core';
import { User } from '../models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.css'
})
export class UpdateUsersComponent {

  user:User = new User();
  UserList:User[]=[];
  id!:number;
  entityData:any;
  updateForm=new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  constructor(private usersService:UsersService,private R:Router ,private actR:ActivatedRoute) { }

  ngOnInit(): void {
    this.actR.paramMap.subscribe(data => this.id = Number(data.get('id')));
    console.log(this.id);
    this.getUserById();
  }

   getUserById(){
    this.usersService.getUserById(this.id).pipe(
      tap((users)=>{
      console.log(users)
    }),
    catchError((error) => {
      console.error("error while fetching user",error);
      return throwError('Failed to fetch user by its id')
    })
    )
    .subscribe(data => {
      this.entityData = data;
      console.log(this.entityData.username)
      // Populate form fields with fetched data
      this.updateForm.patchValue({
        username: this.entityData.username,
        email: this.entityData.email,
        phone: this.entityData.phone,
        birthDate: this.entityData.birthDate,
        password: this.entityData.password
      });
    });
  }

  getAllUsers(){
    return this.usersService.getAllUsers();
  }

  updateUs(){
    console.log(this.updateForm);
    let us = this.updateForm.getRawValue();
    console.log("us = ", us);
    this.usersService.updateUser(this.id,us).pipe(
      switchMap((updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        // Optionally, navigate to another page or perform other actions
        this.R.navigate([''])
        return this.getAllUsers(); // Fetch updated user list
      }),
  
      catchError((error)=>{
        console.error("error updating user:",error);
        return throwError('Failed to updade user. Please try again');
      })
    ).subscribe(
      // ()=>this.R.navigate([''])
    );

  }

  
  get username(){
    return this.updateForm.get('username');
  }
  get email(){
    return this.updateForm.get('email');
  }
  get phone(){
    return this.updateForm.get('phone');
  }
  get birthDate(){
    return this.updateForm.get('birthDate');
  }
  get password(){
    return this.updateForm.get('password');
  }
  
}
