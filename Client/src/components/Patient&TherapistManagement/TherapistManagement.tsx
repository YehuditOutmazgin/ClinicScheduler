// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { useSelector, useDispatch } from "react-redux"
// // import type { RootState, AppDispatch } from "../../redux/store"
// // import { fetchTherapistByIdThunk, updateTherapistThunk, deleteTherapistThunk, fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
// // import { fetchWorkHours, addWorkHours, removeWorkHours } from "../../redux/slices/workHourSlice"
// // import type { Therapist, WorkHour } from "../../types"
// // import { getSpecializationName } from "../../types"
// // import "../../styles/TherapistManagement.css"

// // interface WorkHourModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   onSave: (workHour: Omit<WorkHour, "id">) => void
// //   workHour?: WorkHour
// //   therapistId: number
// // }

// // const WorkHourModal: React.FC<WorkHourModalProps> = ({ isOpen, onClose, onSave, workHour, therapistId }) => {
// //   const [formData, setFormData] = useState({
// //     dayOfWeek: "",
// //     startTime: "",
// //     endTime: "",
// //   })

// //   useEffect(() => {
// //     if (workHour) {
// //       setFormData({
// //         dayOfWeek: workHour.dayOfWeek,
// //         startTime: workHour.startTime,
// //         endTime: workHour.endTime,
// //       })
// //     } else {
// //       setFormData({
// //         dayOfWeek: "",
// //         startTime: "",
// //         endTime: "",
// //       })
// //     }
// //   }, [workHour, isOpen])

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     onSave({
// //       therapistId,
// //       dayOfWeek: formData.dayOfWeek,
// //       startTime: formData.startTime,
// //       endTime: formData.endTime,
// //     })
// //     onClose()
// //   }

// //   if (!isOpen) return null

// //   const daysOfWeek = [
// //     { value: "Sunday", label: "ראשון" },
// //     { value: "Monday", label: "שני" },
// //     { value: "Tuesday", label: "שלישי" },
// //     { value: "Wednesday", label: "רביעי" },
// //     { value: "Thursday", label: "חמישי" },
// //     { value: "Friday", label: "שישי" },
// //     { value: "Saturday", label: "שבת" },
// //   ]

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div className="work-hour-modal" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-header">
// //           <h3 className="modal-title">{workHour ? "עריכת שעות עבודה" : "הוספת שעות עבודה"}</h3>
// //           <button className="modal-close" onClick={onClose}>
// //             ×
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="modal-form">
// //           <div className="form-group">
// //             <label className="form-label">יום בשבוע</label>
// //             <select
// //               value={formData.dayOfWeek}
// //               onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
// //               className="form-input"
// //               required
// //             >
// //               <option value="">בחר יום</option>
// //               {daysOfWeek.map((day) => (
// //                 <option key={day.value} value={day.value}>
// //                   {day.label}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="form-group">
// //             <label className="form-label">שעת התחלה</label>
// //             <input
// //               type="time"
// //               value={formData.startTime}
// //               onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
// //               className="form-input"
// //               required
// //             />
// //           </div>

// //           <div className="form-group">
// //             <label className="form-label">שעת סיום</label>
// //             <input
// //               type="time"
// //               value={formData.endTime}
// //               onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
// //               className="form-input"
// //               required
// //             />
// //           </div>

// //           <div className="modal-actions">
// //             <button type="button" className="btn btn-secondary" onClick={onClose}>
// //               ביטול
// //             </button>
// //             <button type="submit" className="btn btn-primary">
// //               {workHour ? "עדכן" : "הוסף"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // const TherapistManagement: React.FC = () => {
// //   const { therapistId } = useParams<{ therapistId: string }>()
// //   const navigate = useNavigate()
// //   const dispatch = useDispatch<AppDispatch>()

// //   const [isEditing, setIsEditing] = useState(false)
// //   const [editedTherapist, setEditedTherapist] = useState<Therapist | null>(null)
// //   const [showWorkHourModal, setShowWorkHourModal] = useState(false)
// //   const [editingWorkHour, setEditingWorkHour] = useState<WorkHour | undefined>()

// //   const { therapists, loading: therapistLoading } = useSelector((state: RootState) => state.therapists)
// //   const { workHours, loading: workHourLoading } = useSelector((state: RootState) => state.workHours)

// //   const therapist = therapists.find((t) => t.therapistId === Number.parseInt(therapistId || "0"))

// //   useEffect(() => {
// //     if (therapistId) {
// //       const id = Number.parseInt(therapistId)
// //       dispatch(fetchAllTherapistsThunk())
// //       dispatch(fetchTherapistByIdThunk(id))
// //       dispatch(fetchWorkHours(id))
// //     }
// //   }, [dispatch, therapistId])

// //   useEffect(() => {
// //     if (therapist) {
// //       setEditedTherapist(therapist)
// //     }
// //   }, [therapist])

// //   const handleSaveTherapist = async () => {
// //     if (editedTherapist) {
// //       await dispatch(updateTherapistThunk(editedTherapist))
// //       const id = Number.parseInt(therapistId?? "")
// //       dispatch(fetchAllTherapistsThunk())
// //       dispatch(fetchTherapistByIdThunk(id))
// //       dispatch(fetchWorkHours(id))
// //       setIsEditing(false)
// //     }
// //   }

// //   const handleDeleteTherapist = async () => {
// //     if (therapistId && window.confirm("האם אתה בטוח שברצונך למחוק את המטפל?")) {
// //       await dispatch(deleteTherapistThunk(Number.parseInt(therapistId)))
// //       navigate("/therapists")
// //     }
// //   }

// //   const handleAddWorkHour = () => {
// //     setEditingWorkHour(undefined)
// //     setShowWorkHourModal(true)
// //   }

// //   const handleEditWorkHour = (workHour: WorkHour) => {
// //     setEditingWorkHour(workHour)
// //     setShowWorkHourModal(true)
// //   }

// //   const handleDeleteWorkHour = async (workHourId: WorkHour) => {
// //     if (window.confirm("האם אתה בטוח שברצונך למחוק את שעות העבודה?")) {
// //       await dispatch(removeWorkHours({ therapistId: Number.parseInt(therapistId!), workHourId }))
// //     }
// //   }

// //   const handleSaveWorkHour = async (workHourData: Omit<WorkHour, "id">) => {
// //     if (editingWorkHour) {
// //       // await dispatch(
// //       //   // updateWorkHours({
// //       //   //   therapistId: Number.parseInt(therapistId!),
// //       //   //   workHour: { ...workHourData, id: editingWorkHour.id },
// //       //   // }),
// //       // )
// //     } else {
// //       await dispatch(addWorkHours({ therapistId: Number.parseInt(therapistId!), workHour: workHourData as WorkHour }))
// //     }
// //   }

// //   const getDayName = (dayOfWeek: string) => {
// //     const days: Record<string, string> = {
// //       Sunday: "ראשון",
// //       Monday: "שני",
// //       Tuesday: "שלישי",
// //       Wednesday: "רביעי",
// //       Thursday: "חמישי",
// //       Friday: "שישי",
// //       Saturday: "שבת",
// //     }
// //     return days[dayOfWeek] || dayOfWeek
// //   }

// //   if (therapistLoading || workHourLoading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="spinner"></div>
// //       </div>
// //     )
// //   }

// //   if (!therapist) {
// //     return (
// //       <div className="therapist-management">
// //         <div className="error-message">מטפל לא נמצא</div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="therapist-management">
// //       <div className="therapist-header">
// //         <h1 className="page-title">ניהול מטפל</h1>
// //         <div className="therapist-actions">
// //           <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
// //             {isEditing ? "ביטול" : "עריכה"}
// //           </button>
// //           <button className="btn btn-danger" onClick={handleDeleteTherapist}>
// //             מחיקה
// //           </button>
// //         </div>
// //       </div>

// //       <div className="therapist-info-card">
// //         {isEditing ? (
// //           <div className="edit-form">
// //             <div className="form-grid">
// //               <div className="form-group">
// //                 <label className="form-label">שם פרטי</label>
// //                 <input
// //                   type="text"
// //                   className="form-input"
// //                   value={editedTherapist?.firstName || ""}
// //                   onChange={(e) => setEditedTherapist((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">שם משפחה</label>
// //                 <input
// //                   type="text"
// //                   className="form-input"
// //                   value={editedTherapist?.lastName || ""}
// //                   onChange={(e) => setEditedTherapist((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">טלפון</label>
// //                 <input
// //                   type="text"
// //                   className="form-input"
// //                   value={editedTherapist?.phoneNumber || ""}
// //                   onChange={(e) =>
// //                     setEditedTherapist((prev) => (prev ? { ...prev, phoneNumber: e.target.value } : null))
// //                   }
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">משך טיפול (דקות)</label>
// //                 <input
// //                   type="number"
// //                   className="form-input"
// //                   value={editedTherapist?.appointmentDuration || ""}
// //                   onChange={(e) =>
// //                     setEditedTherapist((prev) =>
// //                       prev ? { ...prev, appointmentDuration: Number.parseInt(e.target.value) } : null,
// //                     )
// //                   }
// //                 />
// //               </div>
// //             </div>
// //             <div className="form-actions">
// //               <button className="btn btn-primary" onClick={handleSaveTherapist}>
// //                 שמירה
// //               </button>
// //               <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
// //                 ביטול
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="therapist-info">
// //             <div className="therapist-name">
// //               {therapist.firstName} {therapist.lastName}
// //             </div>
// //             <div className="therapist-details">
// //               <div className="detail-item">
// //                 <span className="detail-label">מספר זהות:</span>
// //                 <span className="detail-value">{therapist.therapistId}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">התמחות:</span>
// //                 <span className="detail-value">{getSpecializationName(therapist.specialization)}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">טלפון:</span>
// //                 <span className="detail-value">{therapist.phoneNumber}</span>
// //               </div>
// //               <div className="detail-item">
// //                 <span className="detail-label">משך טיפול:</span>
// //                 <span className="detail-value">{therapist.appointmentDuration} דקות</span>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className="work-hours-section">
// //         <div className="section-header">
// //           <h2 className="section-title">שעות עבודה</h2>
// //           <button className="btn btn-primary" onClick={handleAddWorkHour}>
// //             הוסף שעות עבודה
// //           </button>
// //         </div>

// //         <div className="work-hours-card">
// //           {workHours.length > 0 ? (
// //             <div className="table-container">
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>יום</th>
// //                     <th>שעת התחלה</th>
// //                     <th>שעת סיום</th>
// //                     <th>פעולות</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {workHours.map((workHour) => (
// //                     <tr key={workHour.id}>
// //                       <td>{getDayName(workHour.dayOfWeek)}</td>
// //                       <td>{workHour.startTime}</td>
// //                       <td>{workHour.endTime}</td>
// //                       <td>
// //                         <div className="action-buttons">
// //                           <button className="btn btn-secondary btn-small" onClick={() => handleEditWorkHour(workHour)}>
// //                             עריכה
// //                           </button>
// //                           <button
// //                             className="btn btn-danger btn-small"
// //                             onClick={() => handleDeleteWorkHour(workHour)}
// //                           >
// //                             מחיקה
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <div className="empty-state">
// //               <div className="empty-icon">⏰</div>
// //               <div className="empty-title">אין שעות עבודה מוגדרות</div>
// //               <div className="empty-subtitle">לחץ על "הוסף שעות עבודה" כדי להוסיף שעות עבודה</div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <WorkHourModal
// //         isOpen={showWorkHourModal}
// //         onClose={() => setShowWorkHourModal(false)}
// //         onSave={handleSaveWorkHour}
// //         workHour={editingWorkHour}
// //         therapistId={Number.parseInt(therapistId!)}
// //       />
// //     </div>
// //   )
// // }

// // export default TherapistManagement
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState, AppDispatch } from "../../redux/store"
// import {
//   fetchAllTherapistsThunk,
//   createTherapistThunk,
//   updateTherapistThunk,
//   deleteTherapistThunk,
// } from "../../redux/slices/therapistSlice"
// import { therapistAPI } from "../../api/therapistAPI"
// import type { Specialization, Therapist, WorkHour } from "../../types"
// import "../../styles/TherapistManagement.css"

// interface MessageState {
//   type: "success" | "error" | null
//   text: string
// }

// interface TherapistFormData {
//   id?:number
//   therapistId?: number
//   firstName: string
//   lastName: string
//   phoneNumber: string
//   specialization: Specialization |null
//   appointmentDuration: number
//   // isActive?: boolean
// }

// interface WorkHourFormData {
//   dayOfWeek: number
//   startTime: string
//   endTime: string
//   therapistId?: number
// }

// const DURATION_OPTIONS = [
//   { value: 15, label: "15 דקות" },
//   { value: 30, label: "30 דקות" },
//   { value: 45, label: "45 דקות" },
//   { value: 60, label: "60 דקות" },
// ]

// const DAYS_OF_WEEK = [
//   { value: 0, label: "ראשון" },
//   { value: 1, label: "שני" },
//   { value: 2, label: "שלישי" },
//   { value: 3, label: "רביעי" },
//   { value: 4, label: "חמישי" },
//   { value: 5, label: "שישי" },
//   { value: 6, label: "שבת" },
// ]

// const TherapistManagement: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const { therapists, loading } = useSelector((state: RootState) => state.therapists)

//   const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [showWorkHourModal, setShowWorkHourModal] = useState(false)
//   const [workHours, setWorkHours] = useState<WorkHour[]>([])
//   const [message, setMessage] = useState<MessageState>({ type: null, text: "" })
//   const [isLoading, setIsLoading] = useState(false)

//   const [therapistForm, setTherapistForm] = useState<TherapistFormData>({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     specialization: null,
//     appointmentDuration: 30,
//     // isActive: true,
//   })

//   const [workHourForm, setWorkHourForm] = useState<WorkHourFormData>({
//     dayOfWeek: 0,
//     startTime: "09:00",
//     endTime: "17:00",
//   })

//   useEffect(() => {
//     dispatch(fetchAllTherapistsThunk())
//   }, [dispatch])

//   // Auto-hide messages after 5 seconds
//   useEffect(() => {
//     if (message.type) {
//       const timer = setTimeout(() => {
//         setMessage({ type: null, text: "" })
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [message])

