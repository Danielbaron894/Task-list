import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: TodoInputComponent }
];
  




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }