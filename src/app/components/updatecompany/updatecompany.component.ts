import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminserviceService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-updatecompany',
  templateUrl: './updatecompany.component.html',
  styleUrls: ['./updatecompany.component.css']
})
export class UpdatecompanyComponent implements OnInit {

  public company:Company =  new Company();
  
  
 
  public emailFormControl = new FormControl('',[Validators.required,Validators.maxLength(30), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._%+-]+.[a-z]{2,4}$')]);
  public passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]);

  public formGroup = new FormGroup({
  
    email: this.emailFormControl,
    password: this.passwordFormControl
  });



  constructor(private admin:AdminserviceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  public updateCompany(){

    let currId: number = Number(this.activateRoute.snapshot.paramMap.get('id'));
    let currName: string = String(this.activateRoute.snapshot.paramMap.get('name'));
    console.log(currId);
    console.log(currName);
    
    this.company.id = currId;
    this.company.name = currName;
    this.company.email = this.emailFormControl.value;
    this.company.password = this.passwordFormControl.value;
    console.log(this.company);

    this.admin.updateCompany(this.company).subscribe(
      (c) => {

        console.log(c);
        alert("The company was updated");
        this.router.navigate(['admin/getAllCompanies'])
        

      },(err)=>{

        alert("Error " + err.error);

      })


  }
  goBack(){
    this.router.navigate(['/admin/getAllCompanies'])
  }

}
