import { SignUpData } from './types';
import { validateSignUp } from './validators';
import { mockSignUp } from './mockBackend';

const form = document.getElementById('signup-form') as HTMLFormElement;
const errorDiv = document.getElementById('signup-errors')!;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorDiv.innerHTML = '';

  const data: SignUpData = {
    fullName: (form.fullName as HTMLInputElement).value,
    email: (form.email as HTMLInputElement).value,
    password: (form.password as HTMLInputElement).value,
    confirmPassword: (form.confirmPassword as HTMLInputElement).value,
  };

  const errors = validateSignUp(data);
  if (Object.keys(errors).length) {
    for (const key in errors) {
      const p = document.createElement('p');
      p.className = 'error';
      p.innerText = errors[key];
      errorDiv.appendChild(p);
    }
    return;
  }
   try {
    await mockSignUp(data.email, data.password);
    alert('Sign Up Successful!');
    form.reset();
  } catch (err) {
    const p = document.createElement('p');
    p.className = 'error';
    p.innerText = err as string;
    errorDiv.appendChild(p);
  }
});
console.log("Signup script loaded");