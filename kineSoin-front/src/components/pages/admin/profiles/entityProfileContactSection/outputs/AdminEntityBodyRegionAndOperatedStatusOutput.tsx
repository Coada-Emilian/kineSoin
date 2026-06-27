import type { AdminEntityBodyRegionAndOperatedStatusOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

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
    <div className="flex flex-row justify-between">
      <AdminEntityProfileOutput
        value={body_region_name}
        label="Region corps"
        isOneThirdWidth
      />

      <AdminEntityProfileOutput
        value={is_operated}
        label="Est opérée?"
        isOneThirdWidth
      />
    </div>
  );
}
