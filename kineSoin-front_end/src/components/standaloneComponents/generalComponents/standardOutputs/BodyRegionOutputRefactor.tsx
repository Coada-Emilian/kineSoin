import { IBodyRegion } from '../../../../@types/interfaces/modelInterfaces';
import BaseOutput from '../BaseOutput';

interface BodyRegionOutputRefactorProps {
  body_region: IBodyRegion | undefined;
}

export default function BodyRegionOutputRefactor({
  body_region,
}: BodyRegionOutputRefactorProps) {

  return (
    <BaseOutput value={body_region_name} label="Region corps" isOneThirdWidth />
  );
}
