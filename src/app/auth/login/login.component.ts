import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        // this.form().controls['email'].setValue(savedEmail);
        setTimeout(() => {
          this.form().setValue({
            email: savedEmail,
            password: ''
          });

        }, 1);
      }

      /**
       * Every change in the form
       */
      const subscription = this.form().valueChanges?.
        /**
         * Will trigger subscribe only after the form is not changed
         * for certain amount of time(500ms in this case)
         */
        pipe(debounceTime(500)).
        subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            );
            console.log(value);

          }
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(form: NgForm) {
    if (form.form.invalid) {
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
