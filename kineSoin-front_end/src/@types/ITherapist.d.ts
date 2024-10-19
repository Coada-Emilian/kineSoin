export interface ITherapist {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  description: string;
  diploma: string;
  experience: string;
  speciality: string;
  email: string;
  password: string;
  picture_url: string;
  picture_id: string;
  licence_code: string;
  status: string;
}
