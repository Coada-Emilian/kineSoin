import { useEffect, useState } from 'react';
import { IPatient } from '../../../../@types/IPatient';
import { ITherapist } from '../../../../@types/ITherapist';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import French locale for Day.js

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
      {isPatientMessage && sender && (
        <div className="flex gap-5 items-center justify-start">
          <img
            src={sender.picture_url}
            alt={sender.fullName}
            className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-around"
          />
          <div className="border border-gray-400 p-5 rounded-lg w-3/4 text-primaryBlue italic flex flex-col">
            <p className="text-xxs">{formattedDate}</p>
            <p>{content}</p>
          </div>
        </div>
      )}

      {isTherapistMessage && sender && (
        <div className="flex gap-5 items-center justify-end">
          <div className="border border-gray-400 p-5 rounded-lg w-3/4 text-primaryBlue italic flex flex-col">
            <p className="text-xxs">{formattedDate}</p>
            <p>{content}</p>
          </div>
          <img
            src={sender.picture_url}
            alt={sender.fullName}
            className="w-16 h-16 md:w-24 md:h-24 xl:w-30 xl:h-30 rounded-full object-cover shadow-around"
          />
        </div>
      )}
    </>
  );
}
