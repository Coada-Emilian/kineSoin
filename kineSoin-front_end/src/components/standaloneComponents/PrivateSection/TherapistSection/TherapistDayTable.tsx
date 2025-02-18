import { useEffect } from 'react';
import { fetchTherapistDashboardData } from '../../../../utils/apiUtils';

export default function TherapistDayTable() {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('/');

  const windowWidth = window.innerWidth;

  const generateTimeSlots = () => {
    const times: string[] = [];
    let start = new Date();
    start.setHours(8, 0, 0, 0); // Start at 08:00 AM

    while (start.getHours() < 20) {
      // Until 08:00 PM
      times.push(
        start.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }

    return times;
  };

  useEffect(() => {
    const fetchSameDayAppointments = async () => {
      try {
        const response = await fetchTherapistDashboardData();
        console.log('Appointments:', response);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchSameDayAppointments();
  }, []);

  const timeSlots = generateTimeSlots();

  return (
    <div className="flex flex-col w-10/12">
      <div className="w-full flex justify-end mb-4">
        <p className="border border-gray-400 p-2 rounded-xl shadow-xl">
          Date: {formattedDate}
        </p>
      </div>
      <div className="w-full ">
        <table className="border-collapse border border-gray-300 w-full mx-auto md:w-10/12 md:my-auto mb-6 rounded-full">
          <thead
            className={
              windowWidth < 450
                ? 'bg-gray-100 text-xs'
                : 'bg-gray-100 text-sm md:text-base '
            }
          >
            <tr>
              <>
                <th className="border border-gray-300 px-4 py-2 text-center w-2/12">
                  Heure
                </th>

                <th className="border border-gray-300 px-4 py-2 text-center">
                  Patient
                </th>

                <th className="border border-gray-300 px-4 py-2 text-center ">
                  Affliction
                </th>
              </>
            </tr>
          </thead>
          <tbody
            className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
          >
            {timeSlots.map((time, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {time}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Patient
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Affliction
                </td>
              </tr> // ✅ Correct placement
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
