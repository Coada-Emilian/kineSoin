import { ITherapist } from '../../../../../../@types/types';

interface FunctionProps {
  therapist: ITherapist | undefined;
  therapistStatus: string;
  selectedFile: File | null;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleFormSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    therapist,
    therapistStatus,
    selectedFile,
    setIsProfileEditing,
  }: FunctionProps,
  updateFunction: Function
) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  {
    therapist && formData.append('status', therapistStatus);
  }

  if (selectedFile) {
    formData.append('file', selectedFile);
  }

  try {
    const response = await updateFunction(formData);
    if (response) {
      setIsProfileEditing(false);
      window.location.reload();
    } else {
      console.error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
