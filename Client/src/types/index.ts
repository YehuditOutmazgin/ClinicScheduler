export type Specialization =
  | 'SpeechTherapy'
  | 'OccupationalTherapy'
  | 'PhysicalTherapy'
  | 'Psychology'
  | 'SocialWork'
  | 'BehavioralTherapy'
  | 'EducationalTherapy';

export interface WorkHour {
  id: number
  therapistId: number
  dayOfWeek: string
  startTime: string
  endTime: string
}

export interface Therapist {
  id: number
  therapistId: number
  firstName: string
  lastName: string
  specialization: Specialization
  phoneNumber: string
  appointmentDuration: number
}

export interface Patient {
  patientId: number
  firstName: string
  lastName: string
  birthDate: string
  phoneNumber: string
}

export interface AppointmentBase {
  appointmentDate: string
  appointmentId: number
  durationMinutes: number
  specialization: Specialization
  therapistId: number
  therapistName: string
}

export interface Appointment extends AppointmentBase {
  status?: string
  patient?: Patient
}

export interface AvailableAppointment extends AppointmentBase { }

export interface PastAppointment extends AppointmentBase {
  patientId: number
  status?: string
  patient?: Patient
}

export interface CanceledAppointment extends AppointmentBase {
  note?: string
  patient?: Patient
}

export interface LoginResponse {
  role: "patient" | "therapist" | "secretary"
  data: Patient | Therapist | { firstName: string; lastName: string }
}

export interface AuthState {
  user: Patient | Therapist | { firstName: string; lastName: string } | null
  role: "patient" | "therapist" | "secretary" | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface AppointmentState {
  appointments: Appointment[]
  availableAppointments: AvailableAppointment[]
  pastAppointments: PastAppointment[]
  canceledAppointments: CanceledAppointment[]
  loading: boolean
  error: string | null
}

export interface WorkHourState {
  workHours: WorkHour[]
  loading: boolean
  error: string | null
}

export interface TimeSlot {
  time: string
  available: boolean
  appointmentId?: number
}

// Helper functions

export const getSpecializationName = (specialization: Specialization): string => {
  const names: Record<Specialization, string> = {
    SpeechTherapy: "ריפוי בדיבור",
    OccupationalTherapy: "ריפוי בעיסוק",
    PhysicalTherapy: "פיזיותרפיה",
    Psychology: "פסיכולוגיה",
    SocialWork: "עבודה סוציאלית",
    BehavioralTherapy: "טיפול התנהגותי",
    EducationalTherapy: "טיפול חינוכי",
  };

  return names[specialization] || "לא ידוע";
}

export const getUserId = (user: Patient | Therapist | { firstName: string; lastName: string } | null): number => {
  if (!user) return 0
  if ("patientId" in user) return user.patientId
  if ("therapistId" in user) return user.therapistId
  return 0
}

export const getUserName = (user: Patient | Therapist | { firstName: string; lastName: string } | null): string => {
  if (!user) return ""
  if ("firstName" in user && "lastName" in user) {
    return `${user.firstName} ${user.lastName}`
  }
  return ""
}
