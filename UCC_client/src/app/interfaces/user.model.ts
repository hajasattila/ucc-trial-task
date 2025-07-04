export interface User {
  id: number;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: {
    id: number;
    name: string;
    type: string;
  };
}

export interface LoginDto {
  identifier: string;
  password: string;
}

export interface PasswordResetRequestDto {
  email: string;
}

export interface PasswordResetDto {
  code: string;
  password: string;
  passwordConfirmation: string;
}
