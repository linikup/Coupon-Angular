import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminserviceService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-getonecompany',
  templateUrl: './getonecompany.component.html',
  styleUrls: ['./getonecompany.component.css']
})
export class GetonecompanyComponent implements OnInit {

  public id:number;
  public company:Company;

  constructor(private admin:AdminserviceService,private activateRoute:ActivatedRoute, private router:Router) {
   }

  public idFormControl = new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]);

  ngOnInit(): void {
    this.getOneCompany();
  }

  public getOneCompany(){
   let currId:number =  Number(this.activateRoute.snapshot.paramMap.get('id'));
    console.log(currId+" $$$$$$$$$$$$$$");
    
   
    this.company = null;
     this.admin.getOneCompany(currId).subscribe(
     (com)=>{
      console.log(com);
       this.company = com;
      
      console.log(this.company);
      
     },(err)=>{
       console.dir(err);
       alert("Error " + err.error);
     })


  }

  goBack(){
    this.router.navigate(['/admin/getAllCompanies'])
  }



  

}
