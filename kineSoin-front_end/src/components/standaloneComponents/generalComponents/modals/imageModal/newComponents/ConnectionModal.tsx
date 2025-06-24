import { Link } from 'react-router-dom';
import { publicNavbarButtonDetails } from '../../../../../../utils/constants/publicSection/standaloneComponents/publicNavbarButtonDetails';
import { usePatientRegisterContext } from '../../../../../../utils/contexts/PatientRegisterContext';
import BaseModal from '../../../../privateSection/therapistSection/modals/BaseModal';
import CustomBtn from '../../../customButton/newComponents/CustomButtonRefactor';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectionModal({
  isOpen,
  onClose,
}: ConnectionModalProps) {
  const details = publicNavbarButtonDetails;

  const { setFormOrder } = usePatientRegisterContext();

  const handleClick = () => {
    onClose();
    setFormOrder('first');
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8 flex flex-col items-center">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Choisissez votre type de connexion
        </h2>
        {details.map((button, index) => (
          <Link
            key={index}
            to={button.to}
            onClick={handleClick}
            className="hidden md:block"
          >
            <CustomBtn
              btn={{
                type: 'basic',
                text: button.text,
                style: 'hasIcon',
                onClick: handleClick,
                icon: button.icon,
              }}
            />
          </Link>
        ))}
      </div>
    </BaseModal>
  );
}
