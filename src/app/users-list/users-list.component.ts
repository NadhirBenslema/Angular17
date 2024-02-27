import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../service/users.service';
import { RouterModule } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    RouterModule,
    AsyncPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  userList:User[]=[];

//try the AsyncPipe 
  userListObs$!: Observable<User[]>;


  u:User=new User();
  message="";
  ajout=false;

constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    // this.getUsers()
    this.userListObs$ = this.getUsers();

  }
  // getUsers(){
  //   this.usersService.getAllUsers().pipe(
  //     tap((users) => {
  //       console.log('Users fetched successfully:', users);
  //     }),
  //     catchError((error) => {
  //       console.error('Error fetching users:', error);
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   )
  //   .subscribe(data =>{this.userList = data
  //     console.log(data)
  //   });
   
  // }
  getUsers(): Observable<User[]> {
    return this.usersService.getAllUsers().pipe(
      tap((users) => {
        console.log('Users fetched successfully:', users);
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError('Something went wrong!');
      })
    );
  }

 

  deleteRec(id:any){

    this.usersService.deleteUser(Number(id)).subscribe(()=> this.getUsers());
    // this.message='Departement supprimé avec succés ! ';
    // this.affichage=true;
  }


  addUs(){
    this.usersService.addUser(this.u).subscribe();
    console.log(this.u);
  } 


}
