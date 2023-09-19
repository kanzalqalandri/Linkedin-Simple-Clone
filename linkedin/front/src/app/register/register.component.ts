import { Component } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firstname: string="";
  lastname: string="";
  email: string="";
  password: string="";


  constructor(private router:Router, private http: HttpClient) 
  {
  }
  ngOnInit(): void
  {
  }


  register()
  {
    let bodyData = 
    {
      "firstname" : this.firstname,
      "lastname" : this.lastname,
      "email" : this.email,
      "password" : this.password,
      //http://localhost:9000/routes/user/create
    };
    this.http.post("http://localhost:5001/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("User Registered Successfully");

        this.router.navigate(["login"]);

    });
  }
  save()
  {
    this.register();


    
  }





}
