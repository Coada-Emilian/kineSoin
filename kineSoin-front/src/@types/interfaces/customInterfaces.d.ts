export interface IDeleteModalActiveEntity {
  entityType: string;
  full_name?: string | undefined;
  name?: string | undefined;
  id: number;
}

export interface IAdminEditedEntity {
  id?: number | null;

  name?: string;
  surname?: string;
  age?: string;
  gender?: string;

  email?: string;
  status?: string;

  prefix?: string;
  phone_number?: string;

  licence_code?: string;
  diploma?: string;
  amc_code?: string;

  specialty?: string;
  experience?: string;
  description?: string;

  street_number?: string;
  street_name?: string;
  city?: string;
  postal_code?: string;

  insurance_code?: string;
  is_operated?: boolean;

  picture_url?: string;
}
