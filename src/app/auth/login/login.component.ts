import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestpayload } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestpayload;
  registerSuccessMessage!: string;
  isError!: boolean;


  constructor(private authService: AuthService, 
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService, 
    private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),      
    });
    this.activatedRouter.queryParams
    .subscribe(params => {
      if(params.registered !== undefined && params.registered === 'true'){
        this.toastr.success('Sign up successful');
        this.registerSuccessMessage = 'Please check your email to activate your account, before you login!';
      }

    }

    )
    
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    // take this.loginRequestPayload as RequestBody pass into the back end and receive the response
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      // console.log('login successful');
      // if something comes back as data, then it is successful
      if (data){
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('login successful!')
      } else {
        this.isError = true;
      }
    });

  }


}
