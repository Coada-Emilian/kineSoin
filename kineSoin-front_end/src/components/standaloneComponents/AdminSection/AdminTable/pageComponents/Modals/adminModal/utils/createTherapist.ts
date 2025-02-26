import { IAddForm } from '../../../../../../../../@types/formTypes';
import { handleTherapistCreationAsAdmin } from '../../../../../../../../utils/apiUtils/adminApiUtils';

interface FunctionProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsAddTherapistModalP3Open:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  addForm: IAddForm | undefined;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const createTherapist = async ({
  setErrorMessage,
  setIsAddTherapistModalP3Open,
  addForm,
  setIsLoading,
}: FunctionProps) => {
  try {
    setIsLoading && setIsLoading(true);
    const newFormData = new FormData();

    newFormData.append('name', addForm?.name as string);
    newFormData.append('surname', addForm?.surname as string);
    newFormData.append('email', addForm?.email as string);
    newFormData.append('password', addForm?.password as string);
    newFormData.append(
      'repeated_password',
      addForm?.repeated_password as string
    );
    newFormData.append('description', addForm?.description as string);
    newFormData.append('diploma', addForm?.diploma as string);
    newFormData.append('experience', addForm?.experience as string);
    newFormData.append('specialty', addForm?.specialty as string);
    newFormData.append('licence_code', addForm?.licence_code as string);
    newFormData.append('status', addForm?.status as string);
    newFormData.append('photo', addForm?.photo as Blob);
    newFormData.append(
      'full_phone_number',
      addForm?.full_phone_number as string
    );
    newFormData.append('phone_number', addForm?.phone_number as string);
    newFormData.append('prefix', addForm?.prefix as string);

    const response = await handleTherapistCreationAsAdmin(newFormData);
    if (response) {
      setIsLoading && setIsLoading(false);
      setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(false);
      window.location.reload();
    } else {
      setIsLoading && setIsLoading(false);
      setErrorMessage('Une erreur est survenue lors de la création du compte.');
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
    setErrorMessage('Une erreur est survenue lors de la création du compte.');
    console.error(error);
  }
};
