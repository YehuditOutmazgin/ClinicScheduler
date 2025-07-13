"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { updateTherapistSchedule, addWorkHours, removeWorkHours } from "../../api/therapistFetch"
import Navigation from "../common/Navigation"
import "../../styles/TherapistSchedule.css"

const TherapistSchedule = () => {
  const { user } = useSelector((state) => state.auth)
  const [currentSchedule, setCurrentSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeTab, setActiveTab] = useState("regular")

  const daysOfWeek = [
    { value: "Sunday", label: "ראשון" },
    { value: "Monday", label: "שני" },
    { value: "Tuesday", label: "שלישי" },
    { value: "Wednesday", label: "רביעי" },
    { value: "Thursday", label: "חמישי" },
    { value: "Friday", label: "שישי" },
    { value: "Saturday", label: "שבת" },
  ]

  const {
    register: registerRegular,
    handleSubmit: handleSubmitRegular,
    formState: { errors: errorsRegular },
    reset: resetRegular,
  } = useForm()

  const {
    register: registerOneTime,
    handleSubmit: handleSubmitOneTime,
    formState: { errors: errorsOneTime },
    reset: resetOneTime,
  } = useForm()

  useEffect(() => {
    // Initialize with default schedule
    const defaultSchedule = daysOfWeek.map((day) => ({
      dayOfWeek: day.value,
      startTime: "08:00",
      endTime: "16:00",
      isActive: false,
    }))
    setCurrentSchedule(defaultSchedule)
  }, [])

  const handleRegularScheduleSubmit = async (data) => {
    try {
      setLoading(true)
      const scheduleData = daysOfWeek
        .filter((day) => data[`${day.value}_active`])
        .map((day) => ({
          dayOfWeek: day.value,
          startTime: data[`${day.value}_start`],
          endTime: data[`${day.value}_end`],
          therapistId: user.therapistId,
        }))

      await updateTherapistSchedule(user.therapistId, scheduleData)
      setSuccessMessage("לוח הזמנים הקבוע עודכן בהצלחה!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating schedule:", error)
      alert("שגיאה בעדכון לוח הזמנים")
    } finally {
      setLoading(false)
    }
  }

  const handleOneTimeScheduleSubmit = async (data) => {
    try {
      setLoading(true)
      const workHourData = {
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        therapistId: user.therapistId,
      }

      if (data.action === "add") {
        await addWorkHours(user.therapistId, workHourData)
        setSuccessMessage("שעות עבודה נוספו בהצלחה!")
      } else {
        await removeWorkHours(user.therapistId, workHourData)
        setSuccessMessage("שעות עבודה הוסרו בהצלחה!")
      }

      resetOneTime()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error updating one-time schedule:", error)
      alert("שגיאה בעדכון שעות העבודה")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navigation userType="therapist" />

      <div className="container">
        <div className="schedule-header">
          <h1>ניהול לוח הזמנים</h1>
          <p>כאן תוכל לנהל את שעות העבודה הקבועות והחד-פעמיות שלך</p>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="schedule-tabs">
          <button
            className={`tab-button ${activeTab === "regular" ? "active" : ""}`}
            onClick={() => setActiveTab("regular")}
          >
            לוח זמנים קבוע
          </button>
          <button
            className={`tab-button ${activeTab === "onetime" ? "active" : ""}`}
            onClick={() => setActiveTab("onetime")}
          >
            שינויים חד-פעמיים
          </button>
        </div>

        {activeTab === "regular" && (
          <div className="schedule-card">
            <div className="card-header">
              <h2 className="card-title">לוח זמנים קבוע</h2>
              <p>הגדר את שעות העבודה הקבועות שלך לכל יום בשבוע</p>
            </div>

            <form onSubmit={handleSubmitRegular(handleRegularScheduleSubmit)} className="schedule-form">
              {daysOfWeek.map((day) => (
                <div key={day.value} className="day-schedule">
                  <div className="day-header">
                    <label className="day-checkbox">
                      <input type="checkbox" {...registerRegular(`${day.value}_active`)} />
                      <span className="day-name">{day.label}</span>
                    </label>
                  </div>

                  <div className="time-inputs">
                    <div className="form-group">
                      <label className="form-label">שעת התחלה</label>
                      <input
                        type="time"
                        className="form-control"
                        {...registerRegular(`${day.value}_start`, {
                          required: "שעת התחלה נדרשת",
                        })}
                        defaultValue="08:00"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">שעת סיום</label>
                      <input
                        type="time"
                        className="form-control"
                        {...registerRegular(`${day.value}_end`, {
                          required: "שעת סיום נדרשת",
                        })}
                        defaultValue="16:00"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "שומר..." : "שמור לוח זמנים"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => resetRegular()}>
                  איפוס
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "onetime" && (
          <div className="schedule-card">
            <div className="card-header">
              <h2 className="card-title">שינויים חד-פעמיים</h2>
              <p>הוסף או הסר שעות עבודה לתאריך מסוים</p>
            </div>

            <form onSubmit={handleSubmitOneTime(handleOneTimeScheduleSubmit)} className="onetime-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">יום בשבוע</label>
                  <select
                    className="form-select"
                    {...registerOneTime("dayOfWeek", {
                      required: "יום בשבוע נדרש",
                    })}
                  >
                    <option value="">בחר יום</option>
                    {daysOfWeek.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                  {errorsOneTime.dayOfWeek && <span className="error-message">{errorsOneTime.dayOfWeek.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">פעולה</label>
                  <select
                    className="form-select"
                    {...registerOneTime("action", {
                      required: "פעולה נדרשת",
                    })}
                  >
                    <option value="">בחר פעולה</option>
                    <option value="add">הוסף שעות עבודה</option>
                    <option value="remove">הסר שעות עבודה</option>
                  </select>
                  {errorsOneTime.action && <span className="error-message">{errorsOneTime.action.message}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">שעת התחלה</label>
                  <input
                    type="time"
                    className="form-control"
                    {...registerOneTime("startTime", {
                      required: "שעת התחלה נדרשת",
                    })}
                  />
                  {errorsOneTime.startTime && <span className="error-message">{errorsOneTime.startTime.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">שעת סיום</label>
                  <input
                    type="time"
                    className="form-control"
                    {...registerOneTime("endTime", {
                      required: "שעת סיום נדרשת",
                    })}
                  />
                  {errorsOneTime.endTime && <span className="error-message">{errorsOneTime.endTime.message}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "מעדכן..." : "עדכן שעות עבודה"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => resetOneTime()}>
                  נקה טופס
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default TherapistSchedule
