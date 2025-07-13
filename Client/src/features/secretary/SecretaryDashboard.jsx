import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import styles from '../../css/userDashboard.module.css';


import ScheduleAppointment from './ScheduleAppointment';
import Reminders from './Reminders';
import ManagePatients from './ManagePatients';
import ManageTherapists from './ManageTherapists';
import SearchPatient from './SearchPatient';


export default function SecretaryDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (!data) navigate('/');
    else setUser(JSON.parse(data));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <span>שלום, {user.data.result.firstName} {user.data.result.lastName}</span>
        <Button onClick={() => { localStorage.clear(); navigate('/'); }}>התנתק</Button>
      </header>

      <nav className={styles.nav}>
        <div><Button onClick={() => navigate('/secretary/patients')}>ניהול מטופלים</Button></div>
        <div><Button onClick={() => navigate('/secretary/therapists')}>ניהול מטפלים</Button></div>
        <div><Button onClick={() => navigate('/secretary/schedule')}>קביעת תור</Button></div>
        <div><Button onClick={() => navigate('/secretary/reminders')}>תזכורות תורים</Button></div>
        <div><Button onClick={() => navigate('/secretary/search')}>חיפוש מטופל לפי ת"ז</Button></div>
      </nav>

      <main className={styles.main}>
        <Routes>
          <Route path="patients" element={<ManagePatients />} />
          <Route path="therapists" element={<ManageTherapists />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="schedule" element={<ScheduleAppointment />} />
          <Route path="search" element={<SearchPatient />} />
        </Routes>
      </main>
    </div>
  );
}
