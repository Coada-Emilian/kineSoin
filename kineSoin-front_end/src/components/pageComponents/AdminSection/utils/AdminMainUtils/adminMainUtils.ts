import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/standardTypes';
import {
  fetchAfflictionAsAdmin,
  fetchAfflictionsAsAdmin,
  fetchInsuranceOrganismAsAdmin,
  fetchInsuranceOrganismsAsAdmin,
  fetchMedicAsAdmin,
  fetchMedicsAsAdmin,
  fetchPatientAsAdmin,
  fetchPatientsAsAdmin,
  fetchTherapistAsAdmin,
  fetchTherapistsAsAdmin,
} from '../../../../../utils/apiUtils/adminApiUtils';

interface AdminMainUtilsProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminTherapistMain?: boolean;
  therapistId?: number | null;
  setTherapist?: React.Dispatch<React.SetStateAction<ITherapist | null>>;
  isAdminPatientMain?: boolean;
  patientId?: number | null;
  setPatient?: React.Dispatch<React.SetStateAction<IPatient | null>>;
  isAdminAfflictionMain?: boolean;
  afflictionId?: number | null;
  setAffliction?: React.Dispatch<React.SetStateAction<IAffliction | null>>;
  isAdminMedicMain?: boolean;
  medicId?: number | null;
  setMedic?: React.Dispatch<React.SetStateAction<IMedic | null>>;
  isAdminInsuranceMain?: boolean;
  insuranceId?: number | null;
  setInsurance?: React.Dispatch<React.SetStateAction<IInsurance | null>>;

  isAdminTherapistsMain?: boolean;
  setAllTherapists?: React.Dispatch<React.SetStateAction<ITherapist[]>>;
  isAdminPatientsMain?: boolean;
  setAllPatients?: React.Dispatch<React.SetStateAction<IPatient[]>>;
  isAdminAfflictionsMain?: boolean;
  setAllAfflictions?: React.Dispatch<React.SetStateAction<IAffliction[]>>;
  isAdminMedicsMain?: boolean;
  setAllMedics?: React.Dispatch<React.SetStateAction<IMedic[]>>;
  isAdminInsurancesMain?: boolean;
  setAllInsurances?: React.Dispatch<React.SetStateAction<IInsurance[]>>;
}

export const fetchDetailsData = async ({
  setIsLoading,
  isAdminTherapistMain,
  therapistId,
  setTherapist,
  isAdminPatientMain,
  patientId,
  setPatient,
  isAdminAfflictionMain,
  afflictionId,
  setAffliction,
  isAdminMedicMain,
  medicId,
  setMedic,
  isAdminInsuranceMain,
  insuranceId,
  setInsurance,
}: AdminMainUtilsProps) => {
  setIsLoading(true);
  const fetchPromises = [];

  if (isAdminTherapistMain && therapistId) {
    fetchPromises.push(
      fetchTherapistAsAdmin(Number(therapistId)).then(setTherapist)
    );
  }

  if (isAdminPatientMain && patientId) {
    fetchPromises.push(fetchPatientAsAdmin(Number(patientId)).then(setPatient));
  }

  if (isAdminAfflictionMain && afflictionId) {
    fetchPromises.push(
      fetchAfflictionAsAdmin(Number(afflictionId)).then(setAffliction)
    );
  }

  if (isAdminMedicMain && medicId) {
    fetchPromises.push(fetchMedicAsAdmin(Number(medicId)).then(setMedic));
  }

  if (isAdminInsuranceMain && insuranceId) {
    fetchPromises.push(
      fetchInsuranceOrganismAsAdmin(Number(insuranceId)).then(setInsurance)
    );
  }

  await Promise.all(fetchPromises);
  setIsLoading(false);
};

export const fetchTableData = async ({
  setIsLoading,
  isAdminTherapistsMain,
  setAllTherapists,
  isAdminPatientsMain,
  setAllPatients,
  isAdminAfflictionsMain,
  setAllAfflictions,
  isAdminMedicsMain,
  setAllMedics,
  isAdminInsurancesMain,
  setAllInsurances,
}: AdminMainUtilsProps) => {
  setIsLoading(true);

  const fetchPromises = [];

  if (isAdminTherapistsMain) {
    fetchPromises.push(fetchTherapistsAsAdmin().then(setAllTherapists));
  }

  if (isAdminPatientsMain) {
    fetchPromises.push(fetchPatientsAsAdmin().then(setAllPatients));
  }

  if (isAdminAfflictionsMain) {
    fetchPromises.push(fetchAfflictionsAsAdmin().then(setAllAfflictions));
  }

  if (isAdminMedicsMain) {
    fetchPromises.push(fetchMedicsAsAdmin().then(setAllMedics));
  }

  if (isAdminInsurancesMain) {
    fetchPromises.push(fetchInsuranceOrganismsAsAdmin().then(setAllInsurances));
  }

  await Promise.all(fetchPromises);
  setIsLoading(false);
};
