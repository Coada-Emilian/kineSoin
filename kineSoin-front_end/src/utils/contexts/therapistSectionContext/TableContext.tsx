import { createContext, useContext, useState } from 'react';

interface TableContextType {
  tableType: 'therapistPatients' | 'allPatients';
  setTableType: React.Dispatch<
    React.SetStateAction<'therapistPatients' | 'allPatients'>
  >;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tableType, setTableType] = useState<
    'therapistPatients' | 'allPatients'
  >('therapistPatients');

  return (
    <TableContext.Provider value={{ tableType, setTableType }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      'useTableContext must be used within a TableContextProvider'
    );
  }
  return context;
};
