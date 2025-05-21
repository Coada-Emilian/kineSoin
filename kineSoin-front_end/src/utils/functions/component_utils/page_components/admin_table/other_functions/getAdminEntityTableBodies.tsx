/**
 * @function getAdminEntityTableBodies
 *
 * This function returns an array of table body components based on the entity type.
 * It dynamically generates table bodies for various entities (therapist, patient, affliction, medic, insurance)
 * by passing the relevant data to the appropriate table body component. The function ensures that
 * the right table structure and content are displayed for each entity type, enabling a flexible and dynamic admin interface.
 *
 * @param {Object} params - The function parameters.
 * @param {Array} params.renderedEntities - An array of entities to be rendered as table bodies.
 *                                          The entity type can be one of the following:
 *                                          `ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[]`.
 *
 * @returns {Array} - Returns an array of objects, each containing an `entityType` and a corresponding table body component:
 *
 *  - `entityType: 'therapist'`: Component `TherapistTableBodyRefactor`
 *  - `entityType: 'patient'`: Component `PatientTableBodyRefactor`
 *  - `entityType: 'affliction'`: Component `AfflictionTableBodyRefactor`
 *  - `entityType: 'medic'`: Component `MedicTableBodyRefactor`
 *  - `entityType: 'insurance'`: Component `InsuranceTableBodyRefactor`
 *
 * @example
 * const tableBodies = getAdminEntityTableBodies({ renderedEntities: therapists });
 * // This returns an array of table bodies, including `TherapistTableBodyRefactor` for rendering therapists.
 *
 * @remarks
 * The function assumes that `renderedEntities` contains data that matches one of the five defined entity types.
 * If the wrong entity type is passed, it could lead to errors or unexpected behavior.
 *
 * Each entity type has a corresponding table body component that handles the rendering of the table rows.
 * These components are imported at the top of the file and selected dynamically based on the entity type.
 */

import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';
import AfflictionTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/new_components/page_components/affliction/AfflictionTableBodyRefactor';
import InsuranceTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/new_components/page_components/insurance/InsuranceTableBodyRefactor';
import MedicTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/new_components/page_components/medic/MedicTableBodyRefactor';
import PatientTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/new_components/page_components/patient/PatientTableBodyRefactor';
import TherapistTableBodyRefactor from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/new_components/page_components/therapist/TherapistTableBodyRefactor';

interface FunctionProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
}
export const getAdminEntityTableBodies = ({
  renderedEntities,
}: FunctionProps) => [
  {
    entityType: 'therapist',
    component: (
      <TherapistTableBodyRefactor
        renderedTherapists={renderedEntities as ITherapist[]}
      />
    ),
  },
  {
    entityType: 'patient',
    component: (
      <PatientTableBodyRefactor
        renderedPatients={renderedEntities as IPatient[]}
      />
    ),
  },
  {
    entityType: 'affliction',
    component: (
      <AfflictionTableBodyRefactor
        renderedAfflictions={renderedEntities as IAffliction[]}
      />
    ),
  },
  {
    entityType: 'medic',
    component: (
      <MedicTableBodyRefactor renderedMedics={renderedEntities as IMedic[]} />
    ),
  },
  {
    entityType: 'insurance',
    component: (
      <InsuranceTableBodyRefactor
        renderedInsurances={renderedEntities as IInsurance[]}
      />
    ),
  },
];
