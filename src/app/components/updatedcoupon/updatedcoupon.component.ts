import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyserviceService } from 'src/app/services/company.service';

@Component({
  selector: 'app-updatedcoupon',
  templateUrl: './updatedcoupon.component.html',
  styleUrls: ['./updatedcoupon.component.css']
})
export class UpdatedcouponComponent implements OnInit {

  public coupon: Coupon = new Coupon();


 
  public cateFormControl = new FormControl('', [Validators.required]);
  public titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  public descriptionFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  public startDateFormControl = new FormControl('', [Validators.required]);
  public endDateFormControl = new FormControl('', [Validators.required]);
  public amountFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]);
  public priceFormControl = new FormControl('', [Validators.required, Validators.min(0.1)]);
  public imageFormControl = new FormControl('', [Validators.required]);

  public formGroup = new FormGroup({

    
    cate: this.cateFormControl,
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    startDate: this.startDateFormControl,
    endDate: this.endDateFormControl,
    amount: this.amountFormControl,
    price: this.priceFormControl,
    image: this.imageFormControl
  });

  constructor(private company: CompanyserviceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  public updateCoupon() {

    let currId: number = Number(this.activateRoute.snapshot.paramMap.get('id'));

    this.coupon.id = currId;
    this.coupon.category = this.cateFormControl.value;
    this.coupon.title = this.titleFormControl.value;
    this.coupon.description = this.descriptionFormControl.value;
    this.coupon.startDate = this.startDateFormControl.value;
    this.coupon.endDate = this.endDateFormControl.value;
    this.coupon.amount = this.amountFormControl.value;
    this.coupon.price = this.priceFormControl.value;
    this.coupon.image = this.imageFormControl.value;
    console.log(this.coupon);


    this.company.updateCoupon(this.coupon).subscribe(
      (coup) => {
        alert("coupon updated");
        console.log(coup);
        this.router.navigate(['company/getAllCompanyCoupons'])

      }, (err) => {
        console.dir(err);
       
        alert("Error " + err.error);
      })


  }

  goBack(){
    this.router.navigate(['/company/getAllCompanyCoupons'])
  }


}
