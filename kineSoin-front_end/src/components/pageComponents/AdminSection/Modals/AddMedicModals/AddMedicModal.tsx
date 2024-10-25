import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import { handleMedicCreation } from '../../../../../utils/apiUtils';

interface AddMedicModalProps {
  isAddMedicModalOpen: boolean;
  setIsAddMedicModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FieldConfig {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  className?: string;
}

const fullWidthFields: FieldConfig[] = [
  { label: 'Nom', id: 'medic-name_input', name: 'name' },
  { label: 'Prénom', id: 'medic-surname_input', name: 'surname' },
  {
    label: 'Numéro téléphone',
    id: 'medic-phone-number_input',
    name: 'phone_number',
  },
  { label: 'Code ADELI', id: 'medic-licence-code_input', name: 'licence_code' },
];

const halfWidthFields: { left: FieldConfig; right: FieldConfig }[] = [
  {
    left: {
      label: 'Numéro rue',
      id: 'medic-street-number_input',
      name: 'street_number',
    },
    right: {
      label: 'Nom rue',
      id: 'medic-street-name_input',
      name: 'street_name',
    },
  },
  {
    left: {
      label: 'Code postal',
      id: 'medic-postal-code_input',
      name: 'postal_code',
    },
    right: { label: 'Ville', id: 'medic-city_input', name: 'city' },
  },
];

const FormField = ({
  label,
  id,
  name,
  required = true,
  className = '',
}: FieldConfig) => (
  <div className={className}>
    <label
      htmlFor={id}
      className="block text-xs md:text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={name}
      className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
      required={required}
    />
  </div>
);

export default function AddMedicModal({
  isAddMedicModalOpen,
  setIsAddMedicModalOpen,
}: AddMedicModalProps) {
  const createMedic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await handleMedicCreation(formData);
      if (response) {
        form.reset();
        setIsAddMedicModalOpen(false);
        window.location.reload();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ReactModal
      isOpen={isAddMedicModalOpen}
      onRequestClose={() => setIsAddMedicModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un médecin
        </h2>
        <form className="space-y-4" onSubmit={createMedic}>
          {fullWidthFields.map((field) => (
            <FormField key={field.id} {...field} />
          ))}

          {halfWidthFields.map(({ left, right }, index) => (
            <div className="flex gap-2" key={index}>
              <FormField {...left} className="w-2/5" />
              <FormField {...right} />
            </div>
          ))}

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />
            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddMedicModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
