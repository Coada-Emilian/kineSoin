import { IAddForm } from '../../../../../../@types/interfaces/customInterfaces';

interface addFormDetailsProps {
  setError: (message: string | null) => void;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm | any) => void;
}

export const addSecondFormDetails = (
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    setIsAddTherapistModalP2Open,
    setIsAddTherapistModalP3Open,
    setAddForm,
  }: addFormDetailsProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistDiploma = formData.get('diploma') as string;
    const therapistExperience = formData.get('experience') as string;
    const therapistSpecialty = formData.get('specialty') as string;
    const therapistPrefix = formData.get('prefix') as string;
    const therapistTelephone = formData.get('phone_number') as string;
    const therapistDescription = formData.get('description') as string;

    if (
      !therapistDiploma ||
      !therapistExperience ||
      !therapistSpecialty ||
      !therapistDescription ||
      !therapistPrefix ||
      !therapistTelephone
    ) {
      setError('Veuillez remplir tous les champs.');
      return;
    } else if (therapistDiploma.length > 100) {
      setError('Le diplôme ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistExperience.length > 100) {
      setError("L'expérience ne doit pas dépasser 100 caractères.");
      return;
    } else if (therapistSpecialty.length > 100) {
      setError('La spécialité ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistDescription.length > 500) {
      setError('La description ne doit pas dépasser 500 caractères.');
      return;
    } else if (therapistPrefix.length > 10) {
      setError('Le préfixe ne doit pas dépasser 10 caractères.');
      return;
    } else if (therapistTelephone.length > 15) {
      setError('Le numéro de téléphone ne doit pas dépasser 15 caractères.');
      return;
    } else if (!/^\d+$/.test(therapistTelephone)) {
      setError('Le numéro de téléphone ne doit contenir que des chiffres.');
      return;
    }

    const fullPhoneNUmber = `${therapistPrefix}${therapistTelephone}`;

    setAddForm((prev: IAddForm) => ({
      ...prev,
      description: therapistDescription,
      diploma: therapistDiploma,
      experience: therapistExperience,
      specialty: therapistSpecialty,
      prefix: therapistPrefix,
      phone_number: therapistTelephone,
      full_phone_number: fullPhoneNUmber,
    }));

    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(false);
    setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};
