/**
 * @description Interface for representing an affliction.
 *
 * This interface:
 * - Defines the structure of an affliction object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the affliction.
 *   - admin_id: A number representing the unique identifier of the administrator who created the affliction.
 *   - body_region_id: A number representing the unique identifier of the body region associated with the affliction.
 *   - name: A string representing the name of the affliction.
 *   - description: A string representing the description of the affliction.
 *   - insurance_code: A string representing the insurance code associated with the affliction.
 *   - is_operated: A boolean indicating whether the affliction has been operated on.
 *   - body_region (optional): An object of type IBodyRegion representing the body region associated with the affliction.
 *
 * Example usage:
 * const affliction: IAffliction = {
 *   id: 1,
 *   admin_id: 100,
 *   body_region_id: 200,
 *   name: 'Knee Injury',
 *   description: 'A description of the knee injury.',
 *   insurance_code: 'INS123456',
 *   is_operated: true,
 *   body_region: {
 *     id: 200,
 *     admin_id: 100,
 *     name: 'Knee',
 *     description: 'The knee region.',
 *   },
 * };
 */

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
