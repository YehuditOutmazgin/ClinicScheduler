// "use client"

// import type React from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { useEffect, useState } from "react"
// import type { RootState, AppDispatch } from "../../redux/store"
// import {
//   confirmAppointment,
//   confirmCanceledAppointments,
//   deleteAppointment,
//   fetchCanceledAppointments,
//   fetchNextBusinessDayAppointments,
// } from "../../redux/slices/appointmentSlice"
// import type { Appointment, CanceledAppointment } from "../../types"

// const cardStyle: React.CSSProperties = {
//   background: "#f6f8fc",
//   borderRadius: "0.5rem",
//   boxShadow: "0 1px 4px #ececec",
//   padding: "1rem",
//   marginBottom: "1rem",
//   width: "100%",
//   textAlign: "right",
//   direction: "rtl",
// }

// const listBoxStyle: React.CSSProperties = {
//   background: "#fff",
//   borderRadius: "1rem",
//   boxShadow: "0 2px 8px #e0e0e0",
//   padding: "1.5rem",
//   minWidth: 320,
//   flex: 1,
//   margin: "0 1rem",
//   fontFamily: "inherit",
//   fontSize: "1.1rem",
//   color: "#6c63b5",
//   direction: "rtl",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// }

// const buttonStyle: React.CSSProperties = {
//   background: "#6c63b5",
//   color: "#fff",
//   border: "none",
//   borderRadius: 6,
//   padding: "0.5rem 1.2rem",
//   cursor: "pointer",
//   fontSize: "0.9rem",
//   fontWeight: "600",
//   margin: "0 0.25rem",
// }

// const outlineButtonStyle: React.CSSProperties = {
//   background: "#fff",
//   color: "#6c63b5",
//   border: "1px solid #6c63b5",
//   borderRadius: 6,
//   padding: "0.5rem 1.2rem",
//   cursor: "pointer",
//   fontSize: "0.9rem",
//   fontWeight: "600",
//   margin: "0 0.25rem",
// }

// const ManageReminders: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const {
//     canceledAppointments,
//     appointments: nextBusinessDayAppointments,
//     loading,
//   } = useSelector((state: RootState) => state.appointments)

//   // State מקומי לניהול התורים שהוסרו בהצלחה
//   const [removedAppointmentIds, setRemovedAppointmentIds] = useState<number[]>([])
//   // State לניהול תורים שבתהליך עיבוד
//   const [processingIds, setProcessingIds] = useState<number[]>([])

//   // טעינת הנתונים בעת טעינת הקומפוננטה
//   useEffect(() => {
//     dispatch(fetchCanceledAppointments())
//     dispatch(fetchNextBusinessDayAppointments())
//   }, [dispatch])

//   const handleConfirmCancellation = async (appointmentId: number, patientId: number) => {
//     console.log("=== handleConfirmCancellation START ===")
//     console.log("Parameters:", { appointmentId, patientId })

//     if (!patientId || patientId === 0) {
//       console.error("Invalid patientId:", patientId)
//       alert("שגיאה: מזהה מטופל לא תקין")
//       return
//     }

//     // הוספה לרשימת העיבוד
//     setProcessingIds((prev) => [...prev, appointmentId])

//     try {
//       console.log("Dispatching confirmCanceledAppointments...")
//       const result = await dispatch(confirmCanceledAppointments({ appointmentId, patientId }))
//       console.log("Dispatch result:", result)

//       // בדיקה פשוטה - אם הצליח
//       if (confirmCanceledAppointments.fulfilled.match(result)) {
//         setRemovedAppointmentIds((prev) => [...prev, appointmentId])
//         console.log("✅ אישור ביטול הצליח עבור תור:", appointmentId)
//       } else if (confirmCanceledAppointments.rejected.match(result)) {
//         console.error("❌ אישור ביטול נכשל:", result.payload)
//         alert(`שגיאה באישור ביטול התור: ${result.payload || "שגיאה לא ידועה"}`)
//       }
//     } catch (error) {
//       console.error("❌ Exception באישור ביטול:", error)
//       alert("שגיאה באישור ביטול התור. אנא בדוק את החיבור לשרת ונסה שוב.")
//     } finally {
//       setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
//     }
//   }

