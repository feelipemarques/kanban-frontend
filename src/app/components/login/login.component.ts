import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  

  logIn(){
    const userData = {email: this.email, password: this.password};
    this.authService.login(userData).subscribe({
      next: (response: any) => {
        console.log('User logged in successfully', response);

        if(response && response.token) {
          console.log('Token received:', response.token);
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', this.email);
          this.router.navigate(['/kanban']);
        }
        else {
          console.error('No token received in response');
          alert('Login failed: No token received');
        }
      },
      error: (error) => {
        console.error('Error logging in user', error);
        alert('Login failed: ' + error.message);
      }
    });
  }

}
