import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';

export const routes: Routes = [
    {path:'',component: UsersListComponent},
    {path:'updateUser/:id',component: UpdateUsersComponent},
    {path:'addUser',component: AddUsersComponent},
    {path:'parent',component: ParentComponentComponent},



];
