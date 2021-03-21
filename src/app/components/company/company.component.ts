import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyserviceService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private company:CompanyserviceService, private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['/company/getAllCompanyCoupons']);
  }
  logout(){
    this.company.logOut(localStorage.getItem('token')).subscribe(
      (token)=>{
        this.router.navigate(['login']); 
  
      },(err)=>{
        alert("Error " + err.error);
        this.router.navigate(['login']); 

  
      });
  
    }

}
