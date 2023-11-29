import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  constructor(private _taskService: TasksService) {}

  allItems = [];
  allCustomers = [];

  ngOnInit(): void {
    this._taskService.getCustomers().subscribe({
      next: (customers) => {
        this.allCustomers = customers;
        console.log('Customers loaded:', this.allCustomers);
      }
    });
  }

  addTask(title, date, customerId) {
    const parsedDate = date ? new Date(date) : null;

    this._taskService.addTask(title, parsedDate, customerId).subscribe({
      next: (res) => {
        console.log(res);
        this.allItems.push({
          title,
          isDone: false, 
          date: parsedDate,
          customerId
        });
      }
    });
  }
}
