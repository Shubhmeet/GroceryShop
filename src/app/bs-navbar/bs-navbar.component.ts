import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(public auth: AuthService) {
    auth.appUser$.subscribe( appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}