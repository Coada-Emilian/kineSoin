/**
 * @description Interface for representing a new address.
 *
 * This interface:
 * - Defines the structure of a new address object.
 * - Contains the following optional properties:
 *   - full_address: A string representing the full address.
 *   - street_number: A string representing the street number.
 *   - street_name: A string representing the street name.
 *   - postal_code: A string representing the postal code.
 *   - city: A string representing the city.
 *
 * Example usage:
 * const newAddress: INewAddress = {
 *   full_address: '123 Main St, Anytown, 12345',
 *   street_number: '123',
 *   street_name: 'Main St',
 *   postal_code: '12345',
 *   city: 'Anytown',
 * };
 */

export interface INewAddress {
  full_address?: string;
  street_number?: string;
  street_name?: string;
  postal_code?: string;
  city?: string;
}
