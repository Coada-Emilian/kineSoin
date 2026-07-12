import type {
  IButtonDetails,
  IHomePageArticle,
  IPublicArticle,
} from '../interfaces/componentInterfaces';
import type { IBasicUser } from '../interfaces/customInterfaces';
import type { IBodyRegion } from '../interfaces/modelInterfaces';
import type { ModalButtonSectionMode } from '../types/buttonTypes';
import type { ErrorPageType } from '../types/errorTypes';

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

export interface BaseEntityOutputContainerProps {
  icon: string;
  iconAlt: string;
  label: string;
  value: string;
}

export interface BaseEntityProfileOutputProps {
  label: string;
  value: string | number | undefined;
  isTextArea?: boolean;
  isOneThirdWidth?: boolean;
}

export interface EntityIdOutputProps {
  id?: number | null;
}

export interface EntityAgeAndGenderOutputProps {
  age: string | undefined;
  gender: string | undefined;
}

export interface EntityStatusOutputProps {
  status: string | undefined;
}

export interface EntityNameOutputProps {
  name: string | undefined;
  surname: string | undefined;
}

export interface EntityEmailOutputProps {
  email: string | undefined;
}

export interface EntityTelephoneNumberOutputProps {
  prefix: string | undefined;
  phone_number: string | undefined;
}

export interface EntityAddressOutputProps {
  city: string | undefined;
  postal_code: string | undefined;
  street_number: string | undefined;
  street_name: string | undefined;
}

export interface EntityCodeOutputProps {
  amc_code?: string | undefined;
  insurance_code?: string | undefined;
  licence_code?: string | undefined;
}

export interface EntityBodyRegionAndOperatedStatusOutputProps {
  body_region: IBodyRegion | undefined;
  is_operated: string | undefined;
}

export interface EntityStudiesOutputProps {
  diploma?: string | undefined;
  experience?: string | undefined;
  specialty?: string | undefined;
}

export interface EntityDescriptionOutputProps {
  description: string | undefined;
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
