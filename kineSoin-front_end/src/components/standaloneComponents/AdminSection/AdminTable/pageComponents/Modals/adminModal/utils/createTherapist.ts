import { IAddForm } from '../../../../../../../../@types/formInterfaces';
import { handleTherapistCreationAsAdmin } from '../../../../../../../../utils/apiUtils/adminApiUtils/adminTherapistApiUtils';

interface FunctionProps {
  setError: (message: string | null) => void;
  setIsAddTherapistModalP3Open:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  addForm: IAddForm | undefined;
}

export const createTherapist = async ({
  setError,
  setIsAddTherapistModalP3Open,
  addForm,
}: FunctionProps) => {
  try {
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
      setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(false);
      window.location.reload();
    } else {
      setError('Une erreur est survenue lors de la création du compte.');
    }
  } catch (error) {
    setError('Une erreur est survenue lors de la création du compte.');
    console.error(error);
  }
};
