import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title = 'todo1';
  constructor(private _taskService: TasksService) {}


 

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [];
  allCustomers = [];

  ngOnInit(): void {
    this._taskService.getCustomers().subscribe({
      next: (customers) => {
        this.allCustomers = customers;
        console.log('Customers loaded:', this.allCustomers);
      }
    });

    this._taskService.getTasks().subscribe({
      next: (tasks) => {
        this.allItems = tasks;
      }
    }); 
  }

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ? item.isDone : !item.isDone);
  }

  removeTask(_id, index) {
    this.allItems.splice(index, 1);

    this._taskService.deleteTask(_id).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  toggleIsDone(_id: string, i: number) {
    console.log('Toggle function called');
    const task = this.allItems[i];
    console.log('Task:', task);
    const updatedIsDone = !task.isDone;

    this._taskService.updateTaskDone(task._id, updatedIsDone).subscribe({
      next: () => {
        task.isDone = updatedIsDone;
        console.log('Updated task:', task);
      },
      error: (err) => {
        console.error("Error updating task:", err);
      }
    });
  }

  editItem(i: number) {
    this.allItems[i].isEditing = true;
  }

  cancelEdit(item: any) {
    item.isEditing = false;
  }

  saveItem(_id: string, i: number, editedItem: string, item: any) {
    this._taskService.updateTaskTitle(_id, editedItem).subscribe({
      next: (updatedTask) => {
        item.title = updatedTask.title;
        console.log('Updated task:', item);
        this._taskService.getTasks().subscribe({
          next: (tasks) => {
            this.allItems = tasks;
          },
          error: (err) => {
            console.error("Error fetching updated tasks:", err);
          }
        });
      },
      error: (err) => {
        console.error("Error updating task title:", err);
      }
    });
    item.isEditing = false;
  }

  getCustomerName(customerId: string): string {
    const customer = this.allCustomers.find(customer => customer._id === customerId);
    return customer ? customer.name : 'Unknown';
  }

  getCustomerOccupation(customerId: string): string {
    const customer = this.allCustomers.find(customer => customer._id === customerId);
    console.log('Found customer:', customer);
    return customer ? customer.occupation : 'Unknown';
  }

  getCustomerEmail(customerId: string): string {
    const customer = this.allCustomers.find(customer => customer._id === customerId);
    return customer ? customer.email : 'Unknown';
  }

  getCustomerPhone(customerId: string): string {
    const customer = this.allCustomers.find(customer => customer._id === customerId);
    return customer ? customer.phone : 'Unknown';
  }


  
  trackByFn(index: number, item: any) {
    return item._id;
  }
}


