import { useEffect, useState } from 'react';
import { fetchPatientMessages } from '../../../../utils/apiUtils';
import MessageCard from './MessageCard';
import { IPatientMessage } from '../../../../@types/IPatientMessage';

interface PatientMessagesFieldProps {
  windowWidth?: number;
  patientId?: number;
}

export default function PatientMessagesField({
  windowWidth,
  patientId,
}: PatientMessagesFieldProps) {
  const [sentPatientMessages, setSentPatientMessages] =
    useState<IPatientMessage[]>();
  const [receivedPatientMessages, setReceivedPatientMessages] =
    useState<IPatientMessage[]>();

  useEffect(() => {
    const fetchMessages = async () => {
      if (patientId !== undefined) {
        const response = await fetchPatientMessages(patientId);
        setReceivedPatientMessages(response.receivedMessages);
        setSentPatientMessages(response.sentMessages);
      }
    };
    fetchMessages();
  }, [patientId]);

  return (
    sentPatientMessages &&
    receivedPatientMessages && (
      <div className="flex flex-col gap-6 px-6 w-full ">
        {sentPatientMessages.map((message) => (
          <MessageCard
            key={message.id}
            content={message.content}
            sender={message.sender}
          
            isPatientMessage
            date={message.date}
          />
        ))}
        {receivedPatientMessages.map((message) => (
          <MessageCard
            key={message.id}
            isTherapistMessage
            sender={message.sender}
            content={message.content}
          
            date={message.date}
          />
        ))}
      </div>
    )
  );
}
