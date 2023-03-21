import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  username: string = ''
  password: string = ''
  constructor(private AuthService: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.first_name)
    console.log(this.last_name)
    console.log(this.email)
    console.log(this.username)
    console.log(this.password)
  }
}
