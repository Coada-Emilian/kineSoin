import DescriptionSection from '../DescriptionSection/DescriptionSection';
import FormSection from '../FormSection/FormSection';
import HeadBand from '../HeadBand/HeadBand';

export default function Main() {
  return (
    <main className="flex items-center justify-center h-fit md:w-full md:h-fit bg-gray-100">
      <div className="flex flex-col h-fit md:w-full">
        <FormSection />
        <HeadBand />
        <DescriptionSection />
      </div>
    </main>
  );
}
