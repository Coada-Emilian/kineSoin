import { IInsurance } from './IInsurance';

export interface IPatient {
  id: number;
  therapist_id: number;
  name: string;
  birth_name: string;
  surname: string;
  fullName?: string;
  gender: string;
  birth_date: string;
  age?: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  email: string;
  password: string;
  therapist?: string;
  status: string;
  picture_url: string;
  picture_id: string;
  insurance?: IInsurance[];
}
