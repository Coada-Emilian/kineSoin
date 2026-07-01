import type { AdminEntityDescriptionOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';
import descriptionIcon from '/icons/description.png';

export default function AdminEntityDescriptionOutput({
  description,
}: AdminEntityDescriptionOutputProps) {
  return (
    <div className="flex  gap-2 mb-2">
      {' '}
      <img
        src={descriptionIcon}
        alt="description"
        className="h-4 w-4 md:h-6 md:w-6"
      />
      <AdminEntityProfileOutput
        value={description}
        label="Description"
        isTextArea
      />{' '}
    </div>
  );
}
