interface ButtonProps {
  btnText: string;
  normalButton?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  modifyButton?: boolean;
  deleteButton?: boolean;
  activeButton?: boolean;
  addButton?: boolean;
  allButton?: boolean;
  inactiveButton?: boolean;
  pendingButton?: boolean;
  bannedButton?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  btnText,
  normalButton,
  cancelButton,
  validateButton,
  modifyButton,
  deleteButton,
  activeButton,
  inactiveButton,
  pendingButton,
  bannedButton,
  addButton,
  allButton,
  btnType,
  onClick,
}: ButtonProps) {
  const getBtnBackground = () => {
    if (normalButton) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (cancelButton) {
      return 'bg-gray-200 hover:bg-gray-300';
    } else if (modifyButton) {
      return 'bg-blue-300 hover:bg-blue-500';
    } else if (deleteButton) {
      return 'bg-red-300 hover:bg-red-500';
    } else if (activeButton) {
      return 'bg-green-300 hover:bg-green-500';
    } else if (inactiveButton) {
      return 'bg-gray-200 hover:bg-gray-400';
    } else if (allButton) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (addButton) {
      return 'bg-blue-200 hover:blue-400';
    } else if (pendingButton) {
      return 'bg-yellow-300 hover:bg-yellow-500';
    } else if (bannedButton) {
      return 'bg-red-300 hover:bg-red-500';
    }
  };

  const getSizeAndPadding = () => {
    if (
      normalButton ||
      cancelButton ||
      validateButton ||
      modifyButton ||
      deleteButton
    ) {
      return 'text-sm p-4 py-2 min-w-24 my-0 mx-auto';
    } else if (
      activeButton ||
      inactiveButton ||
      allButton ||
      pendingButton ||
      bannedButton
    ) {
      return 'text-sm p-1 px-2 max-w-24 my-0 mx-0';
    } else if (addButton) {
      return 'text-sm p-1 px-2 max-w-52 my-0 mx-0';
    }
  };

  const btnClasses = `rounded-lg text-primaryBlue hover:text-white font-bold black ${getBtnBackground()} ${getSizeAndPadding()}`;

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      {btnText}
    </button>
  );
}
