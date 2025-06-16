import React from "react";
import './PatientProfile.css';

export default function PatientProfileView({ patient, handleEdit, handleDelete, error, success, styles, colors }) {
  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <div style={styles.title}>
          Hello <span style={{ color: colors.orange }}>{patient.firstName} {patient.lastName}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>ID:</span> {patient.patientId}
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Age:</span> {patient.age}
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Phone:</span> {patient.phoneNumber}
        </div>
        <button
          onClick={handleEdit}
          style={{ ...styles.button, ...styles.buttonOrange }}
        >
          Edit Personal Info
        </button>
        <button
          onClick={handleDelete}
          style={{ ...styles.button, ...styles.buttonBlue }}
        >
          Delete User
        </button>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </div>
    </div>
  );
}