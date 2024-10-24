import { IAffliction } from '../../../../../../@types/IAffliction';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import EditProfileName from '../generalComponents/common/EditProfileName';
import EditProfileSurname from '../generalComponents/common/EditProfileSurname';
import ProfileId from '../generalComponents/common/ProfileId';
import ProfileName from '../generalComponents/common/ProfileName';
import ProfileStatus from '../generalComponents/common/ProfileStatus';

interface GeneralSectionProps {
  patient?: IPatient | null;
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  isProfileEditing: boolean;
}

export default function GeneralSection({
  patient,
  therapist,
  affliction,
  medic,
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
        medic={medic}
      />

      {isProfileEditing ? (
        <div className="flex flex-col gap-2 mb-2 ">
          <EditProfileName
            therapist={therapist}
            affliction={affliction}
            medic={medic}
          />
          {(therapist || medic) && (
            <EditProfileSurname therapist={therapist} medic={medic} />
          )}
        </div>
      ) : (
        <ProfileName
          therapist={therapist}
          patient={patient}
          affliction={affliction}
          medic={medic}
        />
      )}
    </section>
  );
}
