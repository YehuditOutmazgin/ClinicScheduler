import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/LoginPage.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function LoginPage() {
  const apiUrl = process.env.REACT_APP_API_URL || "https://localhost:7015/api";
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/Login/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        // שמירה של role ו-data (כמו שחוזר מהשרת)
        const { role, data } = await res.json();
        localStorage.setItem('user', JSON.stringify({ role, data }));
        navigate('/dashboard');
      } else {
        setError('לא נמצא משתמש. ניתן להירשם');
      }
    } catch (err) {
      setError('שגיאה בשרת');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>ברוכים הבאים למרכז להתפתחות הילד</h1>
      <h2 className='subtitle'>צעדים קטנים</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          label="הזן תעודת זהות"
          value={id}
          onChange={e => setId(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>{loading ? 'טוען...' : 'התחבר'}</Button>
      </form>
      {error && (
        <>
          <div className={styles.error}>{error}</div>
          <Button onClick={() => navigate('/signup')}>להרשמה</Button>
        </>
      )}
    </div>
  );
}