import type {
  IButtonDetails,
  IHomePageArticle,
  IPublicArticle,
} from '../interfaces/componentInterfaces';
import type { IBasicUser } from '../interfaces/customInterfaces';
import type { IBodyRegion } from '../interfaces/modelInterfaces';
import type { IDropdownAction } from '../interfaces/therapistInterfaces';
import type { ModalButtonSectionMode } from '../types/buttonTypes';
import type { ErrorPageType } from '../types/errorTypes';
import type { TherapistPatientQuickFilterTypes } from '../types/therapistTypes';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export interface PublicRouteDetailsProps {
  path?: string;
  element: ComponentType;
  index?: boolean;
}

export interface IHomePageArticleProps {
  article: IHomePageArticle;
}

export interface PublicArticleRowProps {
  article: IPublicArticle;
}

export interface ErrorPageProps {
  type: ErrorPageType;
}

export interface AdminAddTherapistButtonSectionProps {
  onClose?: () => void;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddRegionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BodyRegionsTableBodyProps {
  bodyRegions: IBodyRegion[];
}

export interface ModalButtonSectionProps {
  onClose?: () => void;
  setNextModal?: () => void;
  mode: ModalButtonSectionMode;
}

export interface NavbarLogoProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export interface TherapistHeroProps {
  userProfile: IBasicUser;
  message: React.ReactNode;
}
export interface EntityOutputIsVerticalProps {
  isVertical?: boolean;
}

export interface BaseEntityOutputContainerProps extends EntityOutputIsVerticalProps {
  icon: string;
  iconAlt: string;
  label?: string;
  value: string;
}

export interface BaseEntityProfileOutputProps extends EntityOutputIsVerticalProps {
  label: string;
  value: string | number | undefined;
  isTextArea?: boolean;
  isOneThirdWidth?: boolean;
  isAgeOutput?: boolean;
}

export interface EntityIdOutputProps extends EntityOutputIsVerticalProps {
  id?: number | null;
}

export interface EntityAgeAndGenderOutputProps extends EntityOutputIsVerticalProps {
  age: string | undefined;
  gender: string | undefined;
}

export interface EntityAgeOutputProps extends EntityOutputIsVerticalProps {
  age: string | undefined;
  isLabelMissing?: boolean;
}

export interface EntityGenderOutputProps extends EntityOutputIsVerticalProps {
  gender: string | undefined;
  isLabelMissing?: boolean;
}

export interface EntityStatusOutputProps extends EntityOutputIsVerticalProps {
  status: string | undefined;
  isLabelMissing?: boolean;
}

export interface EntityNameOutputProps extends EntityOutputIsVerticalProps {
  name: string | undefined;
  surname: string | undefined;
}

export interface EntityEmailOutputProps extends EntityOutputIsVerticalProps {
  email: string | undefined;
}

export interface EntityTelephoneNumberOutputProps extends EntityOutputIsVerticalProps {
  prefix: string | undefined;
  phone_number: string | undefined;
}

export interface EntityAddressOutputProps extends EntityOutputIsVerticalProps {
  city: string | undefined;
  postal_code: string | undefined;
  street_number: string | undefined;
  street_name: string | undefined;
}

export interface EntityCodeOutputProps extends EntityOutputIsVerticalProps {
  amc_code?: string | undefined;
  insurance_code?: string | undefined;
  licence_code?: string | undefined;
}

export interface EntityBodyRegionAndOperatedStatusOutputProps extends EntityOutputIsVerticalProps {
  body_region: IBodyRegion | undefined;
  is_operated: string | undefined;
}

export interface EntityStudiesOutputProps extends EntityOutputIsVerticalProps {
  diploma?: string | undefined;
  experience?: string | undefined;
  specialty?: string | undefined;
}

export interface EntityDescriptionOutputProps extends EntityOutputIsVerticalProps {
  description: string | undefined;
}

export interface EntityDateOutputProps extends EntityOutputIsVerticalProps {
  date: string | Date | undefined;
}

export interface EntityMedicOutputProps extends EntityOutputIsVerticalProps {
  medic: {
    id: number;
    surname: string;
    name: string;
  };
}

export interface EntityAfflictionOutputProps extends EntityOutputIsVerticalProps {
  affliction: {
    id: number;
    name: string;
  };
}

export interface EntityBodyRegionOutputProps extends EntityOutputIsVerticalProps {
  bodyRegionName: string | undefined;
}

export interface EntityPatientOutputProps extends EntityOutputIsVerticalProps {
  patient: {
    id: number;
    surname: string;
    name: string;
  };
}

export interface EntityHomeCareOutputProps extends EntityOutputIsVerticalProps {
  at_home_care: boolean;
}

export interface EntityInsuranceOutputProps extends EntityOutputIsVerticalProps {
  insuranceName: string | undefined;
}

export interface EntityAdherentNumberOutputProps extends EntityOutputIsVerticalProps {
  adherentNumber: string | undefined;
}

export interface EntityContractNumberOutputProps extends EntityOutputIsVerticalProps {
  contractNumber: string | undefined;
}

export interface EntityValidUntilOutputProps extends EntityOutputIsVerticalProps {
  validUntil: string | Date | undefined;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export interface PatientsLinkButtonsProps {
  selectedFilter: TherapistPatientQuickFilterTypes;
  onSelect: (filter: TherapistPatientQuickFilterTypes) => void;
}

export interface ActionDropdownProps {
  actions: IDropdownAction[];
  isTimePassed?: boolean;
}

export interface ActionButtonProps {
  onClick: () => void;
  imgSrc: string;
  altText: string;
  isTimePassed?: boolean;
  altImgSrc?: string;
}

export interface TherapistCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  padded?: boolean;
}

export interface PrescriptionProgressBarProps {
  completedAppointments: number;
  totalAppointments: number;
  progress: number;
}
