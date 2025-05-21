// Import the available entity types used throughout the admin interface
import { IEntityTypes } from '../../../../@types/types/componentTypes';

// Import specific data-fetching functions for individual entities
import { fetchAfflictionAsAdmin } from '../../../apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';
import { fetchInsuranceOrganismAsAdmin } from '../../../apiUtils/adminApiUtils/insurance_utils/adminInsuranceApiUtils';
import { fetchMedicAsAdmin } from '../../../apiUtils/adminApiUtils/medic_utils/adminMedicApiUtils';
import { fetchPatientAsAdmin } from '../../../apiUtils/adminApiUtils/patient_utils/adminPatientApiUtils';
import { fetchTherapistAsAdmin } from '../../../apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';

// Define the expected props for this generic fetch function
interface fetchAdminEntityDetailsProps {
  entityType: IEntityTypes; // Entity type to fetch (e.g., 'therapist', 'patient', etc.)
  entityId: number | null; // ID of the entity to fetch (can be null)
}

/**
 * Fetches the details of a specific admin entity based on its type and ID.
 * This generic function abstracts multiple fetch calls into a single, reusable logic block.
 *
 * @param entityType - The type of entity (e.g., 'therapist', 'patient', etc.)
 * @param entityId - The ID of the entity to fetch
 * @returns A Promise resolving to the fetched data or undefined on failure
 */
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
