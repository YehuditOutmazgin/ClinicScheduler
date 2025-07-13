"use client"

import React from "react"
import "../../styles/WeeklyCalendar.css"

const WeeklyCalendar = ({ appointments, onAppointmentSelect, currentWeek }) => {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const timeSlots = []

  // Generate time slots from 8:00 to 18:00 in 15-minute intervals
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
    }
  }

  const getWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentWeek)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getAppointmentForSlot = (date, timeSlot) => {
    const [hour, minute] = timeSlot.split(":").map(Number)
    const slotDateTime = new Date(date)
    slotDateTime.setHours(hour, minute, 0, 0)
    // alert("appointments"+appointments)
    return appointments.find((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      return appointmentDate.getTime() === slotDateTime.getTime()
    })
  }

  const getAppointmentSpan = (appointment) => {
    return Math.ceil(appointment.durationMinutes / 15)
  }

  const formatTime = (timeSlot) => {
    return timeSlot
  }

  const weekDates = getWeekDates()

  return (
    <div className="weekly-calendar">
      <div className="calendar-grid">
        {/* Header row */}
        <div className="time-header"></div>
        {daysOfWeek.map((day, index) => (
          <div key={day} className="day-header">
            <div className="day-name">{day}</div>
            <div className="day-date">
              {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
            </div>
          </div>
        ))}

        {/* Time slots */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeSlot}>
            <div className="time-slot-label">{formatTime(timeSlot)}</div>
            {weekDates.map((date, dayIndex) => {
              const appointment = getAppointmentForSlot(date, timeSlot)
              const isOccupied = appointments.some((apt) => {
                const aptDate = new Date(apt.appointmentDate)
                const slotDate = new Date(date)
                slotDate.setHours(
                  Number.parseInt(timeSlot.split(":")[0]),
                  Number.parseInt(timeSlot.split(":")[1]),
                  0,
                  0,
                )

                const aptStart = aptDate.getTime()
                const aptEnd = aptStart + apt.durationMinutes * 60 * 1000
                const slotTime = slotDate.getTime()

                return slotTime >= aptStart && slotTime < aptEnd && apt !== appointment
              })

              if (appointment && !isOccupied) {
                const span = getAppointmentSpan(appointment)
                return (
                  <div
                    key={`${dayIndex}-${timeIndex}`}
                    className="calendar-cell appointment-available"
                    style={{ gridRow: `span ${span}` }}
                    onClick={() => onAppointmentSelect(appointment)}
                  >
                    <div className="appointment-content">
                      <div className="appointment-time">
                        {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="appointment-duration">{appointment.durationMinutes} דק'</div>
                      <div className="appointment-therapist">{appointment.therapistName}</div>
                    </div>
                  </div>
                )
              } else if (isOccupied) {
                return null // Skip occupied slots
              } else {
                return <div key={`${dayIndex}-${timeIndex}`} className="calendar-cell empty-slot"></div>
              }
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default WeeklyCalendar
