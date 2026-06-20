interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableCell({
  children,
  className = '',
}: TableCellProps) {
  return (
    <td className={`border border-gray-200 px-4 py-3 text-center ${className}`}>
      {children}
    </td>
  );
}
