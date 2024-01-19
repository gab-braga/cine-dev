export interface User {
  uuid?: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  password?: string;
  phoneNumber?: string;
  profilePicture?: string;
  active?: boolean;
  confirmed?: boolean;
  createdAt?: Date;
}