//   const resetTherapistForm = () => {
//     setTherapistForm({
//       firstName: "",
//       lastName: "",
//       phoneNumber: "",
//       specialization: null,
//       appointmentDuration: 30,
//       // isActive: true,
//     })
//   }

//   const resetWorkHourForm = () => {
//     setWorkHourForm({
//       dayOfWeek: 0,
//       startTime: "09:00",
//       endTime: "17:00",
//     })
//   }

//   const handleAddTherapist = () => {
//     resetTherapistForm()
//     setShowAddModal(true)
//   }

//   const handleEditTherapist = (therapist: Therapist) => {
//     setTherapistForm({
//       therapistId: therapist.therapistId,
//       firstName: therapist.firstName,
//       lastName: therapist.lastName,
//       phoneNumber: therapist.phoneNumber,
//       specialization: therapist.specialization,
//       appointmentDuration: therapist.appointmentDuration,
//       // isActive: therapist.isActive ?? true,
//     })
//     setSelectedTherapist(therapist)
//     setShowEditModal(true)
//   }

//   const handleViewWorkHours = async (therapist: Therapist) => {
//     setSelectedTherapist(therapist)
//     setIsLoading(true)
//     try {
//       const hours = await therapistAPI.getWorkHours(therapist.therapistId)
//       setWorkHours(hours)
//       setShowWorkHourModal(true)
//     } catch (error) {
//       setMessage({ type: "error", text: "שגיאה בטעינת שעות עבודה" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSubmitTherapist = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const therapistData: Therapist = {
//         ...therapistForm,
//         therapistId: therapistForm.therapistId || 0,
//         id:therapistForm.id ||0 ,
//         // isActive: therapistForm.isActive ?? true,
//       }

