import {SharedService} from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  EmployeeList: any=[];
  ModalTitle:string;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  ngOnInit(): void { 
    this.refreshEmpList();
  }
  addClick(){
  this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
  }
     this.ModalTitle="Add Employee";
     this.ActivateAddEditEmpComp=true;
  }

  closeClick(){

  this.ActivateAddEditEmpComp=false;
  this.refreshEmpList();

  }
  deleteClick(item){
     if(confirm('Are you sure??')){
       this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
         alert(data.toString());
         this.refreshEmpList();
       })

     }

  }
  editClick(item){
   this.emp=item;
   this.ActivateAddEditEmpComp=true;
   this.ModalTitle="Edit Employee"

  }

  refreshEmpList(){

    this.service.getEmpList().subscribe(data=>{this.EmployeeList=data});
  }

}

