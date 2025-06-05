// import React, { useState } from "react";

// const API_BASE = "http://localhost:5129/api/Patients";

// // צבעי מאוחדת בלבד
// const colors = {
//   mainBlue: "#0084c6",
//   lightBlue: "#c6eafd",
//   blueDark: "#005c99",
//   orange: "#ff8800",
//   white: "#fff",
// };

// const styles = {
//   bg: {
//     minHeight: "100vh",
//     minWidth: "100vw",
//     margin: 0,
//     padding: 0,
//     fontFamily: "'Heebo', Arial, sans-serif",
//     background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.white} 60%, ${colors.orange} 100%)`,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "auto"
//   },
//   card: {
//     background: "rgba(255,255,255,0.92)",
//     borderRadius: 22,
//     boxShadow: "0 8px 32px #0084c633",
//     border: `2px solid ${colors.mainBlue}`,
//     maxWidth: 410,
//     minWidth: 320,
//     padding: "36px 32px 30px 32px",
//     margin: "40px 0",
//     color: colors.blueDark,
//     direction: "rtl",
//     textAlign: "right"
//   },
//   title: {
//     color: colors.mainBlue,
//     fontWeight: 900,
//     fontSize: 28,
//     marginBottom: 16,
//     letterSpacing: "0.04em"
//   },
//   label: {
//     fontWeight: 700,
//     color: colors.blueDark
//   },
//   input: {
//     border: `1.5px solid ${colors.mainBlue}`,
//     borderRadius: 12,
//     padding: "8px 12px",
//     margin: "8px 0 18px 0",
//     fontSize: 16,
//     width: "100%",
//     boxSizing: "border-box",
//     background: colors.white,
//     color: colors.blueDark,
//     outlineColor: colors.orange
//   },
//   button: {
//   background: colors.mainBlue,
//   color: colors.white,
//   border: "none",
//   borderRadius: 12,
//   padding: "10px 28px",
//   fontWeight: 700,
//   fontSize: 17,
//   margin: "14px 0 0 12px",
//   cursor: "pointer",
//   transition: "background 0.18s",
//   letterSpacing: "0.04em",
//   boxShadow: "0 2px 8px #0084c655"
// },
// buttonOrange: {
//   background: colors.orange,
//   color: colors.white
// },
// buttonBlue: {
//   background: colors.mainBlue,
//   color: colors.white
// },
//   row: {
//     marginBottom: 12,
//     fontSize: 17
//   },
//   error: {
//     color: colors.orange,
//     margin: "16px 0"
//   },
//   success: {
//     color: colors.mainBlue,
//     margin: "16px 0"
//   }
// };

// export default function PatientProfile() {
//   const [patientId, setPatientId] = useState("");
//   const [patient, setPatient] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editDetails, setEditDetails] = useState({});
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // התחברות
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess("");
//     setPatient(null);
//     try {
//       const res = await fetch(`${API_BASE}/${patientId}`);
//       if (!res.ok) {
//         setError("מטופל לא נמצא");
//         return;
//       }
//       const data = await res.json();
//       setPatient(data);
//       setSuccess("");
//     } catch {
//       setError("שגיאה בחיבור לשרת");
//     }
//   };

//   // עריכת פרטי מטופל
//   const handleEdit = () => {
//     setEditMode(true);
//     setEditDetails({ ...patient });
//     setSuccess(""); setError("");
//   };

//   // שמירת עריכה
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess("");
//     try {
//       const res =await fetch(`${API_BASE}/${patient.patientId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editDetails),
//       });
//       if (!res.ok) {
//         setError("שגיאה בעדכון");
//         return;
//       }
//       setPatient({ ...editDetails });
//       setEditMode(false);
//       setSuccess("הפרטים נשמרו בהצלחה");
//     } catch {
//       setError("שגיאה בעדכון");
//     }
//   };

//   // מחיקת מטופל
//   const handleDelete = async () => {
//     if (!window.confirm("את/ה בטוח/ה שברצונך למחוק את המשתמש?")) return;
//     setError(""); setSuccess("");
//     try {
//       const res = await fetch(`${API_BASE}/${patient.patientId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) {
//         setError("שגיאה במחיקה");
//         return;
//       }
//       setSuccess("המשתמש נמחק בהצלחה");
//       setPatient(null);
//       setPatientId("");
//     } catch {
//       setError("שגיאה במחיקה");
//     }
//   };

//   // מסך עריכה
//   if (editMode && patient) {
//     return (
//       <div style={styles.bg}>
//         <div style={styles.card}>
//           <div style={styles.title}>עריכת פרטי מטופל</div>
//           <form onSubmit={handleSave}>
//             <div style={styles.row}>
//               <span style={styles.label}>שם פרטי:</span>
//               <input
//                 style={styles.input}
//                 type="text"
//                 value={editDetails.firstName}
//                 onChange={e => setEditDetails({ ...editDetails, firstName: e.target.value })}
//               />
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>שם משפחה:</span>
//               <input
//                 style={styles.input}
//                 type="text"
//                 value={editDetails.lastName}
//                 onChange={e => setEditDetails({ ...editDetails, lastName: e.target.value })}
//               />
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>גיל:</span>
//               <input
//                 style={styles.input}
//                 type="number"
//                 value={editDetails.age}
//                 onChange={e => setEditDetails({ ...editDetails, age: e.target.value })}
//               />
//             </div>
//             <div style={styles.row}>
//               <span style={styles.label}>טלפון:</span>
//               <input
//                 style={styles.input}
//                 type="text"
//                 value={editDetails.phoneNumber}
//                 onChange={e => setEditDetails({ ...editDetails, phoneNumber: e.target.value })}
//               />
//             </div>
//             <button
//               type="submit"
//               style={{ ...styles.button, ...styles.buttonOrange }}
//             >
//               שמור
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditMode(false)}
//               style={{ ...styles.button, ...styles.buttonOutline }}
//             >
//               ביטול
//             </button>
//           </form>
//           {error && <div style={styles.error}>{error}</div>}
//           {success && <div style={styles.success}>{success}</div>}
//         </div>
//       </div>
//     );
//   }

//   // מסך התחברות
//   if (!patient) {
//     return (
//       <div style={styles.bg}>
//         <div style={styles.card}>
//           <div style={styles.title}>כניסת מטופל</div>
//           <form onSubmit={handleLogin}>
//             <input
//               style={styles.input}
//               type="text"
//               placeholder="הכנס/י מזהה מטופל"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//             />
//             <button
//               type="submit"
//               style={{ ...styles.button, ...styles.buttonOrange, marginTop: 0 }}
//             >
//               התחבר
//             </button>
//           </form>
//           {error && <div style={styles.error}>{error}</div>}
//           {success && <div style={styles.success}>{success}</div>}
//         </div>
//       </div>
//     );
//   }

//   // מסך פרופיל
//   return (
//     <div style={styles.bg}>
//       <div style={styles.card}>
//         <div style={styles.title}>
//           שלום <span style={{ color: colors.orange }}>{patient.firstName} {patient.lastName}</span>
//         </div>
//         <div style={styles.row}>
//           <span style={styles.label}>תעודת זהות:</span> {patient.patientId}
//         </div>
//         <div style={styles.row}>
//           <span style={styles.label}>גיל:</span> {patient.age}
//         </div>
//         <div style={styles.row}>
//           <span style={styles.label}>טלפון:</span> {patient.phoneNumber}
//         </div>
//    <button
//   onClick={handleEdit}
//   style={{ ...styles.button, ...styles.buttonOrange }}
// >
//   עריכת פרטים אישיים
// </button>
// <button
//   onClick={handleDelete}
//   style={{ ...styles.button, ...styles.buttonBlue }}
// >
//   מחק משתמש
// </button>
//         {error && <div style={styles.error}>{error}</div>}
//         {success && <div style={styles.success}>{success}</div>}
        
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import PatientLogin from "./PatientLogin";
import PatientEditForm from "./PatientEditForm";
import "./PatientProfile.css";

const API_BASE = "http://localhost:5129/api/Patients";

export default function PatientProfile() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/${patientId}`);
      if (!res.ok) {
        setError("Patient not found");
        return;
      }
      const data = await res.json();
      setPatient(data);
    } catch {
      setError("Server error");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditDetails({ ...patient });
    setError(""); setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/${patient.patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDetails),
      });
      if (!res.ok) {
        setError("Update failed");
        return;
      }
      setPatient({ ...editDetails });
      setEditMode(false);
      setSuccess("Details updated successfully");
    } catch {
      setError("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/${patient.patientId}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Delete failed");
        return;
      }
      setSuccess("User deleted");
      setPatient(null);
      setPatientId("");
    } catch {
      setError("Delete failed");
    }
  };

  if (editMode && patient) {
    return (
      <PatientEditForm
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        handleSave={handleSave}
        setEditMode={setEditMode}
        error={error}
        success={success}
      />
    );
  }

  if (!patient) {
    return (
      <PatientLogin
        patientId={patientId}
        setPatientId={setPatientId}
        handleLogin={handleLogin}
        error={error}
        success={success}
      />
    );
  }

  return (
    <div className="bg">
      <div className="card">
        <div className="title">Hello <span className="highlight">{patient.firstName} {patient.lastName}</span></div>
        <div className="row"><span className="label">ID:</span> {patient.patientId}</div>
        <div className="row"><span className="label">Age:</span> {patient.age}</div>
        <div className="row"><span className="label">Phone:</span> {patient.phoneNumber}</div>
        <button className="button buttonOrange" onClick={handleEdit}>Edit Details</button>
        <button className="button buttonBlue" onClick={handleDelete}>Delete User</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </div>
  );
}
