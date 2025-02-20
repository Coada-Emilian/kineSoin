import { useEffect, useState } from 'react';
import { fetchPatientMessages } from '../../../../utils/apiUtils';
import MessageCard from '../MessageCard/MessageCard';
import { IPatientMessage } from '../../../../@types/types';

interface MessagesFieldProps {
  patientId?: number;
  isPatientMessagesField?: boolean;
}

export default function MessagesField({
  patientId,
  isPatientMessagesField,
}: MessagesFieldProps) {
  const windowWidth = window.innerWidth;
  const [sentPatientMessages, setSentPatientMessages] =
    useState<IPatientMessage[]>();
  const [receivedPatientMessages, setReceivedPatientMessages] =
    useState<IPatientMessage[]>();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchPatientMessages();
        setReceivedPatientMessages(response.receivedMessages);
        setSentPatientMessages(response.sentMessages);
      } catch (error) {
        console.error('Error fetching patient messages:', error);
      }
    };
    fetchMessages();
  }, [patientId]);

  const allPatientMessages = [
    ...(sentPatientMessages || []),
    ...(receivedPatientMessages || []),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      {isPatientMessagesField &&
        allPatientMessages &&
        allPatientMessages.length > 0 && (
          <div className="flex flex-col gap-6 px-6 w-full h-[450px] md:h-[700px] overflow-y-auto">
            {allPatientMessages.map((message) => (
              <MessageCard
                key={message.content}
                content={message.content}
                sender={message.sender}
                isPatientMessage={'therapist_id' in message.sender} // Check if sender has therapist_id
                isTherapistMessage={!('therapist_id' in message.sender)} // Opposite condition
                date={message.date}
              />
            ))}
          </div>
        )}
    </>
  );
}
