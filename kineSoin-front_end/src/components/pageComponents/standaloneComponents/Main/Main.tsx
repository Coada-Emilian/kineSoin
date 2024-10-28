import DescriptionSection from '../DescriptionSection/DescriptionSection';
import FormSection from '../FormSection/FormSection';
import HeadBand from '../HeadBand/HeadBand';

interface MainProps {
  isHomePageMain?: boolean;
  isPatientLoginPageMain?: boolean;
  isTherapistLoginPageMain?: boolean;
}

export default function Main({
  isHomePageMain,
  isPatientLoginPageMain,
  isTherapistLoginPageMain,
}: MainProps) {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-fit">
        <>
          <FormSection
            isHomePageFormSection={isHomePageMain ?? false}
            isPatientLoginPageFormSection={isPatientLoginPageMain ?? false}
            isTherapistLoginPageFormSection={isTherapistLoginPageMain ?? false}
          />
          <HeadBand />
          <DescriptionSection
            isHomePageDescriptionSection={isHomePageMain ?? false}
            isPatientLoginPageDescriptionSection={
              isPatientLoginPageMain ?? false
            }
            isTherapistLoginPageDescriptionSection={
              isTherapistLoginPageMain ?? false
            }
          />
        </>
      </div>
    </main>
  );
}
