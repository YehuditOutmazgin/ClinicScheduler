// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { useSelector, useDispatch } from "react-redux"
// // import type { RootState, AppDispatch } from "../../redux/store"
// // import {
// //   fetchAvailableAppointmentsForTherapistWeek,
// //   fetchTherapistWeekAppointments,
// //   scheduleAppointment,
// //   deleteAppointment,
// // } from "../../redux/slices/appointmentSlice"
// // import type { AvailableAppointment, Appointment } from "../../types"
// // import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
// // import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
// // import { getUserId } from "../../types"
// // import "../../styles/WeeklyCalendar.css"
// // import { useParams } from "react-router-dom"

// // interface WeeklyCalendarProps {
// //   selectedTherapist?: number
// //   selectedSpecialty?: string
// //   patientId?: number
// // }

// // interface AppointmentDetailsModalProps {
// //   appointment: AvailableAppointment | Appointment | null
// //   isOpen: boolean
// //   onClose: () => void
// //   onBook?: (patientId: number) => void
// //   onCancel?: (appointmentId: number) => void
// //   isAvailable: boolean
// // }

// // const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
// //   appointment,
// //   isOpen,
// //   onClose,
// //   onBook,
// //   onCancel,
// //   isAvailable,
// // }) => {
// //     const { patientId } = useParams<{ patientId: string }>()
// //   const [bookingPatientId, setBookingPatientId] = useState("")
// //   // const { patients } = useSelector((state: RootState) => state.patients)
// //   const { role } = useSelector((state: RootState) => state.auth)

// //   useEffect(()=>{
// //     // const pid=Number.parseInt(patientId || "0");
// //     if(patientId)
// //     setBookingPatientId(patientId)
// //   },[])
// //   if (!isOpen || !appointment) return null

// //   const handleBook = () => {
// //     if (onBook && bookingPatientId) {
// //       onBook(Number.parseInt(bookingPatientId))
// //       setBookingPatientId("")
// //       onClose()
// //     }
// //   }

// //   const handleCancel = () => {
// //     if (onCancel && "appointmentId" in appointment) {
// //       onCancel(appointment.appointmentId)
// //       onClose()
// //     }
// //   }

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <h3 className="modal-title">{isAvailable ? "פרטי תור זמין" : "פרטי תור תפוס"}</h3>
// //           <button className="modal-close" onClick={onClose}>
// //             ×
// //           </button>
// //         </div>

// //         <div className="modal-content">
// //           <div className="appointment-details">
// //             <div className="detail-item">
// //               <span className="detail-label">תאריך:</span>
// //               <span className="detail-value">{new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}</span>
// //             </div>
// //             <div className="detail-item">
// //               <span className="detail-label">שעה:</span>
// //               <span className="detail-value">
// //                 {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
// //                   hour: "2-digit",
// //                   minute: "2-digit",
// //                 })}
// //               </span>
// //             </div>
// //             <div className="detail-item">
// //               <span className="detail-label">מטפל:</span>
// //               <span className="detail-value">{appointment.therapistName}</span>
// //             </div>
// //             <div className="detail-item">
// //               <span className="detail-label">משך התור:</span>
// //               <span className="detail-value">{appointment.durationMinutes} דקות</span>
// //             </div>
// //             {!isAvailable && "patient" in appointment && appointment.patient && (
// //               <>
// //                 <div className="detail-item">
// //                   <span className="detail-label">מטופל:</span>
// //                   <span className="detail-value">
// //                     {appointment.patient.firstName} {appointment.patient.lastName}
// //                   </span>
// //                 </div>
// //                 <div className="detail-item">
// //                   <span className="detail-label">מספר זהות:</span>
// //                   <span className="detail-value">{appointment.patient.patientId}</span>
// //                 </div>
// //               </>
// //             )}
// //           </div>

// //           {isAvailable && role === "secretary" && (
// //             <div className="booking-section">
// //               <div className="form-group">
// //                 <label className="form-label">בחר מטופל:</label>

// //                 <input
// //                   type="text"
// //                   value={bookingPatientId}
// //                   onChange={(e) => setBookingPatientId(e.target.value)}
// //                   className="form-input"
// //                   placeholder="הכנס מספר זהות"
// //                 />

// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         <div className="modal-actions">
// //           <button className="btn btn-secondary" onClick={onClose}>
// //             סגור
// //           </button>
// //           {isAvailable && role === "secretary" && (
// //             <button className="btn btn-primary" onClick={handleBook} disabled={!bookingPatientId}>
// //               קבע תור
// //             </button>
// //           )}
// //           {!isAvailable && (role === "secretary" || role === "therapist") && (
// //             <button className="btn btn-danger" onClick={handleCancel}>
// //               בטל תור
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedTherapist, selectedSpecialty, patientId }) => {
// //   const [currentWeek, setCurrentWeek] = useState(new Date())
// //   const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | Appointment | null>(null)
// //   const [showModal, setShowModal] = useState(false)
// //   const [isAvailableAppointment, setIsAvailableAppointment] = useState(false)

// //   const dispatch = useDispatch<AppDispatch>()
// //   const { availableAppointments, appointments } = useSelector((state: RootState) => state.appointments)
// //   const { patients } = useSelector((state: RootState) => state.patients)
// //   const { therapists } = useSelector((state: RootState) => state.therapists)
// //   const { role, user } = useSelector((state: RootState) => state.auth)

// //   useEffect(() => {
// //     dispatch(fetchPatientsThunk())
// //     dispatch(fetchAllTherapistsThunk())
// //   }, [dispatch])

// //   const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
// //   const timeSlots = []

// //   // Generate time slots from 8:00 to 18:00 in 15-minute intervals
// //   for (let hour = 8; hour < 18; hour++) {
// //     for (let minute = 0; minute < 60; minute += 15) {
// //       timeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
// //     }
// //   }

// //   useEffect(() => {
// //     if (selectedTherapist) {

// //       const weekDate = currentWeek.toISOString().split("T")[0]
// //        dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
// //        dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate }))
// //       // alert("set:  " + JSON.stringify(appointments))
// //       // alert("avail  " + JSON.stringify(availableAppointments))
// //       console.log("availableAppointments", availableAppointments)
// //       console.log("appointments", appointments)
// //     }
// //   }, [selectedTherapist, currentWeek, dispatch])

// //   const getWeekDates = () => {
// //     const dates = []
// //     const startOfWeek = new Date(currentWeek)
// //     const day = startOfWeek.getDay()
// //     const diff = startOfWeek.getDate() - day
// //     startOfWeek.setDate(diff)

// //     for (let i = 0; i < 7; i++) {
// //       const date = new Date(startOfWeek)
// //       date.setDate(startOfWeek.getDate() + i)
// //       dates.push(date)
// //     }
// //     return dates
// //   }

// //   const getAvailableAppointmentForSlot = (date: Date, timeSlot: string) => {
// //     const [hour, minute] = timeSlot.split(":").map(Number)
// //     const slotDateTime = new Date(date)
// //     slotDateTime.setHours(hour, minute, 0, 0)

// //     return availableAppointments.find((appointment) => {
// //       const appointmentDate = new Date(appointment.appointmentDate)
// //       return appointmentDate.getTime() === slotDateTime.getTime()
// //     })
// //   }

// //   const getAppointmentForSlot = (date: Date, timeSlot: string) => {
// //     const [hour, minute] = timeSlot.split(":").map(Number)
// //     const slotDateTime = new Date(date)
// //     slotDateTime.setHours(hour, minute, 0, 0)

// //     return appointments.find((appointment) => {
// //       const appointmentDate = new Date(appointment.appointmentDate)
// //       return appointmentDate.getTime() === slotDateTime.getTime()
// //     })
// //   }

// //   const handleAppointmentClick = (appointment: AvailableAppointment | Appointment, isAvailable: boolean) => {
// //     setSelectedAppointment(appointment)
// //     setIsAvailableAppointment(isAvailable)
// //     setShowModal(true)
// //   }

// //   const handleBookAppointment = async (patientId: number) => {
// //     if (!selectedAppointment) return

// //     await dispatch(
// //       scheduleAppointment({
// //         patientId,
// //         appointmentId: selectedAppointment.appointmentId,
// //       }),
// //     )

// //     setShowModal(false)
// //     setSelectedAppointment(null)
// //   }

// //   const handleCancelAppointment = async (appointmentId: number) => {
// //     if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
// //       const userId = (selectedAppointment as Appointment).patient?.patientId
// //       if (userId) {
// //         await dispatch(deleteAppointment({ appointmentId, patientId: userId }))
// //         alert("fetch")
// //       }
// //       const weekDate = currentWeek.toISOString().split("T")[0]
// //       if (selectedTherapist)
// //         dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
// //       setShowModal(false)
// //       setSelectedAppointment(null)
// //     }
// //   }

// //   const navigateWeek = (direction: "prev" | "next") => {
// //     const newWeek = new Date(currentWeek)
// //     newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
// //     setCurrentWeek(newWeek)
// //   }

// //   const getAppointmentHeight = (durationMinutes: number) => {
// //     // Each 15-minute slot is one unit, so calculate how many units this appointment spans
// //     const units = Math.ceil(durationMinutes / 15)
// //     return units
// //   }

// //   const weekDates = getWeekDates()

// //   return (
// //     <div className="weekly-calendar">
// //       <div className="calendar-header">
// //         <h3 className="calendar-title">
// //           שבוע {weekDates[0].toLocaleDateString("he-IL")} - {weekDates[6].toLocaleDateString("he-IL")}
// //         </h3>
// //         <div className="calendar-navigation">
// //           <button className="nav-button" onClick={() => navigateWeek("prev")}>
// //             שבוע קודם
// //           </button>
// //           <button className="nav-button" onClick={() => navigateWeek("next")}>
// //             שבוע הבא
// //           </button>
// //         </div>
// //       </div>

// //       <div className="calendar-grid">
// //         {/* Header row */}
// //         <div className="time-header">שעה</div>
// //         {daysOfWeek.map((day, index) => (
// //           <div key={day} className="day-header">
// //             <div className="day-name">{day}</div>
// //             <div className="day-date">
// //               {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
// //             </div>
// //           </div>
// //         ))}

// //         {/* Time slots */}
// //         {timeSlots.map((timeSlot, timeIndex) => (
// //           <React.Fragment key={timeSlot}>
// //             <div className="time-slot-label">{timeSlot}</div>
// //             {weekDates.map((date, dayIndex) => {
// //               const availableAppointment = getAvailableAppointmentForSlot(date, timeSlot)
// //               const bookedAppointment = getAppointmentForSlot(date, timeSlot)

// //               if (availableAppointment) {
// //                 const height = getAppointmentHeight(availableAppointment.durationMinutes)
// //                 return (
// //                   <div
// //                     key={`${dayIndex}-${timeSlot}`}
// //                     className="calendar-cell appointment-available"
// //                     style={{ gridRowEnd: `span ${height}` }}
// //                     onClick={() => handleAppointmentClick(availableAppointment, true)}
// //                   >
// //                     <div className="appointment-content">
// //                       <div className="appointment-time">{timeSlot}</div>
// //                       <div className="appointment-duration">{availableAppointment.durationMinutes} דק'</div>
// //                       <div className="appointment-therapist">{availableAppointment.therapistName}</div>
// //                     </div>
// //                   </div>
// //                 )
// //               } else if (bookedAppointment) {
// //                 const height = getAppointmentHeight(bookedAppointment.durationMinutes)
// //                 return (
// //                   <div
// //                     key={`${dayIndex}-${timeSlot}`}
// //                     className="calendar-cell appointment-booked"
// //                     style={{ gridRowEnd: `span ${height}` }}
// //                     onClick={() => handleAppointmentClick(bookedAppointment, false)}
// //                   >
// //                     <div className="appointment-content">
// //                       <div className="appointment-time">{timeSlot}</div>
// //                       <div className="appointment-duration">{bookedAppointment.durationMinutes} דק'</div>
// //                       <div className="appointment-therapist">{bookedAppointment.therapistName}</div>
// //                       {bookedAppointment.patient && (
// //                         <div className="appointment-patient">
// //                           {bookedAppointment.patient.firstName} {bookedAppointment.patient.lastName}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )
// //               } else {
// //                 return <div key={`${dayIndex}-${timeSlot}`} className="calendar-cell empty-slot"></div>
// //               }
// //             })}
// //           </React.Fragment>
// //         ))}
// //       </div>

// //       <div className="calendar-controls">
// //         <div className="calendar-legend">
// //           <div className="legend-item">
// //             <div className="legend-color legend-available"></div>
// //             <span>זמין</span>
// //           </div>
// //           <div className="legend-item">
// //             <div className="legend-color legend-booked"></div>
// //             <span>תפוס</span>
// //           </div>
// //           <div className="legend-item">
// //             <div className="legend-color legend-empty"></div>
// //             <span>לא זמין</span>
// //           </div>
// //         </div>
// //       </div>

// //       <AppointmentDetailsModal
// //         appointment={selectedAppointment}
// //         isOpen={showModal}
// //         onClose={() => setShowModal(false)}
// //         onBook={handleBookAppointment}
// //         onCancel={handleCancelAppointment}
// //         isAvailable={isAvailableAppointment}
// //       />
// //     </div>
// //   )
// // }

// // export default WeeklyCalendar
// "use client"

// import React, { useState, useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState, AppDispatch } from "../../redux/store"
// import {
//   fetchAvailableAppointmentsForTherapistWeek,
//   fetchTherapistWeekAppointments,
//   scheduleAppointment,
//   deleteAppointment,
// } from "../../redux/slices/appointmentSlice"
// import type { AvailableAppointment, Appointment } from "../../types"
// import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
// import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
// import "../../styles/WeeklyCalendar.css"
// import { useParams } from "react-router-dom"

// interface WeeklyCalendarProps {
//   selectedTherapist?: number
//   selectedSpecialty?: string
//   patientId?: number
// }

// interface AppointmentDetailsModalProps {
//   appointment: AvailableAppointment | Appointment | null
//   isOpen: boolean
//   onClose: () => void
//   onBook?: (patientId: number) => void
//   onCancel?: (appointmentId: number) => void
//   isAvailable: boolean
// }

// interface TimeSlot {
//   time: string
//   hour: number
//   minute: number
// }

// interface AppointmentSlot {
//   appointment: AvailableAppointment | Appointment
//   isAvailable: boolean
//   duration: number
//   isStart: boolean
// }

// const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
//   appointment,
//   isOpen,
//   onClose,
//   onBook,
//   onCancel,
//   isAvailable,
// }) => {
//   const { patientId } = useParams<{ patientId: string }>()
//   const [bookingPatientId, setBookingPatientId] = useState("")
//   const { role, user } = useSelector((state: RootState) => state.auth)

//   useEffect(() => {
//     // Auto-fill patient ID from URL params or user context
//     if (patientId) {
//       setBookingPatientId(patientId)
//     } 
//     // else if (user && role === "patient") {
//     //   setBookingPatientId(user.id?.toString() || "")
//     // }
//   }, [patientId, user, role])

//   if (!isOpen || !appointment) return null

//   const handleBook = () => {
//     if (onBook && bookingPatientId) {
//       onBook(Number.parseInt(bookingPatientId))
//       setBookingPatientId("")
//       onClose()
//     }
//   }

//   const handleCancel = () => {
//     if (onCancel && "appointmentId" in appointment) {
//       onCancel(appointment.appointmentId)
//       onClose()
//     }

//   }

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">{isAvailable ? "פרטי תור זמין" : "פרטי תור תפוס"}</h3>
//           <button className="modal-close" onClick={onClose}>
//             ×
//           </button>
//         </div>
//         <div className="modal-content">
//           <div className="appointment-details">
//             <div className="detail-item">
//               <span className="detail-label">תאריך:</span>
//               <span className="detail-value">{new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}</span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">שעה:</span>
//               <span className="detail-value">
//                 {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">מטפל:</span>
//               <span className="detail-value">{appointment.therapistName}</span>
//             </div>
//             <div className="detail-item">
//               <span className="detail-label">משך התור:</span>
//               <span className="detail-value">{appointment.durationMinutes} דקות</span>
//             </div>
//             {!isAvailable && "patient" in appointment && appointment.patient && (
//               <>
//                 <div className="detail-item">
//                   <span className="detail-label">מטופל:</span>
//                   <span className="detail-value">
//                     {appointment.patient.firstName} {appointment.patient.lastName}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">מספר זהות:</span>
//                   <span className="detail-value">{appointment.patient.patientId}</span>
//                 </div>
//               </>
//             )}
//           </div>
//           {isAvailable && (role === "secretary" || role === "patient") && (
//             <div className="booking-section">
//               <div className="form-group">
//                 <label className="form-label">{role === "secretary" ? "בחר מטופל:" : "מספר זהות:"}</label>
//                 <input
//                   type="text"
//                   value={bookingPatientId}
//                   onChange={(e) => setBookingPatientId(e.target.value)}
//                   className="form-input"
//                   placeholder="הכנס מספר זהות"
//                   disabled={role === "patient"}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="modal-actions">
//           <button className="btn btn-secondary" onClick={onClose}>
//             סגור
//           </button>
//           {isAvailable && (role === "secretary" || role === "patient") && (
//             <button className="btn btn-primary" onClick={handleBook} disabled={!bookingPatientId}>
//               קבע תור
//             </button>
//           )}
//           {!isAvailable && (role === "secretary" || role === "therapist") && (
//             <button className="btn btn-danger" onClick={handleCancel}>
//               בטל תור
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedTherapist, selectedSpecialty, patientId }) => {
//   const [currentWeek, setCurrentWeek] = useState(new Date())
//   const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | Appointment | null>(null)
//   const [showModal, setShowModal] = useState(false)
//   const [isAvailableAppointment, setIsAvailableAppointment] = useState(false)

//   const dispatch = useDispatch<AppDispatch>()
//   const { availableAppointments, appointments } = useSelector((state: RootState) => state.appointments)
//   const { patients } = useSelector((state: RootState) => state.patients)
//   const { therapists } = useSelector((state: RootState) => state.therapists)
//   const { role, user } = useSelector((state: RootState) => state.auth)

//   useEffect(() => {
//     dispatch(fetchPatientsThunk())
//     dispatch(fetchAllTherapistsThunk())
//   }, [dispatch])

//   const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

//   // Generate time slots from 8:00 to 18:00 in 15-minute intervals
//   const timeSlots: TimeSlot[] = []
//   for (let hour = 8; hour < 18; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       timeSlots.push({
//         time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
//         hour,
//         minute,
//       })
//     }
//   }

//   useEffect(() => {
//     if (selectedTherapist) {
//       const weekDate = currentWeek.toISOString().split("T")[0]
//       dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
//       dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate }))
//     }
//   }, [selectedTherapist, currentWeek, dispatch])

//   const getWeekDates = () => {
//     const dates = []
//     const startOfWeek = new Date(currentWeek)
//     const day = startOfWeek.getDay()
//     const diff = startOfWeek.getDate() - day
//     startOfWeek.setDate(diff)

//     for (let i = 0; i < 7; i++) {
//       const date = new Date(startOfWeek)
//       date.setDate(startOfWeek.getDate() + i)
//       dates.push(date)
//     }
//     return dates
//   }

//   // Create a grid structure that properly handles appointment spanning
//   const createAppointmentGrid = () => {
//     const weekDates = getWeekDates()
//     const grid: (AppointmentSlot | null)[][] = []

//     // Initialize empty grid
//     for (let timeIndex = 0; timeIndex < timeSlots.length; timeIndex++) {
//       grid[timeIndex] = new Array(7).fill(null)
//     }

//     // Fill available appointments
//     availableAppointments.forEach((appointment) => {
//       const appointmentDate = new Date(appointment.appointmentDate)
//       const dayIndex = weekDates.findIndex((date) => date.toDateString() === appointmentDate.toDateString())

//       if (dayIndex !== -1) {
//         const timeIndex = timeSlots.findIndex((slot) => {
//           const slotDateTime = new Date(appointmentDate)
//           slotDateTime.setHours(slot.hour, slot.minute, 0, 0)
//           return slotDateTime.getTime() === appointmentDate.getTime()
//         })

//         if (timeIndex !== -1) {
//           const duration = Math.ceil(appointment.durationMinutes / 15)

//           // Place the appointment in the grid
//           for (let i = 0; i < duration && timeIndex + i < timeSlots.length; i++) {
//             grid[timeIndex + i][dayIndex] = {
//               appointment,
//               isAvailable: true,
//               duration,
//               isStart: i === 0,
//             }
//           }
//         }
//       }
//     })

//     // Fill booked appointments
//     appointments.forEach((appointment) => {
//       const appointmentDate = new Date(appointment.appointmentDate)
//       const dayIndex = weekDates.findIndex((date) => date.toDateString() === appointmentDate.toDateString())

//       if (dayIndex !== -1) {
//         const timeIndex = timeSlots.findIndex((slot) => {
//           const slotDateTime = new Date(appointmentDate)
//           slotDateTime.setHours(slot.hour, slot.minute, 0, 0)
//           return slotDateTime.getTime() === appointmentDate.getTime()
//         })

//         if (timeIndex !== -1) {
//           const duration = Math.ceil(appointment.durationMinutes / 15)

//           // Place the appointment in the grid
//           for (let i = 0; i < duration && timeIndex + i < timeSlots.length; i++) {
//             grid[timeIndex + i][dayIndex] = {
//               appointment,
//               isAvailable: false,
//               duration,
//               isStart: i === 0,
//             }
//           }
//         }
//       }
//     })

//     return grid
//   }

//   const handleAppointmentClick = (appointment: AvailableAppointment | Appointment, isAvailable: boolean) => {
//     setSelectedAppointment(appointment)
//     setIsAvailableAppointment(isAvailable)
//     setShowModal(true)
//   }

//   const handleBookAppointment = async (patientId: number) => {
//     if (!selectedAppointment) return

//     await dispatch(
//       scheduleAppointment({
//         patientId,
//         appointmentId: selectedAppointment.appointmentId,
//       }),
//     )

//     // Refresh the appointments after booking
//     const weekDate = currentWeek.toISOString().split("T")[0]
//     if (selectedTherapist) {
//       dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
//       dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate }))
//     }

//     setShowModal(false)
//     setSelectedAppointment(null)
//   }

//   const handleCancelAppointment = async (appointmentId: number) => {
//     if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
//       const userId = (selectedAppointment as Appointment).patient?.patientId
//       if (userId) {
//         await dispatch(deleteAppointment({ appointmentId, patientId: userId }))

//         // Refresh the appointments after cancellation
//         const weekDate = currentWeek.toISOString().split("T")[0]
//         if (selectedTherapist) {
//           alert("fetch")
//           dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
//           dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate }))
//         }
//       }
//       setShowModal(false)
//       setSelectedAppointment(null)
//     }
//   }

//   const navigateWeek = (direction: "prev" | "next") => {
//     const newWeek = new Date(currentWeek)
//     newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
//     setCurrentWeek(newWeek)
//   }

//   const weekDates = getWeekDates()
//   const appointmentGrid = createAppointmentGrid()

//   return (
//     <div className="weekly-calendar">
//       <div className="calendar-header">
//         <h3 className="calendar-title">
//           שבוע {weekDates[0].toLocaleDateString("he-IL")} - {weekDates[6].toLocaleDateString("he-IL")}
//         </h3>
//         <div className="calendar-navigation">
//           <button className="nav-button" onClick={() => navigateWeek("prev")}>
//             שבוע קודם
//           </button>
//           <button className="nav-button" onClick={() => navigateWeek("next")}>
//             שבוע הבא
//           </button>
//         </div>
//       </div>

//       <div className="calendar-container">
//         <div className="calendar-grid">
//           {/* Header row */}
//           <div className="time-header">שעה</div>
//           {daysOfWeek.map((day, index) => (
//             <div key={day} className="day-header">
//               <div className="day-name">{day}</div>
//               <div className="day-date">
//                 {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
//               </div>
//             </div>
//           ))}

//           {/* Time slots and appointments */}
//           {timeSlots.map((timeSlot, timeIndex) => (
//             <React.Fragment key={timeSlot.time}>
//               <div className="time-slot-label">{timeSlot.time}</div>
//               {weekDates.map((date, dayIndex) => {
//                 const appointmentSlot = appointmentGrid[timeIndex][dayIndex]

//                 if (appointmentSlot && appointmentSlot.isStart) {
//                   // This is the start of an appointment
//                   const { appointment, isAvailable, duration } = appointmentSlot
//                   const className = isAvailable ? "appointment-available" : "appointment-booked"

//                   return (
//                     <div
//                       key={`${dayIndex}-${timeSlot.time}`}
//                       className={`calendar-cell ${className}`}
//                       style={{
//                         gridRow: `span ${duration}`,
//                         zIndex: 10,
//                       }}
//                       onClick={() => handleAppointmentClick(appointment, isAvailable)}
//                     >
//                       <div className="appointment-content">
//                         <div className="appointment-time">{timeSlot.time}</div>
//                         <div className="appointment-duration">{appointment.durationMinutes} דק'</div>
//                         <div className="appointment-therapist">{appointment.therapistName}</div>
//                         {!isAvailable && "patient" in appointment && appointment.patient && (
//                           <div className="appointment-patient">
//                             {appointment.patient.firstName} {appointment.patient.lastName}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )
//                 } else if (appointmentSlot && !appointmentSlot.isStart) {
//                   // This is a continuation of an appointment - render empty but don't show
//                   return null
//                 } else {
//                   // Empty slot
//                   return <div key={`${dayIndex}-${timeSlot.time}`} className="calendar-cell empty-slot"></div>
//                 }
//               })}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       <div className="calendar-controls">
//         <div className="calendar-legend">
//           <div className="legend-item">
//             <div className="legend-color legend-available"></div>
//             <span>זמין</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color legend-booked"></div>
//             <span>תפוס</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color legend-empty"></div>
//             <span>לא זמין</span>
//           </div>
//         </div>
//       </div>

//       <AppointmentDetailsModal
//         appointment={selectedAppointment}
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onBook={handleBookAppointment}
//         onCancel={handleCancelAppointment}
//         isAvailable={isAvailableAppointment}
//       />
//     </div>
//   )
// }

// export default WeeklyCalendar
"use client"

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  fetchAvailableAppointmentsForTherapistWeek,
  fetchTherapistWeekAppointments,
  scheduleAppointment,
  deleteAppointment,
} from "../../redux/slices/appointmentSlice"
import type { AvailableAppointment, Appointment } from "../../types"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import "../../styles/WeeklyCalendar.css"
import { useParams } from "react-router-dom"

