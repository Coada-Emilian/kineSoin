import type { TableHeadProps } from '../../../../../@types/props/customProps';

export default function TableHead({
  secondHeaderContent,
  thirdHeaderContent,
  fourthHeaderContent,
}: TableHeadProps) {
  return (
    <thead className="bg-gray-50 text-gray-700 text-sm md:text-base">
      <tr>
        <th className="px-4 py-3 text-center font-semibold">#id</th>

        <th className="px-4 py-3 text-center font-semibold">
          {secondHeaderContent}
        </th>

        <th className="px-4 py-3 text-center font-semibold">
          {thirdHeaderContent}
        </th>

        {fourthHeaderContent && (
          <th className="hidden md:table-cell px-4 py-3 text-center font-semibold">
            {fourthHeaderContent}
          </th>
        )}

        <th className="px-4 py-3 text-center font-semibold" colSpan={2}>
          Action
        </th>
      </tr>
    </thead>
  );
}