//   const handleConfirmArrival = async (appointmentId: number) => {
//     // הוספה לרשימת העיבוד
//     setProcessingIds((prev) => [...prev, appointmentId])

//     try {
//       const result = await dispatch(confirmAppointment(appointmentId))

//       // בדיקה אם הפעולה הצליחה
//       if (confirmAppointment.fulfilled.match(result)) {
//         // הסרה מקומית מהרשימה רק אם הפעולה הצליחה
//         setRemovedAppointmentIds((prev) => [...prev, appointmentId])
//         console.log("אישור הגעה הצליח עבור תור:", appointmentId)
//       } else {
//         // הפעולה נכשלה
//         console.error("אישור הגעה נכשל:", result.payload)
//         alert("שגיאה באישור הגעה. אנא נסה שוב.")
//       }
//     } catch (error) {
//       console.error("שגיאה באישור הגעה:", error)
//       alert("שגיאה באישור הגעה. אנא בדוק את החיבור לשרת ונסה שוב.")
//     } finally {
//       // הסרה מרשימת העיבוד
//       setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
//     }
//   }

//   const handleCancelTomorrowAppointment = async (appointmentId: number, patientId: number) => {
//     console.log("handleCancelTomorrowAppointment called with:", { appointmentId, patientId })

//     if (!patientId || patientId === 0) {
//       console.error("Invalid patientId:", patientId)
//       alert("שגיאה: מזהה מטופל לא תקין")
//       return
//     }
//     if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
//       // הוספה לרשימת העיבוד
//       setProcessingIds((prev) => [...prev, appointmentId])

//       try {
//         const result = await dispatch(deleteAppointment({ appointmentId, patientId }))

//         // בדיקה אם הפעולה הצליחה
//         if (deleteAppointment.fulfilled.match(result)) {
//           // הסרה מקומית מהרשימה רק אם הפעולה הצליחה
//           setRemovedAppointmentIds((prev) => [...prev, appointmentId])
//           console.log("ביטול תור הצליח עבור תור:", appointmentId)
//         } else {
//           // הפעולה נכשלה
//           console.error("ביטול תור נכשל:", result.payload)
//           alert("שגיאה בביטול התור. אנא נסה שוב.")
//         }
//       } catch (error) {
//         console.error("שגיאה בביטול תור:", error)
//         alert("שגיאה בביטול התור. אנא בדוק את החיבור לשרת ונסה שוב.")
//       } finally {
//         // הסרה מרשימת העיבוד
//         setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
//       }
//     }
//   }

//   const getPatientName = (appointment: Appointment | CanceledAppointment) => {
//     if ("patient" in appointment && appointment.patient) {
//       return `${appointment.patient.firstName} ${appointment.patient.lastName}`
//     }
//     return (appointment.patient?.firstName && appointment.patient.lastName) || "לא ידוע"
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("he-IL")
//   }

//   // סינון התורים שלא הוסרו
//   const filteredCanceledAppointments =
//     canceledAppointments?.filter((appointment) => !removedAppointmentIds.includes(appointment.appointmentId)) || []

//   const filteredNextBusinessDayAppointments =
//     nextBusinessDayAppointments?.filter((appointment) => !removedAppointmentIds.includes(appointment.appointmentId)) ||
//     []

//   const AppointmentCard: React.FC<{
//     appointment?: Appointment
//     canceledAppointment?: CanceledAppointment
//     showCancelActions?: boolean
//     showTomorrowActions?: boolean
//   }> = ({ appointment, canceledAppointment, showCancelActions, showTomorrowActions }) => {
//     const currentAppointment = appointment || canceledAppointment

//     if (!currentAppointment) return null

//     const isProcessing = processingIds.includes(currentAppointment.appointmentId)

//     return (
//       <div style={cardStyle}>
//         {/* תאריך ושעה */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "1rem",
//             fontSize: "1.1rem",
//             fontWeight: "bold",
//             color: "#6c63b5",
//           }}
//         >
//           <span>{currentAppointment.appointmentDate || "תאריך לא ידוע"}</span>
//         </div>

