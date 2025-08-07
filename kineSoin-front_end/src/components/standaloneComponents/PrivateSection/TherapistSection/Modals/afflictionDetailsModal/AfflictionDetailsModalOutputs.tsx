import BaseOutput from '../../../../generalComponents/BaseOutput';

interface AfflictionDetailsModalOutputsProps {
  selectedAffliction:
    | {
        id: number;
        name: string;
        insurance_code: string;
        description: string;
      }
    | undefined;
}

export default function AfflictionDetailsModalOutputs({
  selectedAffliction,
}: AfflictionDetailsModalOutputsProps) {
  return (
    <div className="w-full p-4 md:pt-10 md:px-12">
      <BaseOutput label="ID" value={selectedAffliction?.id} />
      <BaseOutput label="Nom" value={selectedAffliction?.name} />
      <BaseOutput
        label="Code assurance"
        value={selectedAffliction?.insurance_code}
      />
      <BaseOutput
        label="Description"
        value={selectedAffliction?.description}
        isTextArea
      />
    </div>
  );
}
