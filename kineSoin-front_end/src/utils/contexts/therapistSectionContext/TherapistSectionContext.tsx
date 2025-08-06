import { createContext, useContext, useState } from 'react';
import {
  ICalendarAppointment,
  ICalendarEvent,
  IPatientAppointmentDetails,
  ISameDayAppointment,
  ITherapistPatientDetails,
  IUserProfile,
} from '../../../@types/interfaces/customInterfaces';

interface TherapistSectionContextType {
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

  selectedAppointment: ISameDayAppointment | null;
  setSelectedAppointment: React.Dispatch<
    React.SetStateAction<ISameDayAppointment | null>
  >;

  selectedPrescription: ISameDayAppointment['prescription'] | null;
  setSelectedPrescription: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['prescription'] | null>
  >;

  isDeletePatientModalOpen: boolean;
  setIsDeletePatientModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  therapistPatients: IUserProfile[];
  setTherapistPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;

  allPatients: IUserProfile[];
  setAllPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;

  tableType: 'therapistPatients' | 'allPatients';
  setTableType: React.Dispatch<
    React.SetStateAction<'therapistPatients' | 'allPatients'>
  >;

  patientDetails: ITherapistPatientDetails | null;
  setPatientDetails: React.Dispatch<
    React.SetStateAction<ITherapistPatientDetails | null>
  >;

  isPatientProfileEditing: boolean;
  setIsPatientProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;

  therapistProfiles: IUserProfile[];
  setTherapistProfiles: React.Dispatch<React.SetStateAction<IUserProfile[]>>;

  calendarEvents: ICalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<ICalendarEvent[]>>;

  allAppointments: ICalendarAppointment[];
  setAllAppointments: React.Dispatch<
    React.SetStateAction<ICalendarAppointment[]>
  >;

  previousPatientAppointments: IPatientAppointmentDetails[];
  setPreviousPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;

  upcomingPatientAppointments: IPatientAppointmentDetails[];
  setUpcomingPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;

  isInspectModalOpen: boolean;
  setIsInspectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  basicTherapistDetails?: IUserProfile;
  setBasicTherapistDetails?: React.Dispatch<
    React.SetStateAction<IUserProfile | undefined>
  >;
}

const TherapistSectionContext = createContext<
  TherapistSectionContextType | undefined
>(undefined);

interface TherapistSectionContextProviderProps {
  children: React.ReactNode;
}

export const TherapistSectionContextProvider = ({
  children,
}: TherapistSectionContextProviderProps) => {
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

  const [patientDetails, setPatientDetails] =
    useState<ITherapistPatientDetails | null>(null);

  const [isDynamicModeOn, setIsDynamicModeOn] = useState(false);

  const [showParagraph, setShowParagraph] = useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState<boolean>(false);

  const [therapistPatients, setTherapistPatients] = useState<IUserProfile[]>(
    []
  );

  const [allPatients, setAllPatients] = useState<IUserProfile[]>([]);

  const [tableType, setTableType] = useState<
    'therapistPatients' | 'allPatients'
  >('therapistPatients');

  const [isPatientProfileEditing, setIsPatientProfileEditing] = useState(false);

  const [therapistProfiles, setTherapistProfiles] = useState<IUserProfile[]>(
    []
  );

  const [calendarEvents, setCalendarEvents] = useState<ICalendarEvent[]>([]);

  const [allAppointments, setAllAppointments] = useState<
    ICalendarAppointment[]
  >([]);

  const [previousPatientAppointments, setPreviousPatientAppointments] =
    useState<IPatientAppointmentDetails[]>([]);

  const [upcomingPatientAppointments, setUpcomingPatientAppointments] =
    useState<IPatientAppointmentDetails[]>([]);

  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);

  const [basicTherapistDetails, setBasicTherapistDetails] =
    useState<IUserProfile>();

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
    <TherapistSectionContext.Provider
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
        isDeletePatientModalOpen,
        setIsDeletePatientModalOpen,
        therapistPatients,
        setTherapistPatients,
        allPatients,
        setAllPatients,
        tableType,
        setTableType,
        patientDetails,
        setPatientDetails,
        isPatientProfileEditing,
        setIsPatientProfileEditing,
        therapistProfiles,
        setTherapistProfiles,
        calendarEvents,
        setCalendarEvents,
        allAppointments,
        setAllAppointments,
        previousPatientAppointments,
        setPreviousPatientAppointments,
        upcomingPatientAppointments,
        setUpcomingPatientAppointments,
        isInspectModalOpen,
        setIsInspectModalOpen,
        basicTherapistDetails,
        setBasicTherapistDetails,
      }}
    >
      {children}
    </TherapistSectionContext.Provider>
  );
};

export const useTherapistSectionContext = () => {
  const context = useContext(TherapistSectionContext);
  if (context === undefined) {
    throw new Error(
      'useTherapistSectionContext must be used within a useTherapistSectionContextProvider'
    );
  }
  return context;
};

export default TherapistSectionContext;
