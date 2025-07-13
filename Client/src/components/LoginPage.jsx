import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../css/LoginPage.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function LoginPage() {
  const apiUrl = "https://localhost:7015/api";
  const location = useLocation();
  const prefilledId = location.state?.id || '';
  const navigate = useNavigate();

  const [id, setId] = useState(prefilledId);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setWrongPassword(false);
    setLoading(true);

    try {
      const url = `${apiUrl}/Login?id=${encodeURIComponent(id)}&pass=${encodeURIComponent(pass)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const { role, data } = await res.json();
        localStorage.setItem('user', JSON.stringify({ role, data }));
        navigate('/dashboard');
      } else {
        const errorText = await res.text();
        if (errorText.includes('password') || errorText.includes('סיסמה')) {
          setWrongPassword(true);
          setError('סיסמה שגויה. נסי שוב.');
        } else {
          setError('לא נמצא משתמש. ניתן להירשם.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('שגיאה בשרת. נסי שוב מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>ברוכים הבאים למרכז להתפתחות הילד</h1>
      <h3 className={styles.title}>צעדים קטנים</h3>

      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          className={styles.miniTitle}
          label="תעודת זהות"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError('');
          }}
          disabled={loading}
        />

        <Input
          className={`${styles.miniTitle} ${wrongPassword ? styles.inputError : ''}`}
          label="סיסמה"
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setWrongPassword(false);
          }}
          disabled={loading}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'טוען...' : 'התחבר'}
        </Button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      <Button
        type="button"
        onClick={() => navigate('/signup', { state: { id } })}
        disabled={loading}
      >
        להרשמה
      </Button>
    </div>
  );
}
