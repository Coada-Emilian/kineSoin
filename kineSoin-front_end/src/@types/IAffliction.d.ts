import { IBodyRegion } from './IBodyRegion';

export interface IAffliction {
  id: number;
  admin_id: number;
  body_region_id: number;
  name: string;
  description: string;
  insurance_code: string;
  is_operated: boolean;
  body_region?: IBodyRegion;
}
