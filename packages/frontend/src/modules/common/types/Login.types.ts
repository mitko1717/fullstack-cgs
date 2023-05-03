export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  email: string;
  password: string;
}

export type IInitialValues = {
  email: string;
  password: string;
  confirmPassword: string;
};
