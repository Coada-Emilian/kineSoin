export interface IMedic {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  phone_number: string;
  licence_code: string;
}
