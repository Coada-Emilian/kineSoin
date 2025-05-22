import { IAddForm } from '../../../../../../@types/interfaces/customInterfaces';

interface addFormDetailsProps {
  therapistImage?: File | null;
  setError: (message: string | null) => void;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm | any) => void;
}

export const addFirstFormDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    therapistImage,
    setError,
    setIsAddTherapistModalP1Open,
    setIsAddTherapistModalP2Open,
    setAddForm,
  }: addFormDetailsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const therapistName = formData.get('name') as string;
    const therapistSurname = formData.get('surname') as string;
    const therapistLicenceCode = formData.get('licence_code') as string;
    const file = therapistImage;

    // Field Validation
    if (!therapistName || !therapistSurname || !therapistLicenceCode) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!file) {
      setError('Veuillez ajouter une photo.');
      return;
    }
    if (!/^[0-9]{9}$/.test(therapistLicenceCode)) {
      setError('Le code ADELI doit être composé de 9 chiffres.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistName)) {
      setError('Le nom ne doit contenir que des lettres et des espaces.');
      return;
    }
    if (
      !/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistSurname)
    ) {
      setError('Le prénom ne doit contenir que des lettres et des espaces.');
      return;
    }

    setAddForm({
      name: therapistName,
      surname: therapistSurname,
      email: '',
      password: '',
      repeated_password: '',
      description: '',
      diploma: '',
      experience: '',
      specialty: '',
      licence_code: therapistLicenceCode,
      status: '',
      photo: file,
      prefix: '',
      phone_number: '',
      full_phone_number: '',
    });

    setError('');

    setIsAddTherapistModalP1Open && setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};
