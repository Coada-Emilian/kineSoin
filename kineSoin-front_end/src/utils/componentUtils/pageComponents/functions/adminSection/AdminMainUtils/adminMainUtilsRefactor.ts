import { IEntityTypes } from '../../../../../../@types/componentTypes';

import {
  fetchAfflictionAsAdmin,
  fetchAfflictionsAsAdmin,
} from '../../../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';
import {
  fetchInsuranceOrganismAsAdmin,
  fetchInsuranceOrganismsAsAdmin,
} from '../../../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';
import {
  fetchMedicAsAdmin,
  fetchMedicsAsAdmin,
} from '../../../../../apiUtils/adminApiUtils/adminMedicApiUtils';
import {
  fetchPatientAsAdmin,
  fetchPatientsAsAdmin,
} from '../../../../../apiUtils/adminApiUtils/adminPatientApiUtils';
import {
  fetchTherapistAsAdmin,
  fetchTherapistsAsAdmin,
} from '../../../../../apiUtils/adminApiUtils/adminTherapistApiUtils';

interface AdminMainUtilsRefactorProps {
  entityType: IEntityTypes;
}

export const fetchTableDataRefactor = async <T>({
  entityType,
}: AdminMainUtilsRefactorProps): Promise<T | undefined> => {
  try {
    const entityFetchTableDetailsFunctions = [
      { entityType: 'therapist', fetchFunction: fetchTherapistsAsAdmin },
      { entityType: 'patient', fetchFunction: fetchPatientsAsAdmin },
      { entityType: 'affliction', fetchFunction: fetchAfflictionsAsAdmin },
      { entityType: 'medic', fetchFunction: fetchMedicsAsAdmin },
      {
        entityType: 'insurance',
        fetchFunction: fetchInsuranceOrganismsAsAdmin,
      },
    ];

    const fetchFunction = entityFetchTableDetailsFunctions.filter(
      (entityFetchFunction) => {
        return entityType === entityFetchFunction.entityType;
      }
    )[0].fetchFunction;

    if (fetchFunction) {
      const data = await fetchFunction();
      return data;
    } else {
      console.error('No fetch function found for entity type', entityType);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetailsDataRefactor = async <T>({
  entityType,
  entityId,
}: {
  entityType: IEntityTypes;
  entityId: number | null;
}): Promise<T | undefined> => {
  try {
    const entityFetchEntityDetailsFunctions = [
      { entityType: 'therapist', fetchFunction: fetchTherapistAsAdmin },
      { entityType: 'patient', fetchFunction: fetchPatientAsAdmin },
      { entityType: 'affliction', fetchFunction: fetchAfflictionAsAdmin },
      { entityType: 'medic', fetchFunction: fetchMedicAsAdmin },
      { entityType: 'insurance', fetchFunction: fetchInsuranceOrganismAsAdmin },
    ];

    const fetchFunction = entityFetchEntityDetailsFunctions.filter(
      (entityFetchFunction) => {
        return entityType === entityFetchFunction.entityType;
      }
    )[0].fetchFunction;

    if (fetchFunction && entityId) {
      const data = await fetchFunction(entityId);
      return data;
    } else {
      console.error('No fetch function found for entity type', entityType);
    }
  } catch (error) {
    console.error(error);
  }
};
