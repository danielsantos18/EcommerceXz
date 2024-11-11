export interface User {
  id?: number;
  name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email: string;
  password?: string; // El password solo será necesario en el login
}
