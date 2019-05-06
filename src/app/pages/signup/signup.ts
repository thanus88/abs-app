import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

//import { UserData } from '../../providers/user-data';
import { AuthenService } from '../../providers/AuthenService';
import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPage {
  signup: any = {};
  submitted = false;

  constructor(
    public router: Router,
    public AuthenService: AuthenService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    console.log(this.signup);
    if (form.valid) {
      this.AuthenService.save(this.signup).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
        },
        err => {
            console.error(err);
        }
      );
      
    }
  }
}