//       if (therapistForm.therapistId) {
//         const result = await dispatch(updateTherapistThunk(therapistData))
//         if (updateTherapistThunk.fulfilled.match(result)) {
//           setMessage({ type: "success", text: "המטפל עודכן בהצלחה!" })
//           setShowEditModal(false)
//           resetTherapistForm()
//         } else {
//           setMessage({ type: "error", text: "שגיאה בעדכון המטפל" })
//         }
//       } else {
//         const result = await dispatch(createTherapistThunk(therapistData))
//         if (createTherapistThunk.fulfilled.match(result)) {
//           setMessage({ type: "success", text: "המטפל נוסף בהצלחה!" })
//           setShowAddModal(false)
//           resetTherapistForm()
//         } else {
//           setMessage({ type: "error", text: "שגיאה בהוספת המטפל" })
//         }
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: "שגיאה בשמירת המטפל" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDeleteTherapist = async (therapistId: number) => {
//     if (!window.confirm("האם אתה בטוח שברצונך למחוק את המטפל?")) {
//       return
//     }

//     setIsLoading(true)
//     try {
//       const result = await dispatch(deleteTherapistThunk(therapistId))
//       if (deleteTherapistThunk.fulfilled.match(result)) {
//         setMessage({ type: "success", text: "המטפל נמחק בהצלחה!" })
//       } else {
//         setMessage({ type: "error", text: "שגיאה במחיקת המטפל" })
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: "שגיאה במחיקת המטפל" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAddWorkHour = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedTherapist) return

