export type IEntityTypes =
  | 'therapist'
  | 'patient'
  | 'affliction'
  | 'medic'
  | 'insurance';

export type IEntitiesInterfaces =
  | ITherapist[]
  | IPatient[]
  | IAffliction[]
  | IMedic[]
  | IInsurance[];

export type IEntityInterface =
  | ITherapist
  | IPatient
  | IAffliction
  | IMedic
  | IInsurance
  | IBodyRegion
  | null;

export type IModalTypes =
  | 'delete'
  | 'addAffliction'
  | 'region'
  | 'addTherapistP1'
  | 'addTherapistP2'
  | 'addTherapistP3'
  | 'addMedic'
  | 'addInsurance'
  | 'addRegion';

export type IFormOrders = 'first' | 'second' | 'third' | 'last';

export interface IDescriptionArticle {
  formOrder: IFormOrders;
  image: string;
  alt: string;
  paragraph: string;
  title: string;
}

export type IButtonTypes =
  | 'basicBtn'
  | 'cancelBtn'
  | 'modifyBtn'
  | 'deleteBtn'
  | 'activeBtn'
  | 'inactiveBtn'
  | 'addBtn'
  | 'pendingBtn'
  | 'bannedBtn';

export interface IButtonDetails {
  btnType: IButtonTypes;
  btnText: string | JSX.Element;
  isNormalBtn?: boolean;
  isNavBtn?: boolean;
  isStatusBtn?: boolean;
  isMobileBtn?: boolean;
  isFormBtn?: boolean;
  isLogoutBtn?: boolean;
  isNotificationBtn?: boolean;
  onClick?: () => void;
}
