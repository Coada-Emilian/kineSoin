import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import BaseOutput from '../../../../generalComponents/BaseOutput';

interface BodyRegionOutputRefactorProps {
  body_region: IBodyRegion | undefined;
}

export default function BodyRegionOutputRefactor({
  body_region,
}: BodyRegionOutputRefactorProps) {
  if (!body_region) return null;
  const body_region_name = body_region.name;
  return (
    <BaseOutput value={body_region_name} label="Region corps" isOneThirdWidth />
  );
}