//     setIsLoading(true)
//     try {
//       const workHourData: WorkHour = {
//         ...workHourForm,
//         therapistId: selectedTherapist.therapistId,
//         id: 0,
//       }
//       const newWorkHour = await therapistAPI.addWorkHours(selectedTherapist.therapistId, workHourData)
//       setWorkHours([...workHours, newWorkHour])
//       setMessage({ type: "success", text: "שעות עבודה נוספו בהצלחה!" })
//       resetWorkHourForm()
//     } catch (error) {
//       setMessage({ type: "error", text: "שגיאה בהוספת שעות עבודה" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleRemoveWorkHour = async (workHour: WorkHour) => {
//     if (!selectedTherapist) return

//     setIsLoading(true)
//     try {
//       await therapistAPI.removeWorkHours(selectedTherapist.therapistId, workHour)
//       setWorkHours(workHours.filter((wh) => wh.dayOfWeek !== workHour.dayOfWeek || wh.startTime !== workHour.startTime))
//       setMessage({ type: "success", text: "שעות עבודה הוסרו בהצלחה!" })
//     } catch (error) {
//       setMessage({ type: "error", text: "שגיאה בהסרת שעות עבודה" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const closeModals = () => {
//     setShowAddModal(false)
//     setShowEditModal(false)
//     setShowWorkHourModal(false)
//     resetTherapistForm()
//     resetWorkHourForm()
//     setSelectedTherapist(null)
//   }

