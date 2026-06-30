// React's built-in hook to manage side effects (like timers, API calls, etc.)
import { useEffect } from 'react';
// Custom interface describing a same-day appointment's structure
import { ISameDayAppointment } from '../../../../../@types/interfaces/customInterfaces';

// Custom hook to check whether appointments have already passed based on current time
export const useDynamicAppointmentCheck = (
  appointments: ISameDayAppointment[], // Array of current day's appointments
  isDynamicModeOn: boolean // Boolean indicating whether "dynamic mode" is enabled
) => {
  // Run this effect when either appointments or dynamic mode status changes
  useEffect(() => {
    // Helper function to format the current time as HH:MM (24-hour format, no AM/PM)
    const formatTime = (date: Date) =>
      date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
      });

    // Function to check each appointment's time and update its `isTimePassed` property
    const checkAppointments = () => {
      const currentTime = formatTime(new Date()); // Get the current formatted time
      appointments.forEach((appointment) => {
        // If the appointment time is earlier than current time, mark it as "passed"
        appointment.isTimePassed = appointment.time < currentTime;
      });
    };

    // If dynamic mode is OFF, reset all appointments to not be "passed"
    if (!isDynamicModeOn) {
      appointments.forEach((appointment) => (appointment.isTimePassed = false));
      return; // Exit early so no interval is set
    }

    // If dynamic mode is ON, perform an initial check right away
    checkAppointments();

    // Set up an interval to repeat `checkAppointments` every 10 minutes (600,000ms)
    const interval = setInterval(() => checkAppointments(), 600_000);

    // Clean up the interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [appointments, isDynamicModeOn]); // Re-run the effect when appointments or dynamic mode toggle
};
