interface TableHeadRefactorProps {
  secondHeaderContent: string;
  thirdHeaderContent: string;
  fourthHeaderContent?: string;
}

export default function TableHeadRefactor({
  secondHeaderContent,
  thirdHeaderContent,
  fourthHeaderContent,
}: TableHeadRefactorProps) {
  return (
    <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
      <tr>
        <>
          <th className="border border-gray-300 px-4 py-2 text-center rounded-tl-2xl">
            #id
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {secondHeaderContent}
          </th>

          <th className="border border-gray-300 px-4 py-2 text-center">
            {thirdHeaderContent}
          </th>

          {fourthHeaderContent && (
            <th className="border border-gray-300 px-4 py-2 text-center hidden md:table-cell  ">
              {fourthHeaderContent}
            </th>
          )}

          <th
            className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
            colSpan={2}
          >
            Action
          </th>
        </>
      </tr>
    </thead>
  );
}
