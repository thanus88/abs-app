import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenService } from '../../providers/AuthenService';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: any = {
    
  };
  submitted = false;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public userData: UserData,
    public router: Router,
    public AuthenService:AuthenService,
    public events: Events,
    public storage: Storage
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    console.log('onLogin..');
    if (form.valid) {
      this.AuthenService.login(this.login).subscribe(
          res => {
            const email: string = this.login.email;
            this.userData.login(email);
            this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
          },
          err => { // NOT_FOUND Exception.
              console.error(err);
              this.router.navigateByUrl('/signup');
          }
        );
      }
    }

  onSignup() {  //  Re Direct TO Signup page.
    this.router.navigateByUrl('/signup');
  }
}
