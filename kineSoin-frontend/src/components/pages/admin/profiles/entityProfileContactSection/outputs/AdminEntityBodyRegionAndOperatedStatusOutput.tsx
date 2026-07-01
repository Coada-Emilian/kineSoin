import type { AdminEntityBodyRegionAndOperatedStatusOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import regionIcon from '/icons/body-check.png';
import surgeryIcon from '/icons/surgery.png';

export default function AdminEntityBodyRegionAndOperatedStatusOutput({
  body_region,
  is_operated,
}: AdminEntityBodyRegionAndOperatedStatusOutputProps) {
  if (!body_region) return null;
  const body_region_name = body_region.name;

  if (is_operated === undefined) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <AdminEntityProfileInfoOutput
        icon={regionIcon}
        iconAlt="region corps"
        label="Region corps"
        value={body_region_name}
      ></AdminEntityProfileInfoOutput>

      <AdminEntityProfileInfoOutput
        icon={surgeryIcon}
        iconAlt="est opérée?"
        label="Est opérée?"
        value={is_operated}
      ></AdminEntityProfileInfoOutput>
    </div>
  );
}