interface WeeklyCalendarProps {
  selectedTherapist?: number
  selectedSpecialty?: string
  patientId?: number
}

interface AppointmentDetailsModalProps {
  appointment: AvailableAppointment | Appointment | null
  isOpen: boolean
  onClose: () => void
  onBook?: (patientId: number) => void
  onCancel?: (appointmentId: number) => void
  isAvailable: boolean
}

interface TimeSlot {
  time: string
  hour: number
  minute: number
}

interface AppointmentSlot {
  appointment: AvailableAppointment | Appointment
  isAvailable: boolean
  duration: number
  isStart: boolean
  slotIndex: number // Add slot index to track position
}

interface MessageState {
  type: "success" | "error" | null
  text: string
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onBook,
  onCancel,
  isAvailable,
}) => {
  const { patientId } = useParams<{ patientId: string }>()
  const [bookingPatientId, setBookingPatientId] = useState("")
  const { role, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Auto-fill patient ID from URL params or user context
    if (patientId) {
      setBookingPatientId(patientId)
    }
    // Uncomment if you want to auto-fill for patient role
    // else if (user && role === "patient") {
    //   setBookingPatientId(user.id?.toString() || "")
    // }
  }, [patientId, user, role])

  if (!isOpen || !appointment) return null

  const handleBook = () => {
    if (onBook && bookingPatientId) {
      onBook(Number.parseInt(bookingPatientId))
      setBookingPatientId("")
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel && "appointmentId" in appointment) {
      onCancel(appointment.appointmentId)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{isAvailable ? "פרטי תור זמין" : "פרטי תור תפוס"}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <div className="appointment-details">
            <div className="detail-item">
              <span className="detail-label">תאריך:</span>
              <span className="detail-value">{new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">שעה:</span>
              <span className="detail-value">
                {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">מטפל:</span>
              <span className="detail-value">{appointment.therapistName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">משך התור:</span>
              <span className="detail-value">{appointment.durationMinutes} דקות</span>
            </div>
            {!isAvailable && "patient" in appointment && appointment.patient && (
              <>
                <div className="detail-item">
                  <span className="detail-label">מטופל:</span>
                  <span className="detail-value">
                    {appointment.patient.firstName} {appointment.patient.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">מספר זהות:</span>
                  <span className="detail-value">{appointment.patient.patientId}</span>
                </div>
              </>
            )}
          </div>
          {isAvailable && (role === "secretary" || role === "patient") && (
            <div className="booking-section">
              <div className="form-group">
                <label className="form-label">{role === "secretary" ? "בחר מטופל:" : "מספר זהות:"}</label>
                <input
                  type="text"
                  value={bookingPatientId}
                  onChange={(e) => setBookingPatientId(e.target.value)}
                  className="form-input"
                  placeholder="הכנס מספר זהות"
                  disabled={role === "patient"}
                />
              </div>
            </div>
          )}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            סגור
          </button>
          {isAvailable && (role === "secretary" || role === "patient") && (
            <button className="btn btn-primary" onClick={handleBook} disabled={!bookingPatientId}>
              קבע תור
            </button>
          )}
          {!isAvailable && (role === "secretary" || role === "therapist") && (
            <button className="btn btn-danger" onClick={handleCancel}>
              בטל תור
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedTherapist, selectedSpecialty, patientId }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | Appointment | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isAvailableAppointment, setIsAvailableAppointment] = useState(false)
  const [message, setMessage] = useState<MessageState>({ type: null, text: "" })
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { availableAppointments, appointments } = useSelector((state: RootState) => state.appointments)
  const { patients } = useSelector((state: RootState) => state.patients)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { role, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({ type: null, text: "" })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

  // Generate time slots from 8:00 to 18:00 in 15-minute intervals
  const timeSlots: TimeSlot[] = []
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push({
        time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        hour,
        minute,
      })
    }
  }

  const loadAppointmentData = async () => {
    if (selectedTherapist) {
      setIsLoading(true)
      try {
        const weekDate = currentWeek.toISOString().split("T")[0]
        await Promise.all([
          dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate })),
          dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate })),
        ])
      } catch (error) {
        console.error("Error loading appointment data:", error)
        setMessage({ type: "error", text: "שגיאה בטעינת נתוני התורים" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    loadAppointmentData()
  }, [selectedTherapist, currentWeek, dispatch])

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

  // Create a grid structure that properly handles appointment spanning
  const createAppointmentGrid = () => {
    const weekDates = getWeekDates()
    const grid: (AppointmentSlot | null)[][] = []

    // Initialize empty grid
    for (let timeIndex = 0; timeIndex < timeSlots.length; timeIndex++) {
      grid[timeIndex] = new Array(7).fill(null)
    }

    // Helper function to place appointment in grid
    const placeAppointmentInGrid = (appointment: AvailableAppointment | Appointment, isAvailable: boolean) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      const dayIndex = weekDates.findIndex((date) => date.toDateString() === appointmentDate.toDateString())

      if (dayIndex !== -1) {
        const timeIndex = timeSlots.findIndex((slot) => {
          const slotDateTime = new Date(appointmentDate)
          slotDateTime.setHours(slot.hour, slot.minute, 0, 0)
          return slotDateTime.getTime() === appointmentDate.getTime()
        })

        if (timeIndex !== -1) {
          const duration = Math.ceil(appointment.durationMinutes / 15)

          // Only place if the slot is empty to avoid overwriting
          if (grid[timeIndex][dayIndex] === null) {
            // Place the appointment in the grid
            for (let i = 0; i < duration && timeIndex + i < timeSlots.length; i++) {
              grid[timeIndex + i][dayIndex] = {
                appointment: { ...appointment }, // Create a copy to avoid reference issues
                isAvailable,
                duration,
                isStart: i === 0,
                slotIndex: i,
              }
            }
          }
        }
      }
    }

    // Fill available appointments first
    availableAppointments.forEach((appointment) => {
      placeAppointmentInGrid(appointment, true)
    })

    // Fill booked appointments (they take priority over available ones)
    appointments.forEach((appointment) => {
      placeAppointmentInGrid(appointment, false)
    })

    return grid
  }

  const handleAppointmentClick = (appointment: AvailableAppointment | Appointment, isAvailable: boolean) => {
    setSelectedAppointment(appointment)
    setIsAvailableAppointment(isAvailable)
    setShowModal(true)
  }

  const handleBookAppointment = async (patientId: number) => {
    if (!selectedAppointment) return

    setIsLoading(true)
    try {
      const result = await dispatch(
        scheduleAppointment({
          patientId,
          appointmentId: selectedAppointment.appointmentId,
        }),
      )

      if (scheduleAppointment.fulfilled.match(result)) {
        setMessage({ type: "success", text: "התור נקבע בהצלחה!" })
        // Reload appointment data
        await loadAppointmentData()
      } else {
        setMessage({ type: "error", text: "שגיאה בקביעת התור. נסה שוב." })
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
      setMessage({ type: "error", text: "שגיאה בקביעת התור. נסה שוב." })
    } finally {
      setIsLoading(false)
      setShowModal(false)
      setSelectedAppointment(null)
    }
  }

  const handleCancelAppointment = async (appointmentId: number) => {
    if (!window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      return
    }

    const userId = (selectedAppointment as Appointment).patient?.patientId
    if (!userId) {
      setMessage({ type: "error", text: "לא ניתן לבטל את התור - חסרים פרטי מטופל" })
      return
    }

    setIsLoading(true)
    try {
      const result = await dispatch(deleteAppointment({ appointmentId, patientId: userId }))

      if (deleteAppointment.fulfilled.match(result)) {
        setMessage({ type: "success", text: "התור בוטל בהצלחה!" })
        // Reload appointment data
        await loadAppointmentData()
      } else {
        setMessage({ type: "error", text: "שגיאה בביטול התור. נסה שוב." })
      }
    } catch (error) {
      console.error("Error canceling appointment:", error)
      setMessage({ type: "error", text: "שגיאה בביטול התור. נסה שוב." })
    } finally {
      setIsLoading(false)
      setShowModal(false)
      setSelectedAppointment(null)
    }
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  const weekDates = getWeekDates()
  const appointmentGrid = createAppointmentGrid()

  return (
    <div className="weekly-calendar">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">טוען...</div>
        </div>
      )}

      {/* Message Display */}
      {message.type && (
        <div className={`message ${message.type === "success" ? "success-message" : "error-message"}`}>
          {message.text}
          <button className="message-close" onClick={() => setMessage({ type: null, text: "" })}>
            ×
          </button>
        </div>
      )}

      <div className="calendar-header">
        <h3 className="calendar-title">
          שבוע {weekDates[0].toLocaleDateString("he-IL")} - {weekDates[6].toLocaleDateString("he-IL")}
        </h3>
        <div className="calendar-navigation">
          <button className="nav-button" onClick={() => navigateWeek("prev")} disabled={isLoading}>
            שבוע קודם
          </button>
          <button className="nav-button" onClick={() => navigateWeek("next")} disabled={isLoading}>
            שבוע הבא
          </button>
          <button className="nav-button refresh-button" onClick={loadAppointmentData} disabled={isLoading}>
            רענן
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-grid">
          {/* Header row */}
          <div className="time-header">שעה</div>
          {daysOfWeek.map((day, index) => (
            <div key={day} className="day-header">
              <div className="day-name">{day}</div>
              <div className="day-date">
                {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
              </div>
            </div>
          ))}

          {/* Time slots and appointments */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeSlot.time}>
              <div className="time-slot-label">{timeSlot.time}</div>
              {weekDates.map((date, dayIndex) => {
                const appointmentSlot = appointmentGrid[timeIndex][dayIndex]

                if (appointmentSlot && appointmentSlot.isStart) {
                  // This is the start of an appointment
                  const { appointment, isAvailable, duration } = appointmentSlot
                  const className = isAvailable ? "appointment-available" : "appointment-booked"

                  return (
                    <div
                      key={`${dayIndex}-${timeSlot.time}`}
                      className={`calendar-cell ${className}`}
                      style={{
                        gridRow: `span ${duration}`,
                        zIndex: 10,
                      }}
                      onClick={() => handleAppointmentClick(appointment, isAvailable)}
                    >
                      <div className="appointment-content">
                        <div className="appointment-time">{timeSlot.time}</div>
                        <div className="appointment-duration">{appointment.durationMinutes} דק'</div>
                        <div className="appointment-therapist">{appointment.therapistName}</div>
                        {!isAvailable && "patient" in appointment && appointment.patient && (
                          <div className="appointment-patient">
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                } else if (appointmentSlot && !appointmentSlot.isStart) {
                  // This is a continuation of an appointment - render empty but don't show
                  return null
                } else {
                  // Empty slot
                  return <div key={`${dayIndex}-${timeSlot.time}`} className="calendar-cell empty-slot"></div>
                }
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="calendar-controls">
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color legend-available"></div>
            <span>זמין</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-booked"></div>
            <span>תפוס</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-empty"></div>
            <span>לא זמין</span>
          </div>
        </div>
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBook={handleBookAppointment}
        onCancel={handleCancelAppointment}
        isAvailable={isAvailableAppointment}
      />
    </div>
  )
}

export default WeeklyCalendar
