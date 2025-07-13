"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { login, clearError } from "../../redux/slices/authSlice"
import "../../styles/LoginPage.css"

const LoginPage = () => {
  const [userType, setUserType] = useState("patient")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let loginData

      if (userType === "patient") {
        loginData = {
          id: Number.parseInt(data.patientId),
          birthYear: data.birthYear,
        }
      } else {
        loginData = {
          id: Number.parseInt(data.userId),
          password: data.password,
        }
      }

      const result = await dispatch(login(loginData))

      if (result.type === "auth/login/fulfilled") {
        const role = result.payload.role
        alert(role)
        const data=result.payload.data.result;
        // alert(JSON.stringify(data));
        //data is the patient details or the therapist details
        if (role === "patient" || role === "client") {
          navigate("/patient/dashboard")
        } else if (role === "therapist") {
          navigate("/therapist/dashboard")
        } else if (role === "secretary") {
          navigate("/secretary/dashboard")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    reset()
    dispatch(clearError())
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>מכון להתפתחות הילד</h1>
          <h2>Child Development Institute</h2>
        </div>

        <div className="user-type-selector">
          <button
            type="button"
            className={`user-type-btn ${userType === "patient" ? "active" : ""}`}
            onClick={() => handleUserTypeChange("patient")}
          >
            מטופל / Patient
          </button>
          <button
            type="button"
            className={`user-type-btn ${userType === "therapist" ? "active" : ""}`}
            onClick={() => handleUserTypeChange("therapist")}
          >
            מטפל / Therapist
          </button>
          <button
            type="button"
            className={`user-type-btn ${userType === "secretary" ? "active" : ""}`}
            onClick={() => handleUserTypeChange("secretary")}
          >
            מזכירה / Secretary
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {userType === "patient" ? (
            <>
              <div className="form-group">
                <label className="form-label">מספר זהות / ID Number</label>
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
                  placeholder="הכנס מספר זהות"
                />
                {errors.patientId && <span className="error-message">{errors.patientId.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">שנת לידה / Birth Year</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("birthYear", {
                    required: "שנת לידה נדרשת",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "שנת לידה חייבת להכיל 4 ספרות",
                    },
                  })}
                  placeholder="הכנס שנת לידה"
                />
                {errors.birthYear && <span className="error-message">{errors.birthYear.message}</span>}
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">מספר זהות / ID Number</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("userId", {
                    required: "מספר זהות נדרש",
                    pattern: {
                      value: /^\d{9}$/,
                      message: "מספר זהות חייב להכיל 9 ספרות",
                    },
                  })}
                  placeholder="הכנס מספר זהות"
                />
                {errors.userId && <span className="error-message">{errors.userId.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">סיסמה / Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "סיסמה נדרשת",
                    minLength: {
                      value: 4,
                      message: "סיסמה חייבת להכיל לפחות 4 תווים",
                    },
                  })}
                  placeholder="הכנס סיסמה"
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
              </div>
            </>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "התחבר / Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage







// {
//   "$id": "1",
//   "role": "patient",
//   "data": {
//     "$id": "2",
//     "result": {
//       "$id": "3",
//       "patientId": 123456780,
//       "firstName": "דוד",
//       "lastName": "מאיר",
//       "birthDate": "1985-03-15",
//       "phoneNumber": "054-1234567"
//     },
//     "id": 413,
//     "exception": null,
//     "status": "RanToCompletion",
//     "isCanceled": false,
//     "isCompleted": true,
//     "isCompletedSuccessfully": true,
//     "creationOptions": "None",
//     "asyncState": null,
//     "isFaulted": false
//   }
// }