//         {/* פרטי התור */}
//         <div style={{ marginBottom: "1rem" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "0.5rem",
//               fontSize: "0.95rem",
//             }}
//           >
//             <span style={{ color: "#666" }}>מטפל:</span>
//             <span style={{ fontWeight: "600" }}>{currentAppointment.therapistName || "לא ידוע"}</span>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "0.5rem",
//               fontSize: "0.95rem",
//             }}
//           >
//             <span style={{ color: "#666" }}>המטופל:</span>
//             <span style={{ fontWeight: "600" }}>{getPatientName(currentAppointment)}</span>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "0.5rem",
//               fontSize: "0.95rem",
//             }}
//           >
//             <span style={{ color: "#666" }}>משך:</span>
//             <span style={{ fontWeight: "600" }}>{currentAppointment.durationMinutes || 60} דקות</span>
//           </div>
//         </div>

//         {/* כפתורי פעולה */}
//         {showCancelActions && (
//           <div style={{ marginTop: 12, textAlign: "center" }}>
//             <button
//               style={{
//                 ...buttonStyle,
//                 background: isProcessing ? "#ccc" : "#28a745",
//                 padding: "0.6rem 1.5rem",
//                 cursor: isProcessing ? "not-allowed" : "pointer",
//               }}
//               onClick={() =>
//                 handleConfirmCancellation(
//                   currentAppointment.appointmentId,
//                   ("patient" in currentAppointment && currentAppointment.patient?.patientId) || 0,
//                 )
//               }
//               disabled={isProcessing}
//             >
//               {isProcessing ? "מעבד..." : "✓ אישור ביטול"}
//             </button>
//           </div>
//         )}

//         {showTomorrowActions && (
//           <div
//             style={{
//               marginTop: 12,
//               display: "flex",
//               gap: "0.5rem",
//               justifyContent: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <button
//               style={{
//                 ...buttonStyle,
//                 background: isProcessing ? "#ccc" : "#28a745",
//                 padding: "0.6rem 1.2rem",
//                 cursor: isProcessing ? "not-allowed" : "pointer",
//               }}
//               onClick={() => handleConfirmArrival(currentAppointment.appointmentId)}
//               disabled={isProcessing}
//             >
//               {isProcessing ? "מעבד..." : "✓ אישור הגעה"}
//             </button>
//             <button
//               style={{
//                 ...outlineButtonStyle,
//                 borderColor: "#dc3545",
//                 color: "#dc3545",
//                 padding: "0.6rem 1.2rem",
//                 cursor: isProcessing ? "not-allowed" : "pointer",
//                 opacity: isProcessing ? 0.6 : 1,
//               }}
//               onClick={() =>
//                 handleCancelTomorrowAppointment(
//                   currentAppointment.appointmentId,
//                   ("patient" in currentAppointment && currentAppointment.patient?.patientId) || 0,
//                 )
//               }
//               disabled={isProcessing}
//             >
//               {isProcessing ? "מעבד..." : "✗ ביטול"}
//             </button>
//           </div>
//         )}
//       </div>
//     )
//   }

//   const EmptyState: React.FC<{ message: string }> = ({ message }) => (
//     <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
//       <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
//       <p>{message}</p>
//     </div>
//   )

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "2rem" }}>
//         <div style={{ fontSize: "1.2rem", color: "#6c63b5" }}>טוען נתונים...</div>
//       </div>
//     )
//   }

//   return (
//     <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem", direction: "rtl" }}>
//       <div style={{ marginBottom: "2rem", textAlign: "center" }}>
//         <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#6c63b5", marginBottom: "0.5rem" }}>
//           ניהול תזכורות
//         </h1>
//         <p style={{ color: "#666" }}>ניהול תזכורות תורים שבוטלו תורים למחר</p>
//       </div>

//       <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
//         {/* תורים שבוטלו */}
//         <div style={{ ...listBoxStyle, borderTop: "4px solid #ae3ca6ff" }}>
//           <div style={{ fontWeight: "bold", marginBottom: "1rem", color: "#ae3ca6ff" }}>
//             תורים שבוטלו ({filteredCanceledAppointments.length})
//           </div>
//           <div style={{ maxHeight: "500px", overflowY: "auto", width: "100%" }}>
//             {filteredCanceledAppointments.length > 0 ? (
//               filteredCanceledAppointments.map((canceledAppointment) => (
//                 <AppointmentCard
//                   key={canceledAppointment.appointmentId}
//                   canceledAppointment={canceledAppointment}
//                   showCancelActions={true}
//                 />
//               ))
//             ) : (
//               <EmptyState message="אין תורים מבוטלים" />
//             )}
//           </div>
//         </div>

