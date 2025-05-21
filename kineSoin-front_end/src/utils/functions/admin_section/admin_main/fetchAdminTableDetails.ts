// Import the available entity types (e.g., 'therapist', 'patient', etc.)
import { IEntityTypes } from '../../../../@types/types/componentTypes';

// Import data-fetching functions for each entity type used in the admin section
import { fetchAfflictionsAsAdmin } from '../../../apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';
import { fetchInsuranceOrganismsAsAdmin } from '../../../apiUtils/adminApiUtils/insurance_utils/adminInsuranceApiUtils';
import { fetchMedicsAsAdmin } from '../../../apiUtils/adminApiUtils/medic_utils/adminMedicApiUtils';
import { fetchPatientsAsAdmin } from '../../../apiUtils/adminApiUtils/patient_utils/adminPatientApiUtils';
import { fetchTherapistsAsAdmin } from '../../../apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';

// Define the expected props for the refactored fetch function
interface fetchAdminTableDataProps {
  entityType: IEntityTypes; // One of the supported entity types
}

/**
 * Fetches the admin table data dynamically based on the provided entity type.
 * This generic function improves reusability across multiple admin components.
 *
 * @param entityType - The type of entity to fetch (e.g., 'therapist', 'patient', etc.)
 * @returns A Promise containing the fetched data or undefined if no fetch function is found.
 */
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
