import React from "react";

export default function PatientLogin({ patientId, setPatientId, handleLogin, error, success }) {
  return (
    <div className="bg">
      <div className="card">
        <div className="title">Patient Login</div>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <button type="submit" className="button buttonOrange">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </div>
  );
}
