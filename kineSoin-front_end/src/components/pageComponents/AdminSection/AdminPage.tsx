import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../@types/standardTypes';
import AdminMain2 from './AdminMain2';

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

  // Mapping object to dynamically group state based on boolean flag
  const entityStateMap = {
    therapists: {
      entityType: 'therapist',
      isActive: isAdminTherapistsMain || isAdminTherapistMain,
      entities: allTherapists,
      setEntities: setAllTherapists,
      entity: therapist,
      setEntity: setTherapist,
      entityId: therapistId,
      setEntityId: setTherapistId,
    },
    patients: {
      entityType: 'patient',
      isActive: isAdminPatientsMain || isAdminPatientMain,
      entities: allPatients,
      setEntities: setAllPatients,
      entity: patient,
      setEntity: setPatient,
      entityId: patientId,
      setEntityId: setPatientId,
    },
    afflictions: {
      entityType: 'affliction',
      isActive: isAdminAfflictionsMain || isAdminAfflictionMain,
      entities: allAfflictions,
      setEntities: setAllAfflictions,
      entity: affliction,
      setEntity: setAffliction,
      entityId: afflictionId,
      setEntityId: setAfflictionId,
    },
    medics: {
      entityType: 'medic',
      isActive: isAdminMedicsMain || isAdminMedicMain,
      entities: allMedics,
      setEntities: setAllMedics,
      entity: medic,
      setEntity: setMedic,
      entityId: medicId,
      setEntityId: setMedicId,
    },
    insurances: {
      entityType: 'insurance',
      isActive: isAdminInsurancesMain || isAdminInsuranceMain,
      entities: allInsurances,
      setEntities: setAllInsurances,
      entity: insurance,
      setEntity: setInsurance,
      entityId: insuranceId,
      setEntityId: setInsuranceId,
    },
  };

  // Determine the active entity group
  const activeEntityGroup = Object.values(entityStateMap).find(
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
