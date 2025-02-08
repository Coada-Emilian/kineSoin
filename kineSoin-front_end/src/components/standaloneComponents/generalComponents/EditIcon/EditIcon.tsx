import patientEditIcon from '/icons/patient-edit.png';

interface EditIconProps {
  isPhotoEdit?: boolean;
}

export default function EditIcon({ isPhotoEdit }: EditIconProps) {
  return (
    <img
      src={patientEditIcon}
      alt="Edit"
      className={`h-8 md:h-10 bg-white p-1 rounded-full ${isPhotoEdit ? 'absolute top-3 left-3' : ''}`}
    />
  );
}
