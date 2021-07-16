import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload!: SignupRequestPayload;
  signupForm!: FormGroup;
  
  constructor(private authService: AuthService,private toastr: ToastrService, private router: Router) {
    this.signupRequestPayload = {
      username:'',
      email:'',
      password:''
    };
   }
 


ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)
    });
  }

  signup(){
    // get all the info that the user fill in the form and make a signupRequestPayload object
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    // pass this signupRequestPayload object to the backend "http//localhost:8080/api/auth/signup", and get the response as text.

    // if the router navigate to login page it means it is successfully registered.
    this.authService.signup(this.signupRequestPayload).subscribe(() => {
        this.router.navigate(['/login'], {queryParams:{registered: 'true'}});
    },
    // else, pop up a toastr show that registration fail
    () => {
      this.toastr.error('Registration Failed!');

    });
  }









}
