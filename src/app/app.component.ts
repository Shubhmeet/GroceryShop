import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        /*redirection should be only for the first time when they return from login from google,
        * so remove the returnurl from storage*/
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
        }
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
