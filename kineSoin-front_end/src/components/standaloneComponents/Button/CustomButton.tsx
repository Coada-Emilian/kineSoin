interface ButtonProps {
  btnText: string;
  normalBtn?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  btnText,
  normalBtn,
  cancelButton,
  validateButton,
  btnType,
  onClick,
}: ButtonProps) {
  const getBtnBackground = () => {
    if (normalBtn) {
      return 'bg-primaryTeal hover:bg-secondaryTeal';
    } else if (cancelButton) {
      return 'bg-gray-400 hover:bg-gray-600';
    }
  };

  const getSizeAndPadding = () => {
    if (normalBtn || cancelButton || validateButton) {
      return 'text-sm p-4 min-w-24 my-0';
    }
  };

  const btnClasses = `rounded-lg text-primaryBlue hover:text-white font-bold py-2 black mx-auto ${getBtnBackground()} ${getSizeAndPadding()}`;

  return (
    <button type={btnType} onClick={onClick} className={btnClasses}>
      {btnText}
    </button>
  );
}
