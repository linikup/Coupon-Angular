import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AdminserviceService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-getonecustomer',
  templateUrl: './getonecustomer.component.html',
  styleUrls: ['./getonecustomer.component.css']
})
export class GetonecustomerComponent implements OnInit {

  public id:number;
  public customer:Customer;

  public idFormControl = new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]);

  constructor(private admin:AdminserviceService,private activateRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getOneCustomer();
  }

  public getOneCustomer(){
    let currId:number =  Number(this.activateRoute.snapshot.paramMap.get('id'));


    // this.id = this.idFormControl.value;

    this.customer = null;
    
    this.admin.getOneCustomer(currId).subscribe(
      (cust)=>{
         this.customer = cust;
         console.log(cust);
         
      },(err)=>{

        alert("Error " + err.error);

      })

  }
  goBack(){
    this.router.navigate(['/admin/getAllCustomers'])
  }

}
