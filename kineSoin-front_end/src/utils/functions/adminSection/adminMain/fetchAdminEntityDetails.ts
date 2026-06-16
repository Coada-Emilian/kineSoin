/**
 * Fetches detailed information for a specific admin entity based on its type and ID.
 *
 * Dynamically selects and calls the appropriate fetch function for the given entity type.
 * Returns the entity data if successful, otherwise logs errors and returns undefined.
 *
 * @param entityType - The type of entity to fetch (e.g., 'therapist', 'patient', etc.).
 * @param entityId - The ID of the entity to fetch.
 * @returns A promise resolving to the entity data or undefined if fetching fails or inputs are invalid.
 */

import { IEntityTypes } from '../../../../@types/types/componentTypes';
import { fetchAfflictionAsAdmin } from '../../../apiUtils/adminApiUtils/afflictionApiUtils';
import { fetchInsuranceOrganismAsAdmin } from '../../../apiUtils/adminApiUtils/insuranceApiUtils';
import { fetchMedicAsAdmin } from '../../../apiUtils/adminApiUtils/medicApiUtils';
import { fetchPatientAsAdmin } from '../../../apiUtils/adminApiUtils/patientApiUtils';
import { fetchTherapistAsAdmin } from '../../../apiUtils/adminApiUtils/therapistApiUtils';

interface fetchAdminEntityDetailsProps {
  entityType: IEntityTypes;
  entityId: number | null;
}

export const fetchAdminEntityDetails = async <T>({
  entityType,
  entityId,
}: fetchAdminEntityDetailsProps): Promise<T | undefined> => {
  try {
    // Map each entity type to its corresponding single-entity fetch function
    const fetchAdminEntityDetailsFunctions = [
      { entityType: 'therapist', fetchFunction: fetchTherapistAsAdmin },
      { entityType: 'patient', fetchFunction: fetchPatientAsAdmin },
      { entityType: 'affliction', fetchFunction: fetchAfflictionAsAdmin },
      { entityType: 'medic', fetchFunction: fetchMedicAsAdmin },
      { entityType: 'insurance', fetchFunction: fetchInsuranceOrganismAsAdmin },
    ];

    // Find the correct fetch function based on the provided entity type
    const fetchFunction = fetchAdminEntityDetailsFunctions.find(
      (item) => item.entityType === entityType
    )?.fetchFunction;

    // Proceed only if a fetch function and a valid entityId are provided
    if (fetchFunction && entityId) {
      const data = await fetchFunction(entityId);
      return data;
    } else {
      console.error(
        'No valid fetch function or entityId found for type:',
        entityType
      );
      return undefined;
    }
  } catch (error) {
    // Catch and log any errors during the data-fetching process
    console.error('Error fetching admin entity details:', error);
    return undefined;
  }
};
