import { createContext, useState } from 'react';

interface UIContextType {
  isPatientProfileEditing: boolean;
  setIsPatientProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  openModal: string | null;
  setOpenModal: (modal: string | null) => void;

  closeModal: () => void;
}

const TherapistUiContext = createContext<UIContextType | undefined>(undefined);

export const TherapistUiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPatientProfileEditing, setIsPatientProfileEditing] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <TherapistUiContext.Provider
      value={{
  

        isPatientProfileEditing,
        setIsPatientProfileEditing,

        openModal,
        setOpenModal,

        closeModal,
      }}
    >
      {children}
    </TherapistUiContext.Provider>
  );
};

export default TherapistUiContext;
