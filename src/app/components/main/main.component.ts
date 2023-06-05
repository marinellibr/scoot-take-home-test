import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
    this.createMock();
  }


  createMock(){
    for (let i = 0; i < Math.floor(Math.random() * 11) + 10; i++) {
      const description = `Task ${i + 1}`;
      const dueDate = new Date(Date.now() + Math.floor(Math.random() * 86400000)); // Random date within next 24 hours
      const priority = this.getRandomPriority();
    
      this.fakeData.push({ description, dueDate, priority });
      this.filteredList = this.fakeData;
    }
  }


  fakeData: Task[] = [];
  filteredList: Task[] = [];
  priorities = ["Low", "Medium", "High"];
  filterValue: string = "";

  getRandomPriority() {
    return this.priorities[Math.floor(Math.random() * this.priorities.length)];
  }

  filterByDesc(reset?: boolean){
    if(reset){
      this.filterValue = "";
      this.filteredList = this.fakeData;
    }
    this.filteredList = [];
    this.fakeData.filter(task => {
      task.description.toLowerCase().includes(this.filterValue.toLowerCase()) ? this.filteredList.push(task) : null;
    })
  }

  prioFilter: string = '';

  filterByPrio(prio: string){
    if(this.prioFilter == prio){
      this.prioFilter = '';
      this.filteredList = this.fakeData;
    } else {
      this.prioFilter = prio;
      this.filteredList = [];
      this.fakeData.filter(task => {
        task.priority.includes(prio) ? this.filteredList.push(task) : null;
      })
    }
  }

}
