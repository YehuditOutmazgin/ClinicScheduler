"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { fetchAllPatients } from "../../redux/slices/patientSlice"
import { addPatient, updatePatient, deletePatient } from "../../api/patientFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/SecretaryPatients.css"

const SecretaryPatients = () => {
  const dispatch = useDispatch()
  const { patients, loading } = useSelector((state) => state.patients)
  const [filteredPatients, setFilteredPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("view") // view, edit, add
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    dispatch(fetchAllPatients())
  }, [dispatch])

  useEffect(() => {
    filterPatients()
  }, [patients, searchTerm])

  const filterPatients = () => {
    if (!searchTerm) {
      setFilteredPatients(patients)
      return
    }

    const filtered = patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toString().includes(searchTerm) ||
        patient.phoneNumber.includes(searchTerm),
    )
    setFilteredPatients(filtered)
  }

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient)
    setModalMode("view")
    setShowModal(true)
  }

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setModalMode("add")
    reset()
    setShowModal(true)
  }

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient)
    setModalMode("edit")
    setValue("firstName", patient.firstName)
    setValue("lastName", patient.lastName)
    setValue("phoneNumber", patient.phoneNumber)
    setValue("birthDate", patient.birthDate)
    setShowModal(true)
  }

  const handleDeletePatient = async (patientId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המטופל?")) {
      try {
        await deletePatient(patientId)
        dispatch(fetchAllPatients())
        setShowModal(false)
        setSuccessMessage("המטופל נמחק בהצלחה!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } catch (error) {
        alert("שגיאה במחיקת המטופל")
      }
    }
  }

  const onSubmit = async (data) => {
    try {
      if (modalMode === "add") {
        await addPatient(data)
        setSuccessMessage("המטופל נוסף בהצלחה!")
      } else if (modalMode === "edit") {
        await updatePatient(selectedPatient.patientId, data)
        setSuccessMessage("פרטי המטופל עודכנו בהצלחה!")
      }

      dispatch(fetchAllPatients())
      setShowModal(false)
      reset()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      alert("שגיאה בשמירת פרטי המטופל")
    }
  }

  const formatBirthDate = (dateString) => {
    if (!dateString) return "לא זמין"
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  if (loading) {
    return <LoadingSpinner message="טוען רשימת מטופלים..." />
  }

  return (
    <div>
      <Navigation userType="secretary" />

      <div className="container">
        <div className="patients-header">
          <h1>ניהול מטופלים</h1>
          <p>כאן תוכל לנהל את כל המטופלים במכון</p>
          <button className="btn btn-primary" onClick={handleAddPatient}>
            הוסף מטופל חדש
          </button>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="חפש לפי שם, מספר זהות או טלפון..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        <div className="patients-container">
          {filteredPatients.length > 0 ? (
            <div className="patients-grid">
              {filteredPatients.map((patient) => (
                <div key={patient.patientId} className="patient-card" onClick={() => handlePatientClick(patient)}>
                  <div className="patient-header">
                    <div className="patient-name">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="patient-id">ת.ז: {patient.patientId}</div>
                  </div>
                  <div className="patient-details">
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{patient.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">{formatBirthDate(patient.birthDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-patients">
              <div className="no-patients-icon">👥</div>
              <h3>לא נמצאו מטופלים</h3>
              <p>לא נמצאו מטופלים התואמים לחיפוש</p>
            </div>
          )}
        </div>

        {/* Patient Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  {modalMode === "add" ? "הוסף מטופל חדש" : modalMode === "edit" ? "ערוך פרטי מטופל" : "פרטי מטופל"}
                </h3>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                {modalMode === "view" && selectedPatient && (
                  <div className="patient-details-view">
                    <div className="detail-row">
                      <span className="detail-label">שם מלא:</span>
                      <span className="detail-value">
                        {selectedPatient.firstName} {selectedPatient.lastName}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">מספר זהות:</span>
                      <span className="detail-value">{selectedPatient.patientId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">מספר טלפון:</span>
                      <span className="detail-value">{selectedPatient.phoneNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">תאריך לידה:</span>
                      <span className="detail-value">{formatBirthDate(selectedPatient.birthDate)}</span>
                    </div>
                  </div>
                )}

                {(modalMode === "edit" || modalMode === "add") && (
                  <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">שם פרטי</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("firstName", {
                            required: "שם פרטי נדרש",
                            minLength: {
                              value: 2,
                              message: "שם פרטי חייב להכיל לפחות 2 תווים",
                            },
                          })}
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">שם משפחה</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("lastName", {
                            required: "שם משפחה נדרש",
                            minLength: {
                              value: 2,
                              message: "שם משפחה חייב להכיל לפחות 2 תווים",
                            },
                          })}
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                      </div>
                    </div>

                    {modalMode === "add" && (
                      <div className="form-group">
                        <label className="form-label">מספר זהות</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("patientId", {
                            required: "מספר זהות נדרש",
                            pattern: {
                              value: /^\d{9}$/,
                              message: "מספר זהות חייב להכיל 9 ספרות",
                            },
                          })}
                        />
                        {errors.patientId && <span className="error-message">{errors.patientId.message}</span>}
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">מספר טלפון</label>
                      <input
                        type="tel"
                        className="form-control"
                        {...register("phoneNumber", {
                          required: "מספר טלפון נדרש",
                          pattern: {
                            value: /^0\d{1,2}-?\d{7}$/,
                            message: "מספר טלפון לא תקין",
                          },
                        })}
                        placeholder="050-1234567"
                      />
                      {errors.phoneNumber && <span className="error-message">{errors.phoneNumber.message}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">תאריך לידה</label>
                      <input
                        type="date"
                        className="form-control"
                        {...register("birthDate", {
                          required: "תאריך לידה נדרש",
                        })}
                      />
                      {errors.birthDate && <span className="error-message">{errors.birthDate.message}</span>}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {modalMode === "add" ? "הוסף מטופל" : "שמור שינויים"}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        ביטול
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {modalMode === "view" && selectedPatient && (
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => handleEditPatient(selectedPatient)}>
                    ערוך
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeletePatient(selectedPatient.patientId)}>
                    מחק
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    סגור
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SecretaryPatients
