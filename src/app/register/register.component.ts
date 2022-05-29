import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formdata = {name:"",email:"",password:""};

  submit = false;

  errormessage = "";

  loading = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){


    this.loading = true;


    //data to api//
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log('Registered Token id is'+data.idToken);
        this.auth.canAuthenticate();

      },
      error:data=>{
        if (data.error.error.message=="INVALID_EMAIL"){
          this.errormessage = "Invalid Email";
        }else if (data.error.error.message=="EMAIL_EXISTS"){
          this.errormessage = "Email Already Exits";
        }
        else {
          this.errormessage = "Unknown error occur while creating this account"
        }

      }
    }).add(()=>{
      this.loading = false;
      console.log("User Successfully registered");

    }
    )



  }

}


