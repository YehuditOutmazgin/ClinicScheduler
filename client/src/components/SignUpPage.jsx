import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/SignPage.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function SignUpPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [form, setForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { id, firstName, lastName, phoneNumber, role } = form;

    const payload = {
      id: Number(id),
      Role: role,
      FName: firstName,
      LName: lastName,
      phoneNumbr: phoneNumber,
    };

    console.log('Payload to send:', payload);

    try {
      const res = await fetch(`${apiUrl}/SignUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate('/');
      } else {
        const errorText = await res.text();
        console.error('Signup failed:', errorText);
        setError('הרשמה נכשלה: ' + errorText);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('שגיאת רשת. נסה שוב מאוחר יותר.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>הרשמה למערכת</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="תעודת זהות" name="id" value={form.id} onChange={handleChange} />
        <Input label="שם פרטי" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="שם משפחה" name="lastName" value={form.lastName} onChange={handleChange} />
        <Input label="טלפון" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

        <label className={styles.label}>
          סוג משתמש:
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">בחר תפקיד</option>
            <option value="patient">מטופל</option>
            <option value="therapist">מטפל</option>
          </select>
        </label>

        <Button type="submit">הירשם</Button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
