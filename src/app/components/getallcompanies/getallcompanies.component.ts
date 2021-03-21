import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminserviceService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-getallcompanies',
  templateUrl: './getallcompanies.component.html',
  styleUrls: ['./getallcompanies.component.css']
})
export class GetallcompaniesComponent implements OnInit {

  public companies: Company[];
  public company: Company;
  public companyId: number;
  public companyName: string;
  
  constructor(private admin:AdminserviceService, private router:Router) { 
    this.getAllCompanies();
  }

  ngOnInit(): void {
    this.getAllCompanies();

  }

  public getAllCompanies() {

    this.companies = null;

    this.admin.getAllCompanies().subscribe(
      (companies) => {
      this.companies = companies;


    }, (err) => {
      if(this.companies!=null){
        alert("Error " + err.error);
        this.companies = [];
      }
    });
  }

  public deleteCompany(id:number){
    
    console.log(id);

    if (confirm('Are you sure you want to delete company?')) {
      // Save it!
      this.admin.deleteCompany(id).subscribe(
        (com)=>{
          alert("company with id: " +id+ " was deleted" )
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

  move(id:number){
    this.companyId=id;
    this.router.navigate(['/admin/getOneCompany/'+id]);
  }

  editComp(id:number, name:string){
    this.companyId=id;
    this.companyName=name;
    this.router.navigate(['/admin/updateCompany/'+id+'/'+name]);
  }

}