import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn:boolean = false
  constructor(private authService: AuthService) {}

  ngOnInit(){
    
  }

  login(){
    console.log(this.authService.isLoggedIn$)
    if(this.authService.isLoggedIn$){
      this.isLoggedIn = true;
    }
  }
  logout(){
    console.log(this.authService.isLoggedIn$)
    if(!this.authService.isLoggedIn$){
      this.isLoggedIn = false;
    }
  }

}
