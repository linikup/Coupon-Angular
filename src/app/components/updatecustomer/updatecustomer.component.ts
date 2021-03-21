import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AdminserviceService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {

  customer:Customer = new Customer();
  
  
  public nameFormControl = new FormControl('',[Validators.required,Validators.pattern('^[A-Z].*$'),Validators.maxLength(15)]);
  public lastNameFormControl = new FormControl('',[Validators.required,Validators.pattern('^[A-Z].*$'),Validators.maxLength(15)]);
  public emailFormControl = new FormControl('',[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._%+-]+.[a-z]{2,4}$')]);
  public passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]);

  public formGroup = new FormGroup({
   
    name:this.nameFormControl,
    lastName:this.lastNameFormControl,
    email:this.emailFormControl,
    password:this.passwordFormControl
  });

  constructor(private admin:AdminserviceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  public updateCustomer(){
    let currId: number = Number(this.activateRoute.snapshot.paramMap.get('id'));

    this.customer.id = currId
    this.customer.firstName = this.nameFormControl.value;
    this.customer.lastName = this.lastNameFormControl.value;
    this.customer.email = this.emailFormControl.value;
    this.customer.password = this.passwordFormControl.value;
    console.log(this.customer);
    

    this.admin.updateCustomer(this.customer).subscribe(
      (custo)=>{
      console.log(custo);
      alert("customer " + this.customer.firstName + " was updated");
      this.router.navigate(['admin/getAllCustomers'])

      
      },(err)=>{
        
        alert("Error " + err.error);
              
      })



  }

  goBack(){
    this.router.navigate(['/admin/getAllCustomers'])
  }

}
