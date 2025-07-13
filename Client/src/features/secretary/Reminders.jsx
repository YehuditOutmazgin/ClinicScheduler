import React, { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';// ודא שהנתיב נכון
// import styles from '../../css/reminders.module.css'; // אופציונלי לעיצוב

export default function Reminders() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // טען תורים ליום העסקים הבא
  useEffect(() => {
    fetch('http://localhost:7015/api/Appointment/next-business-day')
      .then(res => {
        if (!res.ok) throw new Error('בעיה בשליפה מהשרת');
        return res.json();
      })
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const confirmAppointment = async (id) => {
    await fetch(`http://localhost:7015/api/Appointment/confirm/${id}`, {
      method: 'POST',
    });
    updateStatus(id, true);
  };

  const cancelAppointment = async (id) => {
    await fetch(`http://localhost:5000/api/Appointment/update-confirmation/${id}`, {
      method: 'PUT',
    });
    updateStatus(id, false);
  };

  const updateNote = async (id, note) => {
    await fetch(`http://localhost:7015/api/Appointment/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    setAppointments((prev) =>
      prev.map((a) => (a.appointmentId === id ? { ...a, note } : a))
    );
  };

  const updateStatus = (id, isConfirmed) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.appointmentId === id ? { ...a, status: isConfirmed } : a
      )
    );
  };

  if (loading) return <p>טוען תורים...</p>;
  if (appointments.length === 0) return <p>אין תורים ליום העסקים הבא.</p>;

  return (
    <div >
        {/* className={styles.reminders} */}
      <h2>תזכורות תורים</h2>
      {appointments.map((app) => (
        <div key={app.appointmentId} >
            {/* className={styles.appointmentCard} */}
          <p><strong>מטופל:</strong> {app.patientName}</p>
          <p><strong>מטפל:</strong> {app.therapistName}</p>
          <p><strong>שעה:</strong> {app.date?.split('T')[1]?.substring(0, 5)}</p>
          <p><strong>סטטוס:</strong> {app.status ? 'מאושר' : 'לא מאושר'}</p>

          <textarea
            defaultValue={app.note}
            onBlur={(e) => updateNote(app.appointmentId, e.target.value)}
            placeholder="כתבי הערה"
            rows={2}
          />

          <div>
            {/*  className={styles.actions} */}
            <Button onClick={() => confirmAppointment(app.appointmentId)}>✔ אישור</Button>
            <Button onClick={() => cancelAppointment(app.appointmentId)}>✖ ביטול</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
