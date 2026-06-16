import BaseOutput from '../BaseOutput';

export default function InsuranceNameOutput({
  insuranceName,
}: {
  insuranceName: string | undefined;
}) {
  return <BaseOutput label="Mutuelle" value={insuranceName} />;
}
