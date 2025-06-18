export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserAdminDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}