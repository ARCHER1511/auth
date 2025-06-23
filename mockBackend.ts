const users: Record<string, string> = {};

export async function mockSignUp(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[email]) return reject('Email already exists.');
      users[email] = password;
      resolve();
    }, 500);
  });
}

export async function mockSignIn(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!users[email] || users[email] !== password) return reject('Invalid email or password.');
      resolve();
    }, 500);
  });
}