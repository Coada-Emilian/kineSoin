import { createContext, useContext, useState } from 'react';
import { ICalendarEvent } from '../../../@types/interfaces/customInterfaces';

interface CalendarContextType {
  calendarEvents: ICalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<ICalendarEvent[]>>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [calendarEvents, setCalendarEvents] = useState<ICalendarEvent[]>([]);

  return (
    <CalendarContext.Provider value={{ calendarEvents, setCalendarEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarContextProvider'
    );
  }
  return context;
};
