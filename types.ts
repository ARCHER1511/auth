export type SignUpData ={
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignInData ={
  email: string;
  password: string;
}

export type ValidationErrors = {
  [key: string]: string;
}