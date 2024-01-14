import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: any;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const apiUrl = 'https://checkluxury.ddns.net:443/login';
      const credentials = { username: username, password: password };
      const base64Credentials = btoa(`${credentials.username}:${credentials.password}`);

      const headers = new Headers({
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(credentials),
      };

      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            this.error = 'Invalid Username or password!';
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            this.router.navigate(['/dashboard']);
            console.log('Login successful');
          }
          return response.json();
        })
    }
  }
}
