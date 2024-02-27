import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: User[]= [];


  constructor(private http : HttpClient) { }
  //URL du Backend
  url = "http://localhost:8089/api/user";

 getAllUsers(): Observable<User[]>{
  
  return this.http.get<User[]>(`${this.url}/getAll`)

}

 
 addUser(user: any): Observable<User>{
  return this.http.post<User>(`${this.url}/add`,user)
 }

 deleteUser(id:Number){
  return this.http.delete(`${this.url}/delete`+'/'+id)
 }

 updateUser(idr:Number,u:any): Observable<any>{
  return this.http.put<User>(`${this.url}/update`+'/'+idr,u);
 }

 getUserById(id:Number) : Observable<User[]>{
  return this.http.get<User[]>(`${this.url}/getById`+'/'+id);
    
 }

}
