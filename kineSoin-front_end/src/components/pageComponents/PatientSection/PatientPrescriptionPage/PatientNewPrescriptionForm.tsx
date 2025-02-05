import { useEffect, useState } from 'react';
import { IAffliction } from '../../../../@types/IAffliction';
import { IMedic } from '../../../../@types/IMedic';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import StandardDateInput from '../../../standaloneComponents/StandardInputs/StandardDateInput';
import StandardChoiceDropdown from '../../../standaloneComponents/StandardInputs/StandardDropdownInput';
import StandardFileInput from '../../../standaloneComponents/StandardInputs/StandardFileInput';
import StandardTextInput from '../../../standaloneComponents/StandardInputs/StandardTextInput';
import {
  fetchAfflictions,
  fetchMedics,
  handleNewPrescriptionCreation,
} from '../../../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';

interface PatientNewPrescriptionFormProps {
  windowWidth?: number;
  patientId?: number;
  scanPreview?: string | null;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PatientNewPrescriptionForm({
  windowWidth,
  patientId,
  scanPreview,
  setScanPreview,
}: PatientNewPrescriptionFormProps) {
  const [medics, setMedics] = useState<IMedic[]>([]);
  const [afflictions, setAfflictions] = useState<IAffliction[]>([]);

  const [newPrescriptionDate, setNewPrescriptionDate] = useState<string>();
  const [newPrescriptionMedicId, setNewPrescriptionMedicId] =
    useState<number>();
  const [newPrescriptionAfflictionId, setNewPrescriptionAfflictionId] =
    useState<number>();

  const [atHomeCare, setAtHomeCare] = useState<boolean>(false);
  const [prescriptionScan, setPrescriptionScan] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetchMedics();
      setMedics(response);
    };

    const fetchApiAfflictions = async () => {
      const response = await fetchAfflictions();
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
    if (newPrescriptionMedicId) {
      formData.append('medic_id', Number(newPrescriptionMedicId).toString());
    }
    if (newPrescriptionAfflictionId) {
      formData.append(
        'affliction_id',
        Number(newPrescriptionAfflictionId).toString()
      );
    }
    formData.append('at_home_care', atHomeCare.toString());
    formData.append('scan', prescriptionScan as File);

    if (patientId !== undefined) {
      const response = await handleNewPrescriptionCreation(formData);
      if (response) {
        navigate('/patient/dashboard');
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      encType="multipart/form-data"
      onSubmit={handleNewPrescriptionAdd}
    >
      <StandardDateInput
        isNewPrescriptionDateInput
        setNewPrescriptionDate={setNewPrescriptionDate}
      />

      <StandardChoiceDropdown
        isMedicDropdownInput
        setNewPrescriptionMedicId={setNewPrescriptionMedicId}
        medics={medics}
      />

      <StandardTextInput isAppointmentNumberInput />

      <StandardChoiceDropdown
        isAtHomeCareDropdownInput
        setAtHomeCare={setAtHomeCare}
      />

      <StandardChoiceDropdown
        isAfflictionDropdownInput
        afflictions={afflictions}
        setNewPrescriptionAfflictionId={setNewPrescriptionAfflictionId}
      />

      <StandardFileInput
        isNewPrescriptionFileInput
        setPrescriptionScan={setPrescriptionScan}
        windowWidth={windowWidth}
        scanPreview={scanPreview}
        setScanPreview={setScanPreview}
      />

      <CustomButton btnText={'Valider'} btnType="submit" normalButton />
    </form>
  );
}
