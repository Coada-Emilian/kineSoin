import { IAffliction } from '../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import EditProfileName from '../generalComponents/EditProfileName';
import EditProfileSurname from '../generalComponents/EditProfileSurname';
import ProfileId from '../generalComponents/ProfileId';
import ProfileName from '../generalComponents/ProfileName';
import ProfileStatus from '../generalComponents/ProfileStatus';

interface GeneralSectionProps {
  patient?: IPatient | null;
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  isProfileEditing: boolean;
}

export default function GeneralSection({
  patient,
  therapist,
  affliction,
  isProfileEditing,
}: GeneralSectionProps) {
  return (
    <section className="md:text-2xl">
      {(therapist || patient) && (
        <ProfileStatus therapist={therapist} patient={patient} />
      )}

      <ProfileId
        therapist={therapist}
        patient={patient}
        affliction={affliction}
      />

      {isProfileEditing ? (
        <div className="flex flex-col gap-2 mb-2 ">
          <EditProfileName therapist={therapist} affliction={affliction} />
          {therapist && <EditProfileSurname therapist={therapist} />}
        </div>
      ) : (
        <ProfileName
          therapist={therapist}
          patient={patient}
          affliction={affliction}
        />
      )}
    </section>
  );
}
