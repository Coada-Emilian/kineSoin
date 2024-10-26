/**
 * @file GeneralSection.tsx
 * @description A React functional component that renders a general section for displaying and editing profile information related to patients, therapists, afflictions, medics, and insurance organizations in the KineSoin application. The component includes functionalities for displaying profile IDs, names, surnames, and statuses, with editing capabilities based on the editing state.
 *
 * @param {Object} props - The props for the GeneralSection component.
 * @param {IPatient|null} [props.patient] - An optional patient object or null if not applicable.
 * @param {ITherapist|null} [props.therapist] - An optional therapist object or null if not applicable.
 * @param {IAffliction|null} [props.affliction] - An optional affliction object or null if not applicable.
 * @param {IMedic|null} [props.medic] - An optional medic object or null if not applicable.
 * @param {IInsurance|null} [props.insurance] - An optional insurance organization object or null if not applicable.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 *
 * @returns {JSX.Element} The rendered GeneralSection component, which includes profile status, ID, name, and surname, with appropriate editing interfaces based on the editing state.
 */

import { IAffliction } from '../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../@types/IInsurance';
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
        <ProfileName
          therapist={therapist}
          patient={patient}
          affliction={affliction}
          medic={medic}
          insurance={insurance}
        />
      )}
    </section>
  );
}
