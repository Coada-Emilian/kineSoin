export interface IAddForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeated_password: string;
  description: string;
  diploma: string;
  experience: string;
  specialty: string;
  licence_code: string;
  status: string;
  photo: File | unknown;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
}