//   const getDayName = (dayOfWeek: number) => {
//     return DAYS_OF_WEEK.find((day) => day.value === dayOfWeek)?.label || ""
//   }

//   return (
//     <div className="therapist-management">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="loading-overlay">
//           <div className="loading-spinner">טוען...</div>
//         </div>
//       )}

//       {/* Message Display */}
//       {message.type && (
//         <div className={`message ${message.type === "success" ? "success-message" : "error-message"}`}>
//           {message.text}
//           <button className="message-close" onClick={() => setMessage({ type: null, text: "" })}>
//             ×
//           </button>
//         </div>
//       )}

//       <div className="therapist-header">
//         <h1>ניהול מטפלים</h1>
//         <div className="therapist-actions">
//           <button className="btn btn-primary" onClick={handleAddTherapist}>
//             הוסף מטפל חדש
//           </button>
//         </div>
//       </div>

//       <div className="therapists-grid">
//         {therapists.map((therapist) => (
//           <div key={therapist.therapistId} className="therapist-card">
//             <div className="therapist-info">
//               <h3 className="therapist-name">
//                 {therapist.firstName} {therapist.lastName}
//               </h3>
//               <div className="therapist-details">
//                 <div className="detail-item">
//                   <span className="detail-label">טלפון:</span>
//                   <span className="detail-value">{therapist.phoneNumber}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">התמחות:</span>
//                   <span className="detail-value">{therapist.specialization}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="detail-label">משך טיפול:</span>
//                   <span className="detail-value">{therapist.appointmentDuration} דקות</span>
//                 </div>
//                 {/* <div className="detail-item">
//                   <span className="detail-label">סטטוס:</span>
//                   <span className={`status ${therapist.isActive ? "active" : "inactive"}`}>
//                     {therapist.isActive ? "פעיל" : "לא פעיל"}
//                   </span> 
//                 </div>*/}
//               </div>
//             </div>
//             <div className="action-buttons">
//               <button className="btn btn-secondary" onClick={() => handleEditTherapist(therapist)}>
//                 ערוך
//               </button>
//               <button className="btn btn-info" onClick={() => handleViewWorkHours(therapist)}>
//                 שעות עבודה
//               </button>
//               <button className="btn btn-danger" onClick={() => handleDeleteTherapist(therapist.therapistId)}>
//                 מחק
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add/Edit Therapist Modal */}
//       {(showAddModal || showEditModal) && (
//         <div className="modal-overlay" onClick={closeModals}>
//           <div className="therapist-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="modal-title">{showAddModal ? "הוסף מטפל חדש" : "ערוך מטפל"}</h3>
//               <button className="modal-close" onClick={closeModals}>
//                 ×
//               </button>
//             </div>
//             <form className="modal-form" onSubmit={handleSubmitTherapist}>
//               <div className="form-group">
//                 <label className="form-label">שם פרטי:</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={therapistForm.firstName}
//                   onChange={(e) => setTherapistForm({ ...therapistForm, firstName: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">שם משפחה:</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={therapistForm.lastName}
//                   onChange={(e) => setTherapistForm({ ...therapistForm, lastName: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">טלפון:</label>
//                 <input
//                   type="tel"
//                   className="form-input"
//                   value={therapistForm.phoneNumber}
//                   onChange={(e) => setTherapistForm({ ...therapistForm, phoneNumber: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">התמחות:</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={therapistForm.specialization}
//                   onChange={(e) => setTherapistForm({ ...therapistForm, specialization: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">משך טיפול:</label>
//                 <select
//                   className="form-select"
//                   value={therapistForm.appointmentDuration}
//                   onChange={(e) => setTherapistForm({ ...therapistForm, appointmentDuration: Number(e.target.value) })}
//                   required
//                 >
//                   {DURATION_OPTIONS.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label className="form-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={therapistForm.isActive}
//                     onChange={(e) => setTherapistForm({ ...therapistForm, isActive: e.target.checked })}
//                   />
//                   <span className="checkbox-label">פעיל</span>
//                 </label>
//               </div>
//               <div className="modal-actions">
//                 <button type="button" className="btn btn-secondary" onClick={closeModals}>
//                   ביטול
//                 </button>
//                 <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                   {showAddModal ? "הוסף" : "עדכן"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Work Hours Modal */}
//       {showWorkHourModal && selectedTherapist && (
//         <div className="modal-overlay" onClick={closeModals}>
//           <div className="work-hour-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3 className="modal-title">
//                 שעות עבודה - {selectedTherapist.firstName} {selectedTherapist.lastName}
//               </h3>
//               <button className="modal-close" onClick={closeModals}>
//                 ×
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="work-hours-list">
//                 <h4>שעות עבודה קיימות:</h4>
//                 {workHours.length === 0 ? (
//                   <p className="no-work-hours">אין שעות עבודה מוגדרות</p>
//                 ) : (
//                   workHours.map((workHour, index) => (
//                     <div key={index} className="work-hour-item">
//                       <span>
//                         {getDayName(Number(workHour.dayOfWeek))}: {workHour.startTime} - {workHour.endTime}
//                       </span>
//                       <button className="btn btn-danger btn-small" onClick={() => handleRemoveWorkHour(workHour)}>
//                         הסר
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//               <form className="work-hour-form" onSubmit={handleAddWorkHour}>
//                 <h4>הוסף שעות עבודה:</h4>
//                 <div className="form-group">
//                   <label className="form-label">יום:</label>
//                   <select
//                     className="form-select"
//                     value={workHourForm.dayOfWeek}
//                     onChange={(e) => setWorkHourForm({ ...workHourForm, dayOfWeek: Number(e.target.value) })}
//                     required
//                   >
//                     {DAYS_OF_WEEK.map((day) => (
//                       <option key={day.value} value={day.value}>
//                         {day.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label className="form-label">שעת התחלה:</label>
//                     <input
//                       type="time"
//                       className="form-input"
//                       value={workHourForm.startTime}
//                       onChange={(e) => setWorkHourForm({ ...workHourForm, startTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">שעת סיום:</label>
//                     <input
//                       type="time"
//                       className="form-input"
//                       value={workHourForm.endTime}
//                       onChange={(e) => setWorkHourForm({ ...workHourForm, endTime: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                   הוסף שעות עבודה
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default TherapistManagement
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  fetchAllTherapistsThunk,
  createTherapistThunk,
  updateTherapistThunk,
  deleteTherapistThunk,
} from "../../redux/slices/therapistSlice"
import { therapistAPI } from "../../api/therapistAPI"
import type { Therapist, WorkHour, Specialization } from "../../types"
import "../../styles/TherapistManagement.css"

