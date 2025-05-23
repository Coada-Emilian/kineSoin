import { IBodyRegion } from '../../../../../../../../../@types/interfaces/modelInterfaces';
import BodyRegionOutputRefactor from './BodyRegionOutputRefactor';
import IsOperatedOutputRefactor from './IsOperatedOutputRefactor';

interface BodyRegionAndOperatedStatusOutputRefactorProps {
  body_region: IBodyRegion | undefined;
  is_operated: boolean | undefined;
}

export default function BodyRegionAndOperatedStatusOutputRefactor({
  body_region,
  is_operated,
}: BodyRegionAndOperatedStatusOutputRefactorProps) {
  return (
    <div className="flex flex-row justify-between">
      <BodyRegionOutputRefactor body_region={body_region} />
      <IsOperatedOutputRefactor is_operated={is_operated} />
    </div>
  );
}
