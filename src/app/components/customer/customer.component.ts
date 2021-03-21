import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerserviceService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customer:CustomerserviceService, private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['/customer/purchaseCoupon']);

  }

  logout(){
    this.customer.logOut(localStorage.getItem('token')).subscribe(
      (token)=>{
        this.router.navigate(['login']); 

      },(err)=>{
        alert("Error " + err.error);
        this.router.navigate(['login']); 

  
      });
  
    }
}
