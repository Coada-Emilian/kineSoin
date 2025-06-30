import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';

export default function DayTableDynamicParagraph() {
  const { isDynamicModeOn, showParagraph } = useTherapistSectionContext();

  return (
    <>
      {showParagraph && (
        <p className="w-2/6 text-xs md:w-1/6 text-mdp-2 text-primaryBlue text-center rounded-xl italic font-medium">
          Dynamic mode is{' '}
          {isDynamicModeOn ? (
            <span className="text-green-500">ON</span>
          ) : (
            <span className="text-red-500">OFF</span>
          )}
        </p>
      )}
    </>
  );
}
