import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    if(form.form.invalid) {
      return;
    }

    // const enteredEmail = form.form.value.email; this is the alternative to the two binding
    const enteredEmail = form.form.value.email;
    const enteredPasswrod = form.form.value.password;
    console.log(form);
    console.log(form.form.value);// get the values
    console.log("email: ", enteredEmail);
    console.log("enteredPassword: ", enteredPasswrod);
    form.reset();
  }
}
