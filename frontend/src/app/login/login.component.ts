import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.errorMessage = null;

    this.authService.login(this.user.name, this.user.password).subscribe(
      res => {
        if ( typeof localStorage ) {
          localStorage.setItem('token', res.token);
        }
        this.router.navigate(['/dashboard']);
      },
      res => this.errorMessage = res.error.message
    );
  }

}
