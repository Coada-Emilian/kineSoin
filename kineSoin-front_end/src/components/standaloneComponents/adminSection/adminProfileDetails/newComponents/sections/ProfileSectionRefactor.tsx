/**
 * @component ProfileSectionRefactor
 *
 * Conditionally renders either the profile output view or the input editing form
 * based on the current profile editing state and entity type.
 *
 * @param {Object} props
 * @param {ITherapist | IPatient | IAffliction | IMedic | IInsurance | undefined} props.entity - The entity data (not used directly here).
 * @param {string} props.entityType - The type of the entity (e.g., 'patient', 'therapist').
 *
 * @returns {JSX.Element} A section containing either ProfileSectionOutputs or ProfileSectionInputs components.
 *
 * @example
 * <ProfileSectionRefactor entityType="therapist" />
 */

import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import ProfileSectionInputs from './ProfileSectionInputs';
import ProfileSectionOutputs from './ProfileSectionOutputs';

interface ProfileSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | undefined;
  entityType: string;
}

export default function ProfileSectionRefactor({
  entityType,
}: ProfileSectionRefactorProps) {
  // Determine if the entity type is 'patient'
  const isPatientProfile = entityType === 'patient';

  // Get the global context for profile editing state
  const { isProfileEditing } = useAdminProfileDetailsGlobalContext();

  return (
    <section className="mb-2 md:text-2xl w-full">
      {!isProfileEditing || isPatientProfile ? (
        <ProfileSectionOutputs />
      ) : (
        <ProfileSectionInputs entityType={entityType} />
      )}
    </section>
  );
}
