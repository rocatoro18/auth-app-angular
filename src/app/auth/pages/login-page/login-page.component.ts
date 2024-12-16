import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email : ['roberto@google.com',[Validators.required, Validators.email]],
    password: ['1234567',[Validators.required, Validators.minLength(6)]]
  });

  login(){

    const {email, password} = this.myForm.value;

    this.authService.login(email,password)
      .subscribe(//success => {
        {
        //console.log({success});
        next: () => console.log('Todo bien!'),
        error: (message) => {
          Swal.fire('Error',message,'error')
          //console.log({loginError: error});
        }
      });
    //console.log(this.myForm.value);
  }

}
