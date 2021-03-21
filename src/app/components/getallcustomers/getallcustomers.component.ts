import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AdminserviceService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-getallcustomers',
  templateUrl: './getallcustomers.component.html',
  styleUrls: ['./getallcustomers.component.css']
})
export class GetallcustomersComponent implements OnInit {
public customer:Customer;
 customers:Customer[];
 public customerId: number;


  constructor(private admin:AdminserviceService, private router:Router) {
    this.getAllCustomers();
   }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  public getAllCustomers(){

    this.customers = null;


  this.admin.getAllCustomers().subscribe(
    (cust)=>{
      
    this.customers = cust;

   
    },(err)=>{
      if(this.customers!=null){

        alert("Error " + err.error);
        this.customers= [];
      }
    })
  }

  
    public deleteCustomer(id:number){
      
      console.log(id);
  
      if (confirm('Are you sure you want to delete customer?')) {
        // Save it!
        this.admin.deleteCustomer(id).subscribe(
          (com)=>{
            alert("customer with id: " +id+ " was deleted" )
            console.log(com);
            this.ngOnInit();
            
          },(err)=>{
            alert("Error " + err.message)
          });      console.log('Deleted');
  
      } else {
        // Do nothing!
        console.log('Nothing happend.');
      }
  
       
  
    }
    move(id:number){
      this.customerId=id;
      this.router.navigate(['/admin/getOneCustomer/'+id]);
    }

    editCust(id:number){
      this.customerId=id;
      this.router.navigate(['/admin/updateCustomer/'+id]);
    }

  }


