import { createContext, useState } from 'react';

interface UIContextType {
  isDynamicModeOn: boolean;
  setIsDynamicModeOn: React.Dispatch<React.SetStateAction<boolean>>;

  showParagraph: boolean;
  setShowParagraph: React.Dispatch<React.SetStateAction<boolean>>;

  isPatientProfileEditing: boolean;
  setIsPatientProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  handleDynamicModeClick: () => void;

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
  const [isDynamicModeOn, setIsDynamicModeOn] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [isPatientProfileEditing, setIsPatientProfileEditing] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const closeModal = () => {
    setOpenModal(null);
  };

  const handleDynamicModeClick = () => {
    setIsDynamicModeOn((prev) => !prev);
    setShowParagraph(true);
    setTimeout(() => setShowParagraph(false), 3000);
  };

  return (
    <TherapistUiContext.Provider
      value={{
        isDynamicModeOn,
        setIsDynamicModeOn,
        showParagraph,
        setShowParagraph,
        handleDynamicModeClick,
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
