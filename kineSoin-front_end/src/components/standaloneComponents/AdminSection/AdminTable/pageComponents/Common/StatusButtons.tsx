// Purpose: The purpose of this component is to render the therapist status buttons.

import { StatusButtonsProps } from '../../../../../../@types/props';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';

export default function StatusButtons({
  isTherapistStatusButtons,
  setTherapistStatus,
  isPatientStatusButtons,
  setPatientStatus,
  isAfflictionStatusButtons,
  setAfflictionStatus,
}: StatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <>
        {(isPatientStatusButtons ||
          isTherapistStatusButtons ||
          isAfflictionStatusButtons) && (
          <>
            {(isPatientStatusButtons ||
              isTherapistStatusButtons ||
              isAfflictionStatusButtons) && (
              <CustomButton
                btnText="Tous"
                allButton
                onClick={() => {
                  setTherapistStatus && setTherapistStatus('all');
                  setPatientStatus && setPatientStatus('all');
                  setAfflictionStatus && setAfflictionStatus('all');
                }}
              />
            )}

            {(isPatientStatusButtons || isTherapistStatusButtons) && (
              <>
                <CustomButton
                  btnText="Actifs"
                  activeButton
                  onClick={() => {
                    setTherapistStatus && setTherapistStatus('active');
                    setPatientStatus && setPatientStatus('active');
                  }}
                />

                <CustomButton
                  btnText="Inactifs"
                  inactiveButton
                  onClick={() => {
                    setTherapistStatus && setTherapistStatus('inactive');
                    setPatientStatus && setPatientStatus('inactive');
                  }}
                />
              </>
            )}
          </>
        )}

        {isPatientStatusButtons && setPatientStatus && (
          <>
            <CustomButton
              btnText="En attente"
              pendingButton
              onClick={() => {
                setPatientStatus('pending');
              }}
            />

            <CustomButton
              btnText="Banis"
              bannedButton
              onClick={() => {
                setPatientStatus('banned');
              }}
            />
          </>
        )}

        {isAfflictionStatusButtons && setAfflictionStatus && (
          <>
            <CustomButton
              btnText="Opérées"
              activeButton
              onClick={() => {
                setAfflictionStatus('operated');
              }}
            />

            <CustomButton
              btnText="Non-opérées"
              inactiveButton
              onClick={() => {
                setAfflictionStatus('non-operated');
              }}
            />
          </>
        )}
      </>
    </div>
  );
}
