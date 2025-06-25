import { createContext, useContext, useState } from 'react';
import { ISameDayAppointment } from '../../@types/interfaces/customInterfaces';

interface TherapistDayTableContextType {
  isSendMessageModalOpen: boolean;
  setIsSendMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCancelAppointmentModalOpen: boolean;
  setIsCancelAppointmentModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  tableAppointments: ISameDayAppointment[];
  setTableAppointments: React.Dispatch<
    React.SetStateAction<ISameDayAppointment[]>
  >;
  selectedPatient: ISameDayAppointment['patient'] | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['patient'] | null>
  >;
  isDynamicModeOn: boolean;
  setIsDynamicModeOn: React.Dispatch<React.SetStateAction<boolean>>;
  showParagraph: boolean;
  setShowParagraph: React.Dispatch<React.SetStateAction<boolean>>;
  handleDynamicModeClick: () => void;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<ISameDayAppointment | null>
  >;
  selectedAppointment: ISameDayAppointment | null;
  selectedPrescription: ISameDayAppointment['prescription'] | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['prescription'] | null>
  >;
}

const TherapistDayTableContext = createContext<
  TherapistDayTableContextType | undefined
>(undefined);

interface TherapistDayTableContextProviderProps {
  children: React.ReactNode;
}

export const TherapistDayTableContextProvider = ({
  children,
}: TherapistDayTableContextProviderProps) => {
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);

  const [isCancelAppointmentModalOpen, setIsCancelAppointmentModalOpen] =
    useState(false);

  const [tableAppointments, setTableAppointments] = useState<
    ISameDayAppointment[]
  >([]);

  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);

  const [selectedAppointment, setSelectedAppointment] =
    useState<ISameDayAppointment | null>(null);

  const [selectedPrescription, setSelectedPrescription] = useState<
    ISameDayAppointment['prescription'] | null
  >(null);

  const [isDynamicModeOn, setIsDynamicModeOn] = useState(false);

  const [showParagraph, setShowParagraph] = useState(false);

  const handleDynamicModeClick = () => {
    setIsDynamicModeOn(!isDynamicModeOn);

    if (!isDynamicModeOn || isDynamicModeOn) {
      setShowParagraph(true);
      setTimeout(() => {
        setShowParagraph(false);
      }, 3000);
    }
  };
  return (
    <TherapistDayTableContext.Provider
      value={{
        isSendMessageModalOpen,
        setIsSendMessageModalOpen,
        isCancelAppointmentModalOpen,
        setIsCancelAppointmentModalOpen,
        tableAppointments,
        setTableAppointments,
        selectedPatient,
        setSelectedPatient,
        isDynamicModeOn,
        setIsDynamicModeOn,
        showParagraph,
        setShowParagraph,
        handleDynamicModeClick,
        setSelectedAppointment,
        selectedAppointment,
        selectedPrescription,
        setSelectedPrescription,
      }}
    >
      {children}
    </TherapistDayTableContext.Provider>
  );
};

export const useTherapistDayTableContext = () => {
  const context = useContext(TherapistDayTableContext);
  if (context === undefined) {
    throw new Error(
      'useTherapistDayTableContext must be used within a TherapistDayTableContextProvider'
    );
  }
  return context;
};

export default TherapistDayTableContext;
