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

  const allMessages = [
    ...(sentPatientMessages || []),
    ...(receivedPatientMessages || []),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    allMessages.length > 0 && (
      <div className="flex flex-col gap-6 px-6 w-full h-[500px] md:h-[700px] overflow-y-auto">
        {allMessages.map((message) => (
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
    )
  );
}
