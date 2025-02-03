/**
 * @description Interface for representing a body region.
 *
 * This interface:
 * - Defines the structure of a body region object.
 * - Contains the following properties:
 *   - id: A number representing the unique identifier of the body region.
 *   - admin_id: A number representing the unique identifier of the administrator who created the body region.
 *   - name: A string representing the name of the body region.
 *
 * Example usage:
 * const bodyRegion: IBodyRegion = {
 *   id: 1,
 *   admin_id: 101,
 *   name: 'Upper Arm',
 * };
 */

export interface IBodyRegion {
  id: number;
  admin_id: number;
  name: string;
}
