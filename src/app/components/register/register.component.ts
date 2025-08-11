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

  constructor(private authService: AuthService, private router: Router){}

  onRegister(){
    const userData = {email: this.email, password: this.password};

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user', error);
        alert('Registration failed: ' + error.message);
      }
    });
  }

}
