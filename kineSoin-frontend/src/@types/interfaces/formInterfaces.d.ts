export interface IPatientRegistrationFormData {
  name?: string;
  birth_name?: string;
  surname?: string;
  gender?: string;
  birth_date?: string;
  street_number?: string;
  street_name?: string;
  postal_code?: string;
  city?: string;
  prefix?: string;
  phone_number?: string;
  email?: string;
  password?: string;
  picture?: File;
}

export interface IAddTherapistFormData {
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

// export interface IAddAfflictionFormData {
//   name: string;
//   body_region_id: string;
//   insurance_code: string;
//   is_operated: boolean;
//   description: string;
// }
