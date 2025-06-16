import React from "react";

export default function PatientEditForm({ editDetails, setEditDetails, handleSave, setEditMode, error, success }) {
  return (
    <div className="bg">
      <div className="card">
        <div className="title">Edit Patient Details</div>
        <form onSubmit={handleSave}>
          <div className="row">
            <span className="label">First Name:</span>
            <input
              className="input"
              type="text"
              value={editDetails.firstName}
              onChange={e => setEditDetails({ ...editDetails, firstName: e.target.value })}
            />
          </div>
          <div className="row">
            <span className="label">Last Name:</span>
            <input
              className="input"
              type="text"
              value={editDetails.lastName}
              onChange={e => setEditDetails({ ...editDetails, lastName: e.target.value })}
            />
          </div>
          <div className="row">
            <span className="label">Age:</span>
            <input
              className="input"
              type="number"
              value={editDetails.age}
              onChange={e => setEditDetails({ ...editDetails, age: e.target.value })}
            />
          </div>
          <div className="row">
            <span className="label">Phone:</span>
            <input
              className="input"
              type="text"
              value={editDetails.phoneNumber}
              onChange={e => setEditDetails({ ...editDetails, phoneNumber: e.target.value })}
            />
          </div>
          <button type="submit" className="button buttonOrange">Save</button>
          <button type="button" className="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>
    </div>
  );
}
