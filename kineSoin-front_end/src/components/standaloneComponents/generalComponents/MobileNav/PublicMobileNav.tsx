import { NavLink } from 'react-router-dom';
import { publicLinks } from './constants/links';
import { usePatientRegisterGlobalContext } from '../../../../utils/contexts/PatientRegisterGlobalContext';
import { useEffect } from 'react';

export default function PublicMobileNav() {
  const {
    isFirstFormValidated,
    setIsFirstFormValidated,
    isSecondFormValidated,
    setIsSecondFormValidated,
    isThirdFormValidated,
    setIsThirdFormValidated,
    isGlobalFormSubmitted,
    setIsGlobalFormSubmitted,
  } = usePatientRegisterGlobalContext();

  const onClickBehavior = () => {
    if (isFirstFormValidated) {
      setIsFirstFormValidated(false);
    } else if (isSecondFormValidated) {
      setIsSecondFormValidated(false);
    } else if (isThirdFormValidated) {
      setIsThirdFormValidated(false);
    } else if (isGlobalFormSubmitted) {
      setIsGlobalFormSubmitted(false);
    }
  };

  useEffect(() => {
    console.log('isFirstFormValidated', isFirstFormValidated);
    console.log('isSecondFormValidated', isSecondFormValidated);
    console.log('isThirdFormValidated', isThirdFormValidated);
    console.log('isGlobalFormSubmitted', isGlobalFormSubmitted);
  }, [
    isFirstFormValidated,
    isSecondFormValidated,
    isThirdFormValidated,
    isGlobalFormSubmitted,
  ]);

  return (
    <div className="flex gap-2 justify-around w-full px-4 bg-primaryTeal py-3 md:hidden">
      {publicLinks.map((link, index) => (
        <NavLink
          to={link.path}
          key={index}
          className={({ isActive }) =>
            `flex flex-col w-16 items-center bg-white bg-opacity-50 justify-center text-center border shadow-2xl rounded-2xl p-2 ${
              isActive
                ? 'text-secondaryBlue font-bold italic ring-1 ring-primaryTeal scale-105 text-md animate-pulse'
                : 'text-primaryBlue'
            }`
          }
          onClick={onClickBehavior}
        >
          <img src={link.icon} alt={link.name} className="w-8 mb-1" />
          <p className="text-xxs font-medium">{link.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