//         {/* תורים למחר */}
//         <div style={{ ...listBoxStyle, borderTop: "4px solid #ae3ca6ff" }}>
//           <div style={{ fontWeight: "bold", marginBottom: "1rem", color: "#ae3ca6ff" }}>
//             תורים למחר ({filteredNextBusinessDayAppointments.length})
//           </div>
//           <div style={{ maxHeight: "500px", overflowY: "auto", width: "100%" }}>
//             {filteredNextBusinessDayAppointments.length > 0 ? (
//               filteredNextBusinessDayAppointments.map((appointment) => (
//                 <AppointmentCard key={appointment.appointmentId} appointment={appointment} showTomorrowActions={true} />
//               ))
//             ) : (
//               <EmptyState message="אין תורים למחר" />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ManageReminders
"use client"
import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  confirmAppointment,
  confirmCanceledAppointments,
  deleteAppointment,
  fetchCanceledAppointments,
  fetchNextBusinessDayAppointments,
} from "../../redux/slices/appointmentSlice"
import type { Appointment, CanceledAppointment } from "../../types"

const listBoxStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "1rem",
  boxShadow: "0 2px 8px #e0e0e0",
  padding: "1.5rem",
  minWidth: 320,
  flex: 1,
  margin: "0 1rem",
  fontFamily: "inherit",
  fontSize: "1.1rem",
  color: "#6c63b5",
  direction: "rtl",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
  fontSize: "0.9rem",
}

const thStyle: React.CSSProperties = {
  background: "#f8f9fa",
  padding: "12px 8px",
  textAlign: "right",
  borderBottom: "2px solid #dee2e6",
  fontWeight: "600",
  color: "#495057",
}

const tdStyle: React.CSSProperties = {
  padding: "12px 8px",
  borderBottom: "1px solid #dee2e6",
  textAlign: "right",
}

const buttonStyle: React.CSSProperties = {
  background: "#6c63b5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: "600",
  margin: "0 0.2rem",
}

const successButtonStyle: React.CSSProperties = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: "600",
  margin: "0 0.2rem",
}

const dangerButtonStyle: React.CSSProperties = {
  background: "#fff",
  color: "#dc3545",
  border: "1px solid #dc3545",
  borderRadius: 6,
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: "600",
  margin: "0 0.2rem",
}

