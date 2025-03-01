import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import { handleAfflictionDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminAfflictionApiUtils';
import { handleBodyRegionDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminBodyRegionApiUtils';
import { handleInsuranceOrganismDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminInsuranceApiUtils';
import { handleMedicDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminMedicApiUtils';
import { handlePatientDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminPatientApiUtils';
import { handleTherapistDeleteAsAdmin } from '../../../../../apiUtils/adminApiUtils/adminTherapistApiUtils';

interface FunctionProps {
  entity:
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | IBodyRegion;
}

export const getDeleteModalEntityDetails = ({ entity }: FunctionProps) => [
  {
    entityType: 'therapist',
    function: handleTherapistDeleteAsAdmin,
    redirect: '/admin/therapists',
    full_name: (entity as ITherapist).fullName,
  },
  {
    entityType: 'patient',
    function: handlePatientDeleteAsAdmin,
    redirect: '/admin/patients',
    full_name: (entity as IPatient).fullName,
  },
  {
    entityType: 'affliction',
    function: handleAfflictionDeleteAsAdmin,
    redirect: '/admin/afflictions',
    name: (entity as IAffliction).name,
  },
  {
    entityType: 'medic',
    function: handleMedicDeleteAsAdmin,
    redirect: '/admin/medics',
    full_name: (entity as IMedic).fullName,
  },
  {
    entityType: 'insurance',
    function: handleInsuranceOrganismDeleteAsAdmin,
    redirect: '/admin/insurances',
    name: (entity as IInsurance).name,
  },
  {
    entityType: 'region',
    function: handleBodyRegionDeleteAsAdmin,
    redirect: '/admin/regions',
    name: (entity as IBodyRegion).name,
  },
];
