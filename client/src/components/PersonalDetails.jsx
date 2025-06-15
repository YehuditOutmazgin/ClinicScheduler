import { useState } from 'react';
import styles from '../css/PersonalDetails.module.css';
import Button from './ui/Button';
import Input from './ui/Input';

export default function PersonalDetails({ user }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  // אתחול ה-state רק עם הפרטים הרלוונטיים לעריכה!
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user.data.result);

  if (!user) return <div>טוען פרטים...</div>;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log(form.patientId);
    await fetch(`${apiUrl}/Patients/${form.patientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEdit(false);
    // כאן אפשר לעדכן את user ב-parent, אם רוצים לעדכן גם ב-localStorage
  };

  return (
    <div className={styles.container}>
      <h3>פרטים אישיים</h3>
      <form className={styles.form} autoComplete="off">
        <Input
          label="שם פרטי"
          name="firstName"
          value={form.firstName || ''}
          onChange={handleChange}
          disabled={!edit}
        />
        <Input
          label="שם משפחה"
          name="lastName"
          value={form.lastName || ''}
          onChange={handleChange}
          disabled={!edit}
        />
        <Input
          label="טלפון"
          name="phoneNumber"
          value={form.phoneNumber || ''}
          onChange={handleChange}
          disabled={!edit}
        />
        <div className={styles.buttons}>
          <Button type="button" onClick={() => setEdit(!edit)}>
            {edit ? 'ביטול' : 'ערוך'}
          </Button>
          {edit && (
            <Button type="button" onClick={handleSave}>
              שמור
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}