const ManageReminders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    canceledAppointments,
    appointments: nextBusinessDayAppointments,
    loading,
  } = useSelector((state: RootState) => state.appointments)

  // State מקומי לניהול התורים שהוסרו בהצלחה
  const [removedAppointmentIds, setRemovedAppointmentIds] = useState<number[]>([])
  // State לניהול תורים שבתהליך עיבוד
  const [processingIds, setProcessingIds] = useState<number[]>([])

  // טעינת הנתונים בעת טעינת הקומפוננטה
  useEffect(() => {
    dispatch(fetchCanceledAppointments())
    dispatch(fetchNextBusinessDayAppointments())
  }, [dispatch])

  const handleConfirmCancellation = async (appointmentId: number, patientId: number) => {
    console.log("=== handleConfirmCancellation START ===")
    console.log("Parameters:", { appointmentId, patientId })

    if (!patientId || patientId === 0) {
      console.error("Invalid patientId:", patientId)
      alert("שגיאה: מזהה מטופל לא תקין")
      return
    }

    // הוספה לרשימת העיבוד
    setProcessingIds((prev) => [...prev, appointmentId])

    try {
      console.log("Dispatching confirmCanceledAppointments...")
      const result = await dispatch(confirmCanceledAppointments({ appointmentId, patientId }))
      console.log("Dispatch result:", result)

      // בדיקה פשוטה - אם הצליח
      if (confirmCanceledAppointments.fulfilled.match(result)) {
        setRemovedAppointmentIds((prev) => [...prev, appointmentId])
        console.log("✅ אישור ביטול הצליח עבור תור:", appointmentId)
      } else if (confirmCanceledAppointments.rejected.match(result)) {
        console.error("❌ אישור ביטול נכשל:", result.payload)
        alert(`שגיאה באישור ביטול התור: ${result.payload || "שגיאה לא ידועה"}`)
      }
    } catch (error) {
      console.error("❌ Exception באישור ביטול:", error)
      alert("שגיאה באישור ביטול התור. אנא בדוק את החיבור לשרת ונסה שוב.")
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
    }
  }

  const handleConfirmArrival = async (appointmentId: number) => {
    // הוספה לרשימת העיבוד
    setProcessingIds((prev) => [...prev, appointmentId])

    try {
      const result = await dispatch(confirmAppointment(appointmentId))
      // בדיקה אם הפעולה הצליחה
      if (confirmAppointment.fulfilled.match(result)) {
        // הסרה מקומית מהרשימה רק אם הפעולה הצליחה
        setRemovedAppointmentIds((prev) => [...prev, appointmentId])
        console.log("אישור הגעה הצליח עבור תור:", appointmentId)
      } else {
        // הפעולה נכשלה
        console.error("אישור הגעה נכשל:", result.payload)
        alert("שגיאה באישור הגעה. אנא נסה שוב.")
      }
    } catch (error) {
      console.error("שגיאה באישור הגעה:", error)
      alert("שגיאה באישור הגעה. אנא בדוק את החיבור לשרת ונסה שוב.")
    } finally {
      // הסרה מרשימת העיבוד
      setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
    }
  }

  const handleCancelTomorrowAppointment = async (appointmentId: number, patientId: number) => {
    console.log("handleCancelTomorrowAppointment called with:", { appointmentId, patientId })

    if (!patientId || patientId === 0) {
      console.error("Invalid patientId:", patientId)
      alert("שגיאה: מזהה מטופל לא תקין")
      return
    }

    if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      // הוספה לרשימת העיבוד
      setProcessingIds((prev) => [...prev, appointmentId])

      try {
        const result = await dispatch(deleteAppointment({ appointmentId, patientId }))
        // בדיקה אם הפעולה הצליחה
        if (deleteAppointment.fulfilled.match(result)) {
          // הסרה מקומית מהרשימה רק אם הפעולה הצליחה
          setRemovedAppointmentIds((prev) => [...prev, appointmentId])
          console.log("ביטול תור הצליח עבור תור:", appointmentId)
        } else {
          // הפעולה נכשלה
          console.error("ביטול תור נכשל:", result.payload)
          alert("שגיאה בביטול התור. אנא נסה שוב.")
        }
      } catch (error) {
        console.error("שגיאה בביטול תור:", error)
        alert("שגיאה בביטול התור. אנא בדוק את החיבור לשרת ונסה שוב.")
      } finally {
        // הסרה מרשימת העיבוד
        setProcessingIds((prev) => prev.filter((id) => id !== appointmentId))
      }
    }
  }

  const getPatientName = (appointment: Appointment | CanceledAppointment) => {
    if ("patient" in appointment && appointment.patient) {
      return `${appointment.patient.firstName} ${appointment.patient.lastName}`
    }
    return (appointment.patient?.firstName && appointment.patient.lastName) || "לא ידוע"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // סינון התורים שלא הוסרו
  const filteredCanceledAppointments =
    canceledAppointments?.filter((appointment) => !removedAppointmentIds.includes(appointment.appointmentId)) || []

  const filteredNextBusinessDayAppointments =
    nextBusinessDayAppointments?.filter((appointment) => !removedAppointmentIds.includes(appointment.appointmentId)) ||
    []

  const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
      <p>{message}</p>
    </div>
  )

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#6c63b5" }}>טוען נתונים...</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem", direction: "rtl" }}>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#6c63b5", marginBottom: "0.5rem" }}>
          ניהול תזכורות
        </h1>
        <p style={{ color: "#666" }}>ניהול תזכורות תורים שבוטלו ותורים למחר</p>
      </div>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
        {/* תורים שבוטלו */}
        <div style={{ ...listBoxStyle, borderTop: "4px solid #ae3ca6ff" }}>
          <div style={{ fontWeight: "bold", marginBottom: "1rem", color: "#ae3ca6ff" }}>
            תורים שבוטלו ({filteredCanceledAppointments.length})
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto", width: "100%" }}>
            {filteredCanceledAppointments.length > 0 ? (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>תאריך</th>
                    <th style={thStyle}>שעה</th>
                    <th style={thStyle}>מטפל</th>
                    <th style={thStyle}>מטופל</th>
                    <th style={thStyle}>משך</th>
                    <th style={thStyle}>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCanceledAppointments.map((canceledAppointment) => {
                    const isProcessing = processingIds.includes(canceledAppointment.appointmentId)
                    return (
                      <tr key={canceledAppointment.appointmentId}>
                        <td style={{ ...tdStyle, fontWeight: "600" }}>
                          {formatDate(canceledAppointment.appointmentDate || "")}
                        </td>
                        <td style={tdStyle}>{formatTime(canceledAppointment.appointmentDate || "")}</td>
                        <td style={tdStyle}>{canceledAppointment.therapistName || "לא ידוע"}</td>
                        <td style={tdStyle}>{getPatientName(canceledAppointment)}</td>
                        <td style={tdStyle}>{canceledAppointment.durationMinutes || 60} דק'</td>
                        <td style={tdStyle}>
                          <button
                            style={{
                              ...successButtonStyle,
                              background: isProcessing ? "#ccc" : "#28a745",
                              cursor: isProcessing ? "not-allowed" : "pointer",
                            }}
                            onClick={() =>
                              handleConfirmCancellation(
                                canceledAppointment.appointmentId,
                                ("patient" in canceledAppointment && canceledAppointment.patient?.patientId) || 0,
                              )
                            }
                            disabled={isProcessing}
                          >
                            {isProcessing ? "מעבד..." : "✓ אישור ביטול"}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <EmptyState message="אין תורים מבוטלים" />
            )}
          </div>
        </div>

        {/* תורים למחר */}
        <div style={{ ...listBoxStyle, borderTop: "4px solid #ae3ca6ff" }}>
          <div style={{ fontWeight: "bold", marginBottom: "1rem", color: "#ae3ca6ff" }}>
            תורים למחר ({filteredNextBusinessDayAppointments.length})
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto", width: "100%" }}>
            {filteredNextBusinessDayAppointments.length > 0 ? (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>תאריך</th>
                    <th style={thStyle}>שעה</th>
                    <th style={thStyle}>מטפל</th>
                    <th style={thStyle}>מטופל</th>
                    <th style={thStyle}>משך</th>
                    <th style={thStyle}>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNextBusinessDayAppointments.map((appointment) => {
                    const isProcessing = processingIds.includes(appointment.appointmentId)
                    return (
                      <tr key={appointment.appointmentId}>
                        <td style={{ ...tdStyle, fontWeight: "600" }}>
                          {formatDate(appointment.appointmentDate || "")}
                        </td>
                        <td style={tdStyle}>{formatTime(appointment.appointmentDate || "")}</td>
                        <td style={tdStyle}>{appointment.therapistName || "לא ידוע"}</td>
                        <td style={tdStyle}>{getPatientName(appointment)}</td>
                        <td style={tdStyle}>{appointment.durationMinutes || 60} דק'</td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: "0.2rem", justifyContent: "center" }}>
                            <button
                              style={{
                                ...successButtonStyle,
                                background: isProcessing ? "#ccc" : "#28a745",
                                cursor: isProcessing ? "not-allowed" : "pointer",
                              }}
                              onClick={() => handleConfirmArrival(appointment.appointmentId)}
                              disabled={isProcessing}
                            >
                              {isProcessing ? "מעבד..." : "✓ אישור הגעה"}
                            </button>
                            <button
                              style={{
                                ...dangerButtonStyle,
                                cursor: isProcessing ? "not-allowed" : "pointer",
                                opacity: isProcessing ? 0.6 : 1,
                              }}
                              onClick={() =>
                                handleCancelTomorrowAppointment(
                                  appointment.appointmentId,
                                  ("patient" in appointment && appointment.patient?.patientId) || 0,
                                )
                              }
                              disabled={isProcessing}
                            >
                              {isProcessing ? "מעבד..." : "✗ ביטול"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <EmptyState message="אין תורים למחר" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageReminders
