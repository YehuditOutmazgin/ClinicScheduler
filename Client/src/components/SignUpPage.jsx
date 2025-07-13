import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../css/SignPage.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function SignUpPage() {
  const apiUrl = process.env.REACT_APP_API_URL || "https://localhost:7015/api/SignUp";
  const location = useLocation();
  const prefilledId = location.state?.id || '';
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: prefilledId,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    specialization: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // אם המשתמש שינה תפקיד, ננקה התמחות
      ...(name === 'role' ? { specialization: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { id, firstName, lastName, phoneNumber, role, specialization } = form;

    const payload = {
      id: Number(id),
      Role: role,
      FName: firstName,
      LName: lastName,
      phoneNumbr: phoneNumber,
      specialization: role === "therapist" ? specialization : null
    };

    try {
      const res = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate('/login', { state: { id } });
      } else {
        const errorText = await res.text();
        setError('הרשמה נכשלה: ' + errorText);
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('שגיאת רשת. נסה שוב מאוחר יותר.');
    }
  };

  const roles = [
    { value: 'patient', label: 'מטופל' },
    { value: 'therapist', label: 'מטפל' },
  ];

  const specializations = [
    { value: 'SpeechTherapy', label: 'קלינאות תקשורת' },
    { value: 'OccupationalTherapy', label: 'ריפוי בעיסוק' },
    { value: 'PhysicalTherapy', label: 'פיזיותרפיה' },
    { value: 'Psychology', label: 'פסיכולוגיה' },
    { value: 'SocialWork', label: 'עבודה סוציאלית' },
    { value: 'BehavioralTherapy', label: 'טיפול התנהגותי' },
    { value: 'EducationalTherapy', label: 'טיפול חינוכי' },
  ];

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.textField}>הרשמה למערכת</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="תעודת זהות" name="id" value={form.id} onChange={handleChange} />
        <Input label="שם פרטי" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="שם משפחה" name="lastName" value={form.lastName} onChange={handleChange} />
        <Input label="טלפון" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

        <div className={styles.roleSelector}>
          <p className={styles.label}>בחר תפקיד:</p>
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`${styles.optionButton} ${form.role === r.value ? styles.selected : ''}`}
              onClick={() => handleSelect('role', r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {form.role === 'therapist' && (
          <div className={styles.roleSelector}>
            <p className={styles.label}>בחר התמחות:</p>
            {specializations.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`${styles.optionButton} ${form.specialization === s.value ? styles.selected : ''}`}
                onClick={() => handleSelect('specialization', s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <Button type="submit">הירשם</Button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
