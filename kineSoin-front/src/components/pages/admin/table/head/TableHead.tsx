import type { AdminTableHeadProps } from '../../../../../@types/props/adminProps';

export default function TableHead({
  secondHeaderContent,
  thirdHeaderContent,
  fourthHeaderContent,
}: AdminTableHeadProps) {
  const headerClass =
    'px-5 py-3 text-center font-semibold text-gray-600 uppercase tracking-wide text-xs md:text-sm';

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className={headerClass}>#id</th>

        <th className={headerClass}>{secondHeaderContent}</th>

        <th className={headerClass}>{thirdHeaderContent}</th>

        {fourthHeaderContent && (
          <th className={`${headerClass} hidden md:table-cell`}>
            {fourthHeaderContent}
          </th>
        )}

        <th className={headerClass} colSpan={2}>
          Action
        </th>
      </tr>
    </thead>
  );
}
