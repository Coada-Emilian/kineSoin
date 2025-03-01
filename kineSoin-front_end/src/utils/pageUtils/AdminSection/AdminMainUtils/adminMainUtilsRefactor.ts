import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardTypes';
import {
  fetchAfflictionAsAdmin,
  fetchAfflictionsAsAdmin,
} from '../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';
import {
  fetchInsuranceOrganismAsAdmin,
  fetchInsuranceOrganismsAsAdmin,
} from '../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';
import {
  fetchMedicAsAdmin,
  fetchMedicsAsAdmin,
} from '../../../apiUtils/adminApiUtils/adminMedicApiUtils';
import {
  fetchPatientAsAdmin,
  fetchPatientsAsAdmin,
} from '../../../apiUtils/adminApiUtils/adminPatientApiUtils';
import {
  fetchTherapistAsAdmin,
  fetchTherapistsAsAdmin,
} from '../../../apiUtils/adminApiUtils/adminTherapistApiUtils';

interface AdminMainUtilsRefactorProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  entityType: string;
  entityId?: number | null;
  setEntity?:
    | React.Dispatch<React.SetStateAction<ITherapist>>
    | React.Dispatch<React.SetStateAction<IPatient>>
    | React.Dispatch<React.SetStateAction<IAffliction>>
    | React.Dispatch<React.SetStateAction<IMedic>>
    | React.Dispatch<React.SetStateAction<IInsurance>>
    | React.Dispatch<React.SetStateAction<any | null>>;
  setEntities?:
    | React.Dispatch<React.SetStateAction<ITherapist[]>>
    | React.Dispatch<React.SetStateAction<IPatient[]>>
    | React.Dispatch<React.SetStateAction<IAffliction[]>>
    | React.Dispatch<React.SetStateAction<IMedic[]>>
    | React.Dispatch<React.SetStateAction<IInsurance[]>>;
}

export const fetchTableDataRefactor = async ({
  setIsLoading,
  entityType,
  setEntities,
}: AdminMainUtilsRefactorProps) => {
  try {
    setIsLoading(true);

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

    entityFetchTableDetailsFunctions.forEach((entityFetchFunction) => {
      if (entityType === entityFetchFunction.entityType) {
        entityFetchFunction.fetchFunction().then(setEntities);
      }
    });

    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetailsDataRefactor = async ({
  setIsLoading,
  entityType,
  entityId,
  setEntity,
}: AdminMainUtilsRefactorProps) => {
  try {
    setIsLoading(true);
    const entityFetchEntityDetailsFunctions = [
      { entityType: 'therapist', fetchFunction: fetchTherapistAsAdmin },
      { entityType: 'patient', fetchFunction: fetchPatientAsAdmin },
      { entityType: 'affliction', fetchFunction: fetchAfflictionAsAdmin },
      { entityType: 'medic', fetchFunction: fetchMedicAsAdmin },
      { entityType: 'insurance', fetchFunction: fetchInsuranceOrganismAsAdmin },
    ];

    entityFetchEntityDetailsFunctions.forEach((entityFetchFunction) => {
      if (entityType === entityFetchFunction.entityType) {
        if (entityId !== null) {
          if (entityId !== undefined) {
            entityFetchFunction.fetchFunction(entityId).then(setEntity);
          }
        }
      }
    });

    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
};
