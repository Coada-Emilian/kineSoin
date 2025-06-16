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
  const isPatientProfile = entityType === 'patient';
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
