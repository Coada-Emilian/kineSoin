import { createContext, useContext, useState } from 'react';

interface UIContextType {
  isSendMessageModalOpen: boolean;
  setIsSendMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isCancelAppointmentModalOpen: boolean;
  setIsCancelAppointmentModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isDeletePatientModalOpen: boolean;
  setIsDeletePatientModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isInspectModalOpen: boolean;
  setIsInspectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isDynamicModeOn: boolean;
  setIsDynamicModeOn: React.Dispatch<React.SetStateAction<boolean>>;

  showParagraph: boolean;
  setShowParagraph: React.Dispatch<React.SetStateAction<boolean>>;

  isPatientProfileEditing: boolean;
  setIsPatientProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  handleDynamicModeClick: () => void;

  isPatientDetailsModalOpen: boolean;
  setIsPatientDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isAfflictionDetailsModalOpen: boolean;
  setIsAfflictionDetailsModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isAddAppointmentModalOpen: boolean;
  setIsAddAppointmentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [isCancelAppointmentModalOpen, setIsCancelAppointmentModalOpen] =
    useState(false);
  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [isDynamicModeOn, setIsDynamicModeOn] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [isPatientProfileEditing, setIsPatientProfileEditing] = useState(false);
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] =
    useState(false);
  const [isAfflictionDetailsModalOpen, setIsAfflictionDetailsModalOpen] =
    useState(false);

  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] =
    useState(false);

  const handleDynamicModeClick = () => {
    setIsDynamicModeOn((prev) => !prev);
    setShowParagraph(true);
    setTimeout(() => setShowParagraph(false), 3000);
  };

  return (
    <UIContext.Provider
      value={{
        isSendMessageModalOpen,
        setIsSendMessageModalOpen,
        isCancelAppointmentModalOpen,
        setIsCancelAppointmentModalOpen,
        isDeletePatientModalOpen,
        setIsDeletePatientModalOpen,
        isInspectModalOpen,
        setIsInspectModalOpen,
        isDynamicModeOn,
        setIsDynamicModeOn,
        showParagraph,
        setShowParagraph,
        handleDynamicModeClick,
        isPatientProfileEditing,
        setIsPatientProfileEditing,
        isPatientDetailsModalOpen,
        setIsPatientDetailsModalOpen,
        isAfflictionDetailsModalOpen,
        setIsAfflictionDetailsModalOpen,
        isAddAppointmentModalOpen,
        setIsAddAppointmentModalOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider');
  }
  return context;
};
