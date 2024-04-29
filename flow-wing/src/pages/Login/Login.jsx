import React from "react"
import "./login.css"
import { useNavigate } from "react-router"
import { Divider } from "antd"
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"
import { Formik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Redux/authSlice"

const Login = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // redux state
  const { loading, error } = useSelector((state) => state.user)
  // login handler function
  const handleLogin = (values) => {
    dispatch(loginUser(values)).then((result) => {
      //console.log(result)
      if (result.payload) {
        navigate("/home")
      }
    })
  }
  //validations

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Zorunlu alan")
      .min(4, "Şifre en az 4 karakter içermelidir")
      .max(8, "Şifre en fazla 8 karakterden oluşabilir."),
    email: Yup.string()
      .email("Geçersiz e-mail adresi")
      .required("Zorunlu alan")
      .test(
        "arcelikEmail",
        "Yalnızca Arçelik maillerinizle giriş yapabilirsiniz",
        function (value) {
          // E-posta adresinin @arcelik.com ile bitip bitmediğini kontrol et
          if (value && value.endsWith("@arcelik.com")) {
            return true // Geçerli
          }
          return false // Geçersiz
        }
      )
  })

  return (
    <div className="login-page-content">
      <div className="login-page-form">
        <p>Hoş Geldiniz</p>
        <Divider />
        <Formik
          initialValues={{
            password: "",
            email: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values)
            handleLogin(values)
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form>
              <div className="input-areas">
                <TextField
                  id="standard-basic"
                  name="email"
                  label="Mail "
                  variant="standard"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>

              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}

              <div className="input-areas">
                {" "}
                <TextField
                  id="standard-basic"
                  name="password"
                  label="Şifre"
                  variant="standard"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}

              {/* LINK TO REGISTER PAGE IF USER DOESN'T HAVE AN ACCOUNT */}
              <div className="register-link">
                Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
              </div>

              {/* SUBMIT BUTTON */}

              <button className="sign-in-btn" onClick={handleSubmit}>
                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Giriş Yap"
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
