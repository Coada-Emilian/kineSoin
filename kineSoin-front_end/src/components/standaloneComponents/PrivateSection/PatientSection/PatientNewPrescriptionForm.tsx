import { useEffect, useState } from 'react';
import CustomButton from '../../generalComponents/CustomButton/CustomButton';
import StandardDateInput from '../../generalComponents/StandardInputs/StandardDateInput';
import StandardChoiceDropdown from '../../generalComponents/StandardInputs/StandardDropdownInput';
import StandardFileInput from '../../generalComponents/StandardInputs/StandardFileInput';
import StandardTextInput from '../../generalComponents/StandardInputs/StandardTextInput';
import {
  fetchAfflictionNamesAsPatient,
  fetchAllMedicNamesAsPatient,
  handleNewPrescriptionCreation,
} from '../../../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { IAffliction, IMedic } from '../../../../@types/types';

interface PatientNewPrescriptionFormProps {
  windowWidth?: number;
  patientId?: number;
  scanPreview?: string | null;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PatientNewPrescriptionForm({
  patientId,
  setScanPreview,
}: PatientNewPrescriptionFormProps) {
  const [medics, setMedics] = useState<IMedic[]>([]);
  const [afflictions, setAfflictions] = useState<IAffliction[]>([]);
  const [prescriptionScan, setPrescriptionScan] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetchAllMedicNamesAsPatient();
      setMedics(response);
    };

    const fetchApiAfflictions = async () => {
      const response = await fetchAfflictionNamesAsPatient();
      setAfflictions(response);
    };
    fetchApiAfflictions();
    fetchDoctors();
  }, []);

  const handleNewPrescriptionAdd = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('scan', prescriptionScan as File);
    const medicId = formData.get('medic_id');
    const afflictionId = formData.get('affliction_id');
    const appointmentNumber = formData.get('appointment_quantity');
    const atHomeCare = formData.get('at_home_care');
    const prescriptionDate = formData.get('date');
    const currentDate = new Date();

    // Regex patterns
    const numberPattern = /^\d+$/;
    const booleanPattern = /^(true|false)$/;

    if (!medicId || !afflictionId || !prescriptionDate || !atHomeCare) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (!numberPattern.test(medicId as string)) {
      setErrorMessage('Le medicId doit être un numéro valide');
      return;
    } else if (!numberPattern.test(afflictionId as string)) {
      setErrorMessage('Le afflictionId doit être un numéro valide');
      return;
    } else if (
      appointmentNumber &&
      !numberPattern.test(appointmentNumber as string)
    ) {
      setErrorMessage('Le appointmentNumber doit être un numéro valide');
      return;
    } else if (!booleanPattern.test(atHomeCare as string)) {
      setErrorMessage('atHomeCare doit être un boolean (true ou false)');
      return;
    } else if (new Date(prescriptionDate as string) > currentDate) {
      setErrorMessage("La date de l'ordonnance ne peut pas être dans le futur");
    }

    if (patientId !== undefined) {
      const response = await handleNewPrescriptionCreation(formData);
      if (response) {
        navigate('/patient/dashboard');
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 border border-gray-300 p-4 rounded-xl w-3/6 shadow-xl md:w-2/6"
      encType="multipart/form-data"
      onSubmit={handleNewPrescriptionAdd}
    >
      {errorMessage && (
        <p className="text-red-500 text-center font-semibold italic">
          {errorMessage}{' '}
        </p>
      )}

      <StandardDateInput isNewPrescriptionDateInput />

      <StandardChoiceDropdown isMedicDropdownInput medics={medics} />

      <StandardTextInput patientSection={{ isAppointmentNumberInput: true }} />

      <StandardChoiceDropdown isAtHomeCareDropdownInput />

      <StandardChoiceDropdown
        isAfflictionDropdownInput
        afflictions={afflictions}
      />

      <StandardFileInput
        isNewPrescriptionFileInput
        setPrescriptionScan={setPrescriptionScan}
        setScanPreview={setScanPreview}
      />

      <CustomButton btnText={'Valider'} btnType="submit" normalButton />
    </form>
  );
}
