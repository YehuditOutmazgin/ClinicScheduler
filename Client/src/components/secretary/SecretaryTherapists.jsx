"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { fetchAllTherapists } from "../../redux/slices/therapistSlice"
import { addTherapist, updateTherapist, deleteTherapist } from "../../api/therapistFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/SecretaryTherapists.css"

const SecretaryTherapists = () => {
  const dispatch = useDispatch()
  const { therapists, loading } = useSelector((state) => state.therapists)
  const [filteredTherapists, setFilteredTherapists] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTherapist, setSelectedTherapist] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("view")
  const [successMessage, setSuccessMessage] = useState("")

  const specialties = ["פיזיותרפיה", "ריפוי בעיסוק", "קלינאות תקשורת", "פסיכולוגיה", "הדרכת הורים"]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    dispatch(fetchAllTherapists())
  }, [dispatch])

  useEffect(() => {
    filterTherapists()
  }, [therapists, searchTerm])

  const filterTherapists = () => {
    if (!searchTerm) {
      setFilteredTherapists(therapists)
      return
    }

    const filtered = therapists.filter(
      (therapist) =>
        therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.therapistId.toString().includes(searchTerm) ||
        therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.phoneNumber.includes(searchTerm),
    )
    setFilteredTherapists(filtered)
  }

  const handleTherapistClick = (therapist) => {
    setSelectedTherapist(therapist)
    setModalMode("view")
    setShowModal(true)
  }

  const handleAddTherapist = () => {
    setSelectedTherapist(null)
    setModalMode("add")
    reset()
    setShowModal(true)
  }

  const handleEditTherapist = (therapist) => {
    setSelectedTherapist(therapist)
    setModalMode("edit")
    setValue("firstName", therapist.firstName)
    setValue("lastName", therapist.lastName)
    setValue("phoneNumber", therapist.phoneNumber)
    setValue("specialization", therapist.specialization)
    setValue("appointmentDuration", therapist.appointmentDuration)
    setShowModal(true)
  }

  const handleDeleteTherapist = async (therapistId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המטפל?")) {
      try {
        await deleteTherapist(therapistId)
        dispatch(fetchAllTherapists())
        setShowModal(false)
        setSuccessMessage("המטפל נמחק בהצלחה!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } catch (error) {
        alert("שגיאה במחיקת המטפל")
      }
    }
  }

  const onSubmit = async (data) => {
    try {
      if (modalMode === "add") {
        await addTherapist(data)
        setSuccessMessage("המטפל נוסף בהצלחה!")
      } else if (modalMode === "edit") {
        await updateTherapist({ ...data, id: selectedTherapist.therapistId })
        setSuccessMessage("פרטי המטפל עודכנו בהצלחה!")
      }

      dispatch(fetchAllTherapists())
      setShowModal(false)
      reset()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      alert("שגיאה בשמירת פרטי המטפל")
    }
  }

  if (loading) {
    return <LoadingSpinner message="טוען רשימת מטפלים..." />
  }

  return (
    <div>
      <Navigation userType="secretary" />

      <div className="container">
        <div className="therapists-header">
          <h1>ניהול מטפלים</h1>
          <p>כאן תוכל לנהל את כל המטפלים במכון</p>
          <button className="btn btn-primary" onClick={handleAddTherapist}>
            הוסף מטפל חדש
          </button>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="חפש לפי שם, מספר זהות, התמחות או טלפון..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        <div className="therapists-container">
          {filteredTherapists.length > 0 ? (
            <div className="therapists-grid">
              {filteredTherapists.map((therapist) => (
                <div
                  key={therapist.therapistId}
                  className="therapist-card"
                  onClick={() => handleTherapistClick(therapist)}
                >
                  <div className="therapist-header">
                    <div className="therapist-name">
                      {therapist.firstName} {therapist.lastName}
                    </div>
                    <div className="therapist-id">ת.ז: {therapist.therapistId}</div>
                  </div>
                  <div className="therapist-specialty">
                    <span className="specialty-badge">{therapist.specialization}</span>
                  </div>
                  <div className="therapist-details">
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{therapist.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-text">{therapist.appointmentDuration} דקות</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-therapists">
              <div className="no-therapists-icon">👨‍⚕️</div>
              <h3>לא נמצאו מטפלים</h3>
              <p>לא נמצאו מטפלים התואמים לחיפוש</p>
            </div>
          )}
        </div>

        {/* Therapist Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{modalMode === "add" ? "הוסף מטפל חדש" : modalMode === "edit" ? "ערוך פרטי מטפל" : "פרטי מטפל"}</h3>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                {modalMode === "view" && selectedTherapist && (
                  <div className="therapist-details-view">
                    <div className="detail-row">
                      <span className="detail-label">שם מלא:</span>
                      <span className="detail-value">
                        {selectedTherapist.firstName} {selectedTherapist.lastName}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">מספר זהות:</span>
                      <span className="detail-value">{selectedTherapist.therapistId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">התמחות:</span>
                      <span className="detail-value">{selectedTherapist.specialization}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">מספר טלפון:</span>
                      <span className="detail-value">{selectedTherapist.phoneNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">משך טיפול:</span>
                      <span className="detail-value">{selectedTherapist.appointmentDuration} דקות</span>
                    </div>
                  </div>
                )}

                {(modalMode === "edit" || modalMode === "add") && (
                  <form onSubmit={handleSubmit(onSubmit)} className="therapist-form">
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
                          {...register("therapistId", {
                            required: "מספר זהות נדרש",
                            pattern: {
                              value: /^\d{9}$/,
                              message: "מספר זהות חייב להכיל 9 ספרות",
                            },
                          })}
                        />
                        {errors.therapistId && <span className="error-message">{errors.therapistId.message}</span>}
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label">התמחות</label>
                      <select
                        className="form-select"
                        {...register("specialization", {
                          required: "התמחות נדרשת",
                        })}
                      >
                        <option value="">בחר התמחות</option>
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                      {errors.specialization && <span className="error-message">{errors.specialization.message}</span>}
                    </div>

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
                      <label className="form-label">משך טיפול (דקות)</label>
                      <select
                        className="form-select"
                        {...register("appointmentDuration", {
                          required: "משך טיפול נדרש",
                        })}
                      >
                        <option value="">בחר משך טיפול</option>
                        <option value="15">15 דקות</option>
                        <option value="30">30 דקות</option>
                        <option value="45">45 דקות</option>
                        <option value="60">60 דקות</option>
                      </select>
                      {errors.appointmentDuration && (
                        <span className="error-message">{errors.appointmentDuration.message}</span>
                      )}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {modalMode === "add" ? "הוסף מטפל" : "שמור שינויים"}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        ביטול
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {modalMode === "view" && selectedTherapist && (
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => handleEditTherapist(selectedTherapist)}>
                    ערוך
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTherapist(selectedTherapist.therapistId)}
                  >
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

export default SecretaryTherapists
