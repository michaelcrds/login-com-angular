import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  public loginForm: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]],
  })

  public errorMsg !: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    alert("email: teste@teste | senha: 123")
  }

  public handleSubmit(){
    if(this.loginForm.valid){
      this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe({
        next: (res) => res,
        error: (error) => this.errorMsg = error
      })
    }
  }
}
