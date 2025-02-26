// Purpose: Display the body of the table based on the data being displayed.

import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import TherapistTableBody from '../Therapist/TherapistTableBody';
import PatientTableBody from '../Patient/PatientTableBody';
import AfflictionTableBody from '../Affliction/AfflictionTableBody';
import MedicTableBody from '../Medic/MedicTableBody';
import InsuranceTableBody from '../Insurance/InsuranceTableBody';

interface TableBodyRefactorProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
  entityType: string;
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => void;
}

export default function TableBodyRefactor({
  renderedEntities,
  entityType,
  openDeleteModal,
  //   allBodyRegions,
}: TableBodyRefactorProps) {
  const entityTableBodies = [
    {
      entityType: 'therapist',
      component: (
        <TherapistTableBody
          renderedTherapists={renderedEntities as ITherapist[]}
          openDeleteModal={openDeleteModal}
        />
      ),
    },
    {
      entityType: 'patient',
      component: (
        <PatientTableBody
          renderedPatients={renderedEntities as IPatient[]}
          openDeleteModal={openDeleteModal}
        />
      ),
    },
    {
      entityType: 'affliction',
      component: (
        <AfflictionTableBody
          renderedAfflictions={renderedEntities as IAffliction[]}
          openDeleteModal={openDeleteModal}
        />
      ),
    },
    {
      entityType: 'medic',
      component: (
        <MedicTableBody
          renderedMedics={renderedEntities as IMedic[]}
          openDeleteModal={openDeleteModal}
        />
      ),
    },
    {
      entityType: 'insurance',
      component: (
        <InsuranceTableBody
          renderedInsurances={renderedEntities as IInsurance[]}
          openDeleteModal={openDeleteModal}
        />
      ),
    },
  ];

  const currentEntity = entityTableBodies.find(
    (entity) => entity.entityType === entityType
  );

  return (
    <tbody className="xxs:text-xs xs:text-xs md:text-sm">
      {currentEntity && currentEntity.component}
    </tbody>
  );
}
