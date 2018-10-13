import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Object = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.http.post<any>('http://localhost:8000/api/login', this.credentials)
      .subscribe(data => {
        const token = data.token
        window.localStorage.setItem('token', token)
        this.router.navigate(['categories/list'])
      })
    return false
  }

}
