import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AppointmentsList from './AppointmentsList';
import PersonalDetails from './PersonalDetails';
import UsersManagement from './UsersManagement';
import Button from './ui/Button';
import styles from '../css/userDashboard.module.css'; // Assuming you have a CSS file for styles
export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.setItem('user', JSON.stringify({ role, data }));
    const data = localStorage.getItem('user');
    if (!data) navigate('/');
    else setUser(JSON.parse(data));
  }, [navigate]);
  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>

        <span className={styles.header}>שלום, {user.data.result.firstName} {user.data.result.lastName}</span>
        <Button onClick={() => { localStorage.clear(); navigate('/'); }}>התנתק</Button>
      </header>
      <nav className={styles.nav}>
        <div>
          <Button onClick={() => navigate('/dashboard/appointments')}>תורים</Button>
        </div>
        <div>
          <Button onClick={() => navigate('/dashboard/personal')}>פרטים אישיים</Button>
        </div>
        {user.role === 'secretary' && <Button onClick={() => navigate('/dashboard/users')}>ניהול משתמשים</Button>}
      </nav>
      <main className={styles.main}>
        <Routes>
          <Route path="appointments" element={<AppointmentsList user={user} />} />
          <Route path="personal" element={<PersonalDetails user={user} />} />
          {user.role === 'secretary' && (
            <Route path="users" element={<UsersManagement />} />
          )}
          {/* ברירת מחדל */}
          <Route path="" element={<Navigate to="/dashboard/personal" replace />} />
        </Routes>
      </main>
    </div>
  );
}