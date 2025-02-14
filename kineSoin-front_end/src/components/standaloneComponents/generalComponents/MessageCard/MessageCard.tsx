import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import French locale for Day.js
import { IPatient, ITherapist } from '../../../../@types/types';

interface MessageCardProps {
  isSentMessage?: boolean;
  isReceivedMessage?: boolean;
  content?: string;
  sender?: IPatient | ITherapist;
  isPatientMessage?: boolean;
  isTherapistMessage?: boolean;
  date?: string;
}

export default function MessageCard({
  content,
  sender,
  isPatientMessage,
  isTherapistMessage,
  date,
}: MessageCardProps) {
  const [formattedDate, setFormattedDate] = useState<string | undefined>();
  useEffect(() => {
    if (date) {
      // Set Day.js locale to French and format the date
      const formatted = dayjs(date).locale('fr').format('DD MMMM YYYY à HH:mm');
      setFormattedDate(formatted);
    }
  }, [date]);
  return (
    <>
      {sender && (
        <div
          className={`flex gap-5 items-center ${isPatientMessage ? 'justify-start' : 'justify-end'}`}
        >
          {isPatientMessage && (
            <img
              src={sender.picture_url}
              alt={sender.fullName}
              className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl border border-gray-400"
            />
          )}

          <div className="border border-gray-400 p-5 rounded-lg w-3/4 text-primaryBlue font-medium italic flex flex-col shadow-xl">
            <p className="text-xxs md:text-xs mb-1">{formattedDate}</p>
            <p>{content}</p>
          </div>

          {isTherapistMessage && (
            <img
              src={sender.picture_url}
              alt={sender.fullName}
              className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-2xl border border-gray-400"
            />
          )}
        </div>
      )}
    </>
  );
}
