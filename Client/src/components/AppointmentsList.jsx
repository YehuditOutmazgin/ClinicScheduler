import { useEffect, useState } from 'react';
import styles from '../css/AppointmentsList.module.css';

export default function AppointmentsList({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL|| "https://localhost:7015/api";

  useEffect(() => {
    console.log("useEffect triggered with user:", user);

    if (!user || !user.role || !user.data || !user.data.result) {
      console.log("User info incomplete, skipping fetch");
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "";
        const role = user.role;
        const userData = user.data.result;

        const id =
          role === 'client' ? userData.patientId :
          role === 'therapist' ? userData.therapistId :
          null;

        if (!id) {
          console.warn("Missing ID for user role:", role);
          return;
        }

        if (role === 'client') {
          url = `${apiUrl}/Appointment/future/${id}`;
                  console.log("Fetching from URL:", url);

        } else if (role === 'therapist') {
          const today = new Date().toISOString().split('T')[0];
          url = `${apiUrl}/Appointment/therapist/${id}/date/${today}`;
          console.log("Fetching from URL:", url);
        }


        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const rawData = await res.json();
        console.log("Raw data received:", rawData);

        const appointmentsList = rawData?.$values || [];
        setAppointments(appointmentsList);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load appointments");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, apiUrl]);

  if (!user || !user.role || !user.data) {
    return <div className={styles.container}>Loading user data...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>רשימת תורים</h3>
      {loading && <p>טוען תורים...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && appointments.length === 0 && (
        <p>אין תורים להצגה.</p>
      )}
      <ul className={styles.list}>
        {appointments.map(app => (
          <li key={app.appointmentId}>
            <strong>תאריך:</strong> {app.appointmentDate}<br />
            <strong>שעה:</strong> {app.appointmentTime}<br />
            <strong>סטטוס:</strong> {app.status}<br />

            {app.patient && (
              <>
                <strong>מטופל:</strong> {app.patient.firstName} {app.patient.lastName}<br />
              </>
            )}
            {app.therapist && (
              <>
                <strong>תחום התמחות:</strong> {app.therapist.specialization}<br />

                <strong>מטפל:</strong> {app.therapist.firstName} {app.therapist.lastName}<br />
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