interface MessageState {
  type: "success" | "error" | null
  text: string
}

interface TherapistFormData {
  therapistId?: number
  firstName: string
  lastName: string
  phoneNumber: string
  specialization: Specialization
  appointmentDuration: number
}

interface WorkHourFormData {
  dayOfWeek: string
  startTime: string
  endTime: string
  therapistId?: number
}

const DURATION_OPTIONS = [
  { value: 15, label: "15 דקות" },
  { value: 30, label: "30 דקות" },
  { value: 45, label: "45 דקות" },
  { value: 60, label: "60 דקות" },
]

const SPECIALIZATION_OPTIONS: { value: Specialization; label: string }[] = [
  { value: "SpeechTherapy", label: "טיפול בדיבור" },
  { value: "OccupationalTherapy", label: "ריפוי בעיסוק" },
  { value: "PhysicalTherapy", label: "פיזיותרפיה" },
  { value: "Psychology", label: "פסיכולוגיה" },
  { value: "SocialWork", label: "עבודה סוציאלית" },
  { value: "BehavioralTherapy", label: "טיפול התנהגותי" },
  { value: "EducationalTherapy", label: "טיפול חינוכי" },
]

const DAYS_OF_WEEK = [
  { value: "Sunday", label: "ראשון" },
  { value: "Monday", label: "שני" },
  { value: "Tuesday", label: "שלישי" },
  { value: "Wednesday", label: "רביעי" },
  { value: "Thursday", label: "חמישי" },
  { value: "Friday", label: "שישי" },
  { value: "Saturday", label: "שבת" },
]

const TherapistManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { therapists, loading } = useSelector((state: RootState) => state.therapists)

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showWorkHourModal, setShowWorkHourModal] = useState(false)
  const [workHours, setWorkHours] = useState<WorkHour[]>([])
  const [message, setMessage] = useState<MessageState>({ type: null, text: "" })
  const [isLoading, setIsLoading] = useState(false)

  const [therapistForm, setTherapistForm] = useState<TherapistFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    specialization: "SpeechTherapy",
    appointmentDuration: 30,
  })

  const [workHourForm, setWorkHourForm] = useState<WorkHourFormData>({
    dayOfWeek: "Sunday",
    startTime: "09:00",
    endTime: "17:00",
  })

  useEffect(() => {
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

  const resetTherapistForm = () => {
    setTherapistForm({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      specialization: "SpeechTherapy",
      appointmentDuration: 30,
    })
  }

  const resetWorkHourForm = () => {
    setWorkHourForm({
      dayOfWeek: "Sunday",
      startTime: "09:00",
      endTime: "17:00",
    })
  }

  const handleAddTherapist = () => {
    resetTherapistForm()
    setShowAddModal(true)
  }

  const handleEditTherapist = (therapist: Therapist) => {
    setTherapistForm({
      therapistId: therapist.therapistId,
      firstName: therapist.firstName,
      lastName: therapist.lastName,
      phoneNumber: therapist.phoneNumber,
      specialization: therapist.specialization,
      appointmentDuration: therapist.appointmentDuration,
    })
    setSelectedTherapist(therapist)
    setShowEditModal(true)
  }

  const handleViewWorkHours = async (therapist: Therapist) => {
    setSelectedTherapist(therapist)
    setIsLoading(true)
    try {
      const hours = await therapistAPI.getWorkHours(therapist.therapistId)
      setWorkHours(hours)
      setShowWorkHourModal(true)
    } catch (error) {
      setMessage({ type: "error", text: "שגיאה בטעינת שעות עבודה" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitTherapist = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const therapistData: Therapist = {
        ...therapistForm,
        id: therapistForm.therapistId || 0,
        therapistId: therapistForm.therapistId || 0,
      }

      if (therapistForm.therapistId) {
        const result = await dispatch(updateTherapistThunk(therapistData))
        if (updateTherapistThunk.fulfilled.match(result)) {
          setMessage({ type: "success", text: "המטפל עודכן בהצלחה!" })
          setShowEditModal(false)
          resetTherapistForm()
        } else {
          setMessage({ type: "error", text: "שגיאה בעדכון המטפל" })
        }
      } else {
        const result = await dispatch(createTherapistThunk(therapistData))
        if (createTherapistThunk.fulfilled.match(result)) {
          setMessage({ type: "success", text: "המטפל נוסף בהצלחה!" })
          setShowAddModal(false)
          resetTherapistForm()
        } else {
          setMessage({ type: "error", text: "שגיאה בהוספת המטפל" })
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "שגיאה בשמירת המטפל" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTherapist = async (therapistId: number) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את המטפל?")) {
      return
    }

    setIsLoading(true)
    try {
      const result = await dispatch(deleteTherapistThunk(therapistId))
      if (deleteTherapistThunk.fulfilled.match(result)) {
        setMessage({ type: "success", text: "המטפל נמחק בהצלחה!" })
      } else {
        setMessage({ type: "error", text: "שגיאה במחיקת המטפל" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "שגיאה במחיקת המטפל" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddWorkHour = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTherapist) return

    setIsLoading(true)
    try {
      const workHourData: WorkHour = {
        ...workHourForm,
        therapistId: selectedTherapist.therapistId,
        id: 0,
      }
      const newWorkHour = await therapistAPI.addWorkHours(selectedTherapist.therapistId, workHourData)
      setWorkHours([...workHours, newWorkHour])
      setMessage({ type: "success", text: "שעות עבודה נוספו בהצלחה!" })
      resetWorkHourForm()
    } catch (error) {
      setMessage({ type: "error", text: "שגיאה בהוספת שעות עבודה" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveWorkHour = async (workHour: WorkHour) => {
    if (!selectedTherapist) return

    setIsLoading(true)
    try {
      await therapistAPI.removeWorkHours(selectedTherapist.therapistId, workHour)
      setWorkHours(workHours.filter((wh) => wh.dayOfWeek !== workHour.dayOfWeek || wh.startTime !== workHour.startTime))
      setMessage({ type: "success", text: "שעות עבודה הוסרו בהצלחה!" })
    } catch (error) {
      setMessage({ type: "error", text: "שגיאה בהסרת שעות עבודה" })
    } finally {
      setIsLoading(false)
    }
  }

  const closeModals = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowWorkHourModal(false)
    resetTherapistForm()
    resetWorkHourForm()
    setSelectedTherapist(null)
  }

  const getDayName = (dayOfWeek: string) => {
    return DAYS_OF_WEEK.find((day) => day.value === dayOfWeek)?.label || dayOfWeek
  }

  const getSpecializationName = (specialization: Specialization) => {
    return SPECIALIZATION_OPTIONS.find((spec) => spec.value === specialization)?.label || specialization
  }

  return (
    <div className="therapist-management">
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

      <div className="therapist-header">
        <h1>ניהול מטפלים</h1>
        <div className="therapist-actions">
          <button className="btn btn-primary" onClick={handleAddTherapist}>
            הוסף מטפל חדש
          </button>
        </div>
      </div>

      {/* Therapists Table */}
      <div className="therapists-table-container">
        <table className="therapists-table">
          <thead>
            <tr>
              <th>שם מלא</th>
              <th>טלפון</th>
              <th>התמחות</th>
              <th>משך טיפול</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <tr key={therapist.therapistId}>
                <td className="therapist-name-cell">
                  {therapist.firstName} {therapist.lastName}
                </td>
                <td>{therapist.phoneNumber}</td>
                <td>{getSpecializationName(therapist.specialization)}</td>
                <td>{therapist.appointmentDuration} דקות</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-secondary btn-small" onClick={() => handleEditTherapist(therapist)}>
                      ערוך
                    </button>
                    <button className="btn btn-info btn-small" onClick={() => handleViewWorkHours(therapist)}>
                      שעות עבודה
                    </button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDeleteTherapist(therapist.therapistId)}
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {therapists.length === 0 && (
          <div className="no-therapists">
            <p>אין מטפלים במערכת</p>
          </div>
        )}
      </div>

      {/* Add/Edit Therapist Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="therapist-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{showAddModal ? "הוסף מטפל חדש" : "ערוך מטפל"}</h3>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmitTherapist}>
              <div className="form-group">
                <label className="form-label">שם פרטי:</label>
                <input
                  type="text"
                  className="form-input"
                  value={therapistForm.firstName}
                  onChange={(e) => setTherapistForm({ ...therapistForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">שם משפחה:</label>
                <input
                  type="text"
                  className="form-input"
                  value={therapistForm.lastName}
                  onChange={(e) => setTherapistForm({ ...therapistForm, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">טלפון:</label>
                <input
                  type="tel"
                  className="form-input"
                  value={therapistForm.phoneNumber}
                  onChange={(e) => setTherapistForm({ ...therapistForm, phoneNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">התמחות:</label>
                <select
                  className="form-select"
                  value={therapistForm.specialization}
                  onChange={(e) =>
                    setTherapistForm({ ...therapistForm, specialization: e.target.value as Specialization })
                  }
                  required
                >
                  {SPECIALIZATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">משך טיפול:</label>
                <select
                  className="form-select"
                  value={therapistForm.appointmentDuration}
                  onChange={(e) => setTherapistForm({ ...therapistForm, appointmentDuration: Number(e.target.value) })}
                  required
                >
                  {DURATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModals}>
                  ביטול
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {showAddModal ? "הוסף" : "עדכן"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Work Hours Modal */}
      {showWorkHourModal && selectedTherapist && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="work-hour-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                שעות עבודה - {selectedTherapist.firstName} {selectedTherapist.lastName}
              </h3>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="work-hours-list">
                <h4>שעות עבודה קיימות:</h4>
                {workHours.length === 0 ? (
                  <p className="no-work-hours">אין שעות עבודה מוגדרות</p>
                ) : (
                  workHours.map((workHour, index) => (
                    <div key={index} className="work-hour-item">
                      <span>
                        {getDayName(workHour.dayOfWeek)}: {workHour.startTime} - {workHour.endTime}
                      </span>
                      <button className="btn btn-danger btn-small" onClick={() => handleRemoveWorkHour(workHour)}>
                        הסר
                      </button>
                    </div>
                  ))
                )}
              </div>
              <form className="work-hour-form" onSubmit={handleAddWorkHour}>
                <h4>הוסף שעות עבודה:</h4>
                <div className="form-group">
                  <label className="form-label">יום:</label>
                  <select
                    className="form-select"
                    value={workHourForm.dayOfWeek}
                    onChange={(e) => setWorkHourForm({ ...workHourForm, dayOfWeek: e.target.value })}
                    required
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">שעת התחלה:</label>
                    <input
                      type="time"
                      className="form-input"
                      value={workHourForm.startTime}
                      onChange={(e) => setWorkHourForm({ ...workHourForm, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">שעת סיום:</label>
                    <input
                      type="time"
                      className="form-input"
                      value={workHourForm.endTime}
                      onChange={(e) => setWorkHourForm({ ...workHourForm, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  הוסף שעות עבודה
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TherapistManagement
