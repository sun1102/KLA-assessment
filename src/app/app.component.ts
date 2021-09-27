import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assessment';
  form: any;
  btnName = 'Add';
  direction: String = 'asc';
  tableArr: Array<any> = [];

  status = [{ name: 'new', id: 1 }, { name: 'in progress', id: 2 }, { name: 'complete', id: 3 }]
  // 
  task = {
    message: String,
    status: {
      statusName: String,
      stId: Number
    }
  }
  tasks: Array<any> = [];
  filtertasks: any[] | undefined;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      message: [''],
      status: ['']
    });
  }

  addNewTask() {
    console.log('add new status', this.form.value);
    console.log(this.tasks);

    // for the POC - making message as unique
    if (this.checkUnique() > -1) {
      return;
    }

    this.form.value.id++;
    this.tasks.push(this.form.value);
    this.filtertasks = [...this.tasks];
  }

  checkUnique() {
    const ind = this.tasks.findIndex(task => task.message === this.form.value.message);
    return ind;
  }

  editTask(task: any) {
    console.log('lets edit the task');
    this.form.controls.message.setValue('hiii');// = 'hiii';
    this.form.controls.status.setValue('2');// = 'hiii';
    this.setBtnName('Edit');
  }

  deleteTask(task: any) {
    console.log('delete task');
    // 1 method
    //  this.tasks = this.tasks.filter( val => val.message !== task.message);

    //2 splice from the array
    const index = this.tasks.findIndex(val => val.message === task.message);
    this.tasks.splice(index, 1);
  }

  onSubmit() {
    this.addNewTask();
    this.onReset();
  }

  getTasks() {
    return this.tasks;
  }

  onSort() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    if(this.direction === 'asc') {
      this.tasks = this.tasks.sort((a,b) => a.status - b.status);
    } else {
      this.tasks = this.tasks.sort((a,b) => b.status - a.status);

    }
  }

  setBtnName(value: string) {
    this.btnName = value;
  }

  onFilter(id: any) {
    console.log(id);
    this.filtertasks = (id !== 0) ? this.tasks.filter(task => task.status == id) :[... this.tasks];
  }

  onReset() {
    this.form.reset();
  }

}


// shared serv= Task$

// comp1 - changing the DataTransfer .next({tas$})
// comp2- > subscruiot - task$
