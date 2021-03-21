import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyserviceService } from 'src/app/services/company.service';

@Component({
  selector: 'app-getallcompanycoupo',
  templateUrl: './getallcompanycoupo.component.html',
  styleUrls: ['./getallcompanycoupo.component.css']
})
export class GetallcompanycoupoComponent implements OnInit {

  public coupons:Coupon[];
  public couponId: number;


  constructor(private company:CompanyserviceService, private router:Router) { 
    this.getAllCompanyCoupons();

  }

  ngOnInit(): void {
    this.getAllCompanyCoupons();

  }

  public getAllCompanyCoupons(){

    this.coupons = null;

    this.company.getCompaniesCoupons().subscribe(
      (coup)=>{
        this.coupons = coup;
      },(err)=>{

        alert("Error " + err.error);
        this.coupons = [];
      })


  }

  public deleteCoupon(id:number){
      
    console.log(id);

    if (confirm('Are you sure you want to delete this coupon?')) {
      // Save it!
      this.company.deleteCoupon(id).subscribe(
        (com)=>{
          alert("coupon with id: " +id+ " was deleted" )
          console.log(com);
          this.ngOnInit();
          
        },(err)=>{
          alert("Error " + err.error)
        });      console.log('Deleted');
    } else {
      // Do nothing!
      console.log('Nothing happend.');
    }

     

  }
  editCoupon(id:number){
    this.couponId=id;
    this.router.navigate(['/company/updateCoupon/'+id]);
  }


}
