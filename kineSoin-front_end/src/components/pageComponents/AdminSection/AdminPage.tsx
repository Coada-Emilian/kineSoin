import { useState } from 'react';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../@types/standardTypes';
import AdminMain2 from './AdminMain2';
import { adminPageEntityStates } from '../../../utils/pageUtils/AdminSection/AdminPAgeUtils/constants/adminPageEntityStates';

interface AdminPageProps {
  isAdminTherapistsMain?: boolean;
  isAdminTherapistMain?: boolean;
  isAdminPatientsMain?: boolean;
  isAdminPatientMain?: boolean;
  isAdminAfflictionsMain?: boolean;
  isAdminAfflictionMain?: boolean;
  isAdminMedicsMain?: boolean;
  isAdminMedicMain?: boolean;
  isAdminInsurancesMain?: boolean;
  isAdminInsuranceMain?: boolean;
  isAdminRegionsMain?: boolean;
}

export default function AdminPage({
  isAdminTherapistsMain,
  isAdminTherapistMain,
  isAdminPatientsMain,
  isAdminPatientMain,
  isAdminAfflictionsMain,
  isAdminAfflictionMain,
  isAdminMedicsMain,
  isAdminMedicMain,
  isAdminInsurancesMain,
  isAdminInsuranceMain,
  isAdminRegionsMain,
}: AdminPageProps) {
  // Define state groups for different entity types
  const [allTherapists, setAllTherapists] = useState<ITherapist[]>([]);
  const [therapist, setTherapist] = useState<ITherapist | null>(null);
  const [therapistId, setTherapistId] = useState<number | null>(null);

  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [patient, setPatient] = useState<IPatient | null>(null);
  const [patientId, setPatientId] = useState<number | null>(null);

  const [allAfflictions, setAllAfflictions] = useState<IAffliction[]>([]);
  const [affliction, setAffliction] = useState<IAffliction | null>(null);
  const [afflictionId, setAfflictionId] = useState<number | null>(null);

  const [allMedics, setAllMedics] = useState<IMedic[]>([]);
  const [medic, setMedic] = useState<IMedic | null>(null);
  const [medicId, setMedicId] = useState<number | null>(null);

  const [allInsurances, setAllInsurances] = useState<IInsurance[]>([]);
  const [insurance, setInsurance] = useState<IInsurance | null>(null);
  const [insuranceId, setInsuranceId] = useState<number | null>(null);

  const entityStates = adminPageEntityStates({
    isAdminTherapistsMain,
    isAdminTherapistMain,
    allTherapists,
    setAllTherapists,
    therapist,
    setTherapist,
    therapistId,
    setTherapistId,

    isAdminPatientsMain,
    isAdminPatientMain,
    allPatients,
    setAllPatients,
    patient,
    setPatient,
    patientId,
    setPatientId,

    isAdminAfflictionsMain,
    isAdminAfflictionMain,
    allAfflictions,
    setAllAfflictions,
    affliction,
    setAffliction,
    afflictionId,
    setAfflictionId,

    isAdminMedicsMain,
    isAdminMedicMain,
    allMedics,
    setAllMedics,
    medic,
    setMedic,
    medicId,
    setMedicId,

    isAdminInsurancesMain,
    isAdminInsuranceMain,
    allInsurances,
    setAllInsurances,
    insurance,
    setInsurance,
    insuranceId,
    setInsuranceId,
  });

  // Determine the active entity group
  const activeEntityGroup = Object.values(entityStates).find(
    (group) => group.isActive
  );

  return activeEntityGroup ? (
    <AdminMain2
      entityType={activeEntityGroup.entityType}
      entities={activeEntityGroup.entities}
      setEntities={activeEntityGroup.setEntities}
      entity={activeEntityGroup.entity}
      setEntity={activeEntityGroup.setEntity}
      entityId={activeEntityGroup.entityId}
      setEntityId={activeEntityGroup.setEntityId}
    />
  ) : (
    <h1>No Active Admin Page</h1>
  );
}
