import { SignInData } from './types';
import { validateSignIn } from './validators';
import { mockSignIn } from './mockBackend';

const form = document.getElementById('signin-form') as HTMLFormElement;
const errorDiv = document.getElementById('signin-errors')!;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorDiv.innerHTML = '';

  const data: SignInData = {
    email: (form.email as HTMLInputElement).value,
    password: (form.password as HTMLInputElement).value,
  };

  const errors = validateSignIn(data);
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
    await mockSignIn(data.email, data.password);
    alert('Sign In Successful! Redirecting...');
    form.reset();
  } catch (err) {
    const p = document.createElement('p');
    p.className = 'error';
    p.innerText = err as string;
    errorDiv.appendChild(p);
  }
});
