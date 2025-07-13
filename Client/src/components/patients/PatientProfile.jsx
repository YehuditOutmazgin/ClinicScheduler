"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { updatePatientData } from "../../redux/slices/patientSlice"
import Navigation from "../common/Navigation"
import "../../styles/PatientProfile.css"

const PatientProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.patients)
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      birthDate: user?.birthDate || "",
    },
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updatePatientData({
          id: user.patientId,
          patientData: data,
        }),
      )
      setSuccessMessage("הפרטים עודכנו בהצלחה!")
      setIsEditing(false)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const formatBirthDate = (dateString) => {
    if (!dateString) return "לא זמין"
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  return (
    <div>
      <Navigation userType="patient" />

      <div className="container">
        <div className="profile-header">
          <h1>הפרטים האישיים שלי</h1>
          <p>כאן תוכל לצפות ולעדכן את הפרטים האישיים שלך</p>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>פרטים אישיים</h2>
              {!isEditing && (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  ערוך פרטים
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
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
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "שומר..." : "שמור שינויים"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    ביטול
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-display">
                <div className="profile-info">
                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">שם פרטי:</span>
                      <span className="info-value">{user?.firstName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">שם משפחה:</span>
                      <span className="info-value">{user?.lastName}</span>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">מספר זהות:</span>
                      <span className="info-value">{user?.patientId}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">מספר טלפון:</span>
                      <span className="info-value">{user?.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="info-row">
                    <div className="info-item">
                      <span className="info-label">תאריך לידה:</span>
                      <span className="info-value">{formatBirthDate(user?.birthDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="sidebar-card">
              <h3>מידע נוסף</h3>
              <div className="sidebar-info">
                <div className="sidebar-item">
                  <span className="sidebar-icon">📞</span>
                  <div className="sidebar-content">
                    <div className="sidebar-title">צור קשר</div>
                    <div className="sidebar-text">לשינוי פרטים נוספים, צור קשר עם המזכירות</div>
                  </div>
                </div>

                <div className="sidebar-item">
                  <span className="sidebar-icon">🔒</span>
                  <div className="sidebar-content">
                    <div className="sidebar-title">פרטיות</div>
                    <div className="sidebar-text">הפרטים שלך מוגנים ומאובטחים במערכת</div>
                  </div>
                </div>

                <div className="sidebar-item">
                  <span className="sidebar-icon">📅</span>
                  <div className="sidebar-content">
                    <div className="sidebar-title">תורים</div>
                    <div className="sidebar-text">ניתן לקבוע תורים חדשים בכל עת</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
