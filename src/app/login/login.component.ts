import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ''
  password: string = ''

  constructor(private userService: AuthService){

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe(data => {
      alert(data);
    })
  }

}
