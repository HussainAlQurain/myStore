import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor() {}

  ngOnInit(){
    
  }

  login(){
    this.isLoggedIn = !this.isLoggedIn
    alert('logged in')
  }
  logout(){
    this.isLoggedIn = !this.isLoggedIn
    alert('logged out')
  }

}
