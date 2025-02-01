import { IPatient_Insurance } from './IPatient_Insurance';

export interface IInsurance {
  id: number;
  admin_id: number;
  name: string;
  amc_code: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  Patient_Insurance?: IPatient_Insurance;
}
