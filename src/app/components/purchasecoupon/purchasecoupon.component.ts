import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/enums/category';
import { Coupon } from 'src/app/models/coupon';
import { CustomerserviceService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-purchasecoupon',
  templateUrl: './purchasecoupon.component.html',
  styleUrls: ['./purchasecoupon.component.css']
})
export class PurchasecouponComponent implements OnInit {
  public coupon: Coupon = new Coupon();
  public couponim:Coupon[];
  public couponId: Number;


  constructor(private customer:CustomerserviceService ) { }

  ngOnInit(): void {
    this.getAll();
  }

  public purchaseCoupon(id:number,category:Category,title:string,description:string,startDate:Date,endDate:Date,amount:number,price:number,image:string){
    this.coupon.id = id;
    this.coupon.category = category
    this.coupon.title = title
    this.coupon.description =description
    this.coupon.startDate = startDate
    this.coupon.endDate = endDate
    this.coupon.amount = amount;
    this.coupon.price = price;
    this.coupon.image = image;
    console.log(this.coupon);

    this.customer.purchaseCoupon(this.coupon).subscribe(
      (coup)=>{
        alert(" thanks for buying the coupon " + this.coupon.title)
        console.log(coup);
        
      },(err)=>{
        alert("Error " + err.error);
       
      });

  }

  public getAll(){

    this.couponim = null;

this.customer.getAllCoupons().subscribe(
  (c)=>{

    this.couponim = c ;

  },(err)=>{
    alert("Error " + err.error);

        

  })

  }

  


  


}
