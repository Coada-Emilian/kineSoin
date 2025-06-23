/**
 * fetchAdminTableDetails
 *
 * A generic, reusable function to fetch data for different admin entities based on the specified entity type.
 * It dynamically selects and calls the appropriate API fetching function for therapists, patients, afflictions, medics, or insurances.
 *
 * This centralizes and simplifies data fetching logic for admin tables, improving maintainability and scalability.
 *
 * @template T - The expected return data type for the fetched entity list.
 * @param {object} params - Function parameters.
 * @param {IEntityTypes} params.entityType - The entity type to fetch data for (e.g., 'therapist', 'patient', etc.).
 * @returns {Promise<T | undefined>} - A promise that resolves to the fetched data or undefined if the entity type is not recognized or an error occurs.
 */

import { IEntityTypes } from '../../../../@types/types/componentTypes';
import { fetchAfflictionsAsAdmin } from '../../../apiUtils/adminApiUtils/afflictionApiUtils';
import { fetchInsuranceOrganismsAsAdmin } from '../../../apiUtils/adminApiUtils/insuranceApiUtils';
import { fetchMedicsAsAdmin } from '../../../apiUtils/adminApiUtils/medicApiUtils';
import { fetchPatientsAsAdmin } from '../../../apiUtils/adminApiUtils/patientApiUtils';
import { fetchTherapistsAsAdmin } from '../../../apiUtils/adminApiUtils/therapistApiUtils';

// Define the expected props for the refactored fetch function
interface fetchAdminTableDataProps {
  entityType: IEntityTypes; // One of the supported entity types
}

export const fetchAdminTableDetails = async <T>({
  entityType,
}: fetchAdminTableDataProps): Promise<T | undefined> => {
  try {
    // Map each entity type to its corresponding data-fetching function
    const fetchTableDetailsFunctionsByEntityType = [
      { entityType: 'therapist', fetchFunction: fetchTherapistsAsAdmin },
      { entityType: 'patient', fetchFunction: fetchPatientsAsAdmin },
      { entityType: 'affliction', fetchFunction: fetchAfflictionsAsAdmin },
      { entityType: 'medic', fetchFunction: fetchMedicsAsAdmin },
      {
        entityType: 'insurance',
        fetchFunction: fetchInsuranceOrganismsAsAdmin,
      },
    ];

    // Find the correct fetch function for the provided entity type
    const fetchFunction = fetchTableDetailsFunctionsByEntityType.find(
      (item) => item.entityType === entityType
    )?.fetchFunction;

    // If a matching function exists, call it and return the data
    if (fetchFunction) {
      const data = await fetchFunction();
      return data;
    } else {
      // Log a warning if no fetch function is associated with the given entity type
      console.error('No fetch function found for entity type:', entityType);
      return undefined;
    }
  } catch (error) {
    // Catch and log any unexpected errors during the fetch process
    console.error('Error fetching admin table data:', error);
    return undefined;
  }
};
