interface ButtonProps {
  btnText: string;
  normalBtn?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  modifyButton?: boolean;
  deleteButton?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  btnText,
  normalBtn,
  cancelButton,
  validateButton,
  modifyButton,
  deleteButton,
  btnType,
  onClick,
}: ButtonProps) {
  const getBtnBackground = () => {
    if (normalBtn) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (cancelButton) {
      return 'bg-gray-400 hover:bg-gray-600';
    } else if (modifyButton) {
      return 'bg-blue-300 hover:bg-blue-500';
    } else if (deleteButton) {
      return 'bg-red-300 hover:bg-red-500';
    }
  };

  const getSizeAndPadding = () => {
    if (
      normalBtn ||
      cancelButton ||
      validateButton ||
      modifyButton ||
      deleteButton
    ) {
      return 'text-sm p-4 py-2 min-w-24 my-0';
    }
  };

  const btnClasses = `rounded-lg text-primaryBlue hover:text-white font-bold black mx-auto ${getBtnBackground()} ${getSizeAndPadding()}`;

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      {btnText}
    </button>
  );
}
