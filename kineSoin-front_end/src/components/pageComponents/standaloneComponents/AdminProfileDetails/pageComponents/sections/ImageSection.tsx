/**
 * @file ImageSection.tsx
 * @description A React functional component that renders an image section for displaying and editing profile images related to patients and therapists in the KineSoin application. The component conditionally displays either the therapist's image editing interface or the profile image based on the editing state.
 *
 * @param {Object} props - The props for the ImageSection component.
 * @param {ITherapist} [props.therapist] - An optional therapist object if applicable.
 * @param {IPatient} [props.patient] - An optional patient object if applicable.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsEditPhotoModalOpen - A function to toggle the state of the edit photo modal.
 *
 * @returns {JSX.Element} The rendered ImageSection component, which includes either the edit photo interface for the therapist or the profile image based on the editing state.
 */

import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import ProfileImage from '../generalComponents/common/ProfileImage';
import EditTherapistImage from '../generalComponents/therapist/EditTherapistImage';

interface ImageSectionProps {
  therapist?: ITherapist;
  patient?: IPatient;
  isProfileEditing: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageSection({
  therapist,
  patient,
  isProfileEditing,
  setIsEditPhotoModalOpen,
}: ImageSectionProps) {
  return (
    <>
      {isProfileEditing ? (
        therapist && (
          <EditTherapistImage
            therapist={therapist}
            setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
          />
        )
      ) : (
        <ProfileImage therapist={therapist} patient={patient} />
      )}
    </>
  );
}
