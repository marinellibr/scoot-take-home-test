import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
    this.createMock(20);
  }


  createMock(limit: number){
    this.fakeData = [];
    this.filteredList = this.fakeData;
    for (let i = 0; i < limit; i++) {
      const description = this.activities[Math.floor(Math.random() * this.activities.length)];
      const dueDate = new Date(Date.now() + Math.floor(Math.random() * 86400000)); // Random date within next 24 hours
      const priority = this.getRandomPriority();
      const id = i;

      this.fakeData.push({ description, dueDate, priority, id });
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
    this.filterValue = '';
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

  removeItem(id: number){
    this.fakeData.splice(this.fakeData.findIndex(item => item.id === id), 1);
    this.update();
  }

  update(){
    this.filterByDesc(true);
    this.filterByPrio(this.prioFilter);
  }

  activities = [
    "Grocery shopping",
    "Meeting with friends",
    "Going to the gym",
    "Watching a movie",
    "Cooking dinner",
    "Reading a book",
    "Taking a walk",
    "Attending a party",
    "Writing an email",
    "Playing a sport",
    "Visiting a museum",
    "Doing household chores",
    "Learning something new",
    "Working on a project",
    "Listening to music",
    "Planning a trip",
    "Volunteering",
    "Relaxing at home",
    "Exploring a new city",
    "Having a picnic"
  ];

}
