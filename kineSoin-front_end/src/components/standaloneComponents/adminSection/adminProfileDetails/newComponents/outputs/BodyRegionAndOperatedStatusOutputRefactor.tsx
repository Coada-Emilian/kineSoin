/**
 * @component BodyRegionAndOperatedStatusOutputRefactor
 *
 * Displays information about the body region and operated status side by side.
 * It uses BodyRegionOutputRefactor to display the body region details,
 * and IsOperatedOutputRefactor to show whether the region is operated.
 *
 * @param {Object} props
 * @param {IBodyRegion | undefined} props.body_region - The body region object containing relevant data.
 * @param {string} props.is_operated - The operated status as a string.
 *
 * @returns {JSX.Element} A flex container with body region and operated status outputs.
 *
 * @example
 * <BodyRegionAndOperatedStatusOutputRefactor
 *    body_region={{ id: 1, name: "Lower Back" }}
 *    is_operated="yes"
 * />
 */

import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import BodyRegionOutputRefactor from './BodyRegionOutputRefactor';
import IsOperatedOutputRefactor from './IsOperatedOutputRefactor';

interface BodyRegionAndOperatedStatusOutputRefactorProps {
  body_region: IBodyRegion | undefined;
  is_operated: string;
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
