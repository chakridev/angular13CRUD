import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formdata = {email:"",password:""};

  public loading = false;

  submit = false;

  public errormessage = "";

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){


    this.loading = true;

    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log('Registered Token id is'+data.idToken);
        this.auth.canAuthenticate();


      },
      error:data=>{
        if (data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
          this.errormessage = "Invalid Credentials";
        }
        else {
          this.errormessage = "Unknown error occur while login this account"
        }

      }
    }).add(()=>{
      this.loading = false;
      console.log("Login Successfully registered");


    }
    )
  }

}
