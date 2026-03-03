import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  /**
   * signal
   */
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  
  constructor() {
    /**
     * Once this component has been rendered for the 1st time
     */
    afterNextRender( () => {
      /**
       * Every change in the form
       */
      const subscription = this.form().valueChanges?.subscribe({
        next: (value) => console.log(value)
      });

      this.destroyRef.onDestroy(()=> subscription?.unsubscribe());
    });
  }

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
    form.form.reset();
  }
}
