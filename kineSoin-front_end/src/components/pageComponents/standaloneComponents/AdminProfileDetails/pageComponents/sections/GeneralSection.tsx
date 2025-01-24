// Purpose: Provide the GeneralSection component which displays the general details of a profile.

import { IAffliction } from '../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import EditProfileName from '../generalComponents/common/EditProfileName';
import EditProfileSurname from '../generalComponents/common/EditProfileSurname';
import ProfileEmail from '../generalComponents/common/ProfileEmail';
import ProfileId from '../generalComponents/common/ProfileId';
import ProfileName from '../generalComponents/common/ProfileName';
import ProfileStatus from '../generalComponents/common/ProfileStatus';

interface GeneralSectionProps {
  patient?: IPatient | null;
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
  isProfileEditing: boolean;
}

export default function GeneralSection({
  patient,
  therapist,
  affliction,
  medic,
  insurance,
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
        insurance={insurance}
      />

      {isProfileEditing ? (
        <div className="flex flex-col gap-2 mb-2 ">
          <EditProfileName
            therapist={therapist}
            affliction={affliction}
            medic={medic}
            insurance={insurance}
          />

          {(therapist || medic) && (
            <EditProfileSurname therapist={therapist} medic={medic} />
          )}
        </div>
      ) : (
        <>
          <ProfileName
            therapist={therapist}
            patient={patient}
            affliction={affliction}
            medic={medic}
            insurance={insurance}
          />

          {patient && <ProfileEmail patient={patient} />}
        </>
      )}
    </section>
  );
}
