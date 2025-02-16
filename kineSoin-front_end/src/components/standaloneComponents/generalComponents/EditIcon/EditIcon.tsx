import patientEditIcon from '/icons/patient-edit.png';

interface EditIconProps {
  isPhotoEdit?: boolean;
  isPatientProfilePhotoModification?: boolean;
}

export default function EditIcon({
  isPhotoEdit,
  isPatientProfilePhotoModification,
}: EditIconProps) {
  return (
    <img
      src={patientEditIcon}
      alt="Edit"
      className={`h-8 md:h-10 bg-white p-1 rounded-full ${isPhotoEdit ? 'absolute top-3 left-3' : isPatientProfilePhotoModification ? 'absolute top-0 left-0' : ''}`}
    />
  );
}
