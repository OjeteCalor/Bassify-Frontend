import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,
			FormsModule
  ],
})
export class LoginComponent {

	username: string = '';
	password: string = '';

	onSubmit() {
		// Implement your login logic here
		console.log('Username:', this.username);
		console.log('Password:', this.password);
		// Add authentication logic and navigate to the next page upon successful login
	}

}
