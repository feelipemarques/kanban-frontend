import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(){
    const userData = {email: this.email, password: this.password};

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        
      },
      error: (error) => {
        console.error('Error registering user', error);
        alert('Registration failed: ' + error.message);
      }
    }); 
  }

  logIn(){
    const userData = {email: this.email, password: this.password};
    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('User logged in successfully', response);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/kanban']);
      },
      error: (error) => {
        console.error('Error logging in user', error);
        alert('Login failed: ' + error.message);
      }
    });
  }

}
