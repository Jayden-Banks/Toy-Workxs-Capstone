import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { login } from './userSlice'
import { useSelector, useDispatch } from 'react-redux'

/* // todo
  MVP
  - Create Header "Log in"
  - Create "Create Account" button
  - Link "Create Account" button to CreateAccount Page
  - Create form with 2 input fields (email, password)
  - password cannot display while being typed
  - onSubmit handle that compares inputs to users in database for verification (bcrypt will have to used here)
  - Create "Log in" button that will submit the form
  - Link "Log in" button success to User Account or fail
  - Create fail log in verification that notifies user the email and password were not found
  
  Future Features
  - Create "forgot password" Link that allows user to reset password
  - Create "Remember me" checkbox selection that will save a cookie to user to stay logged in on refresh
  - Create div "Having Issues?" other component
*/

function Login() {
  const history = useHistory()
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [showPass, setShowPass] = useState("password");
  const [submitError, setSubmitError] = useState('')
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, onSubmitProps) => {
      const { email, password } = values;
      (async() => {
        try {
          const res = await axios.get('api/profile/', {params: { email, password}})
          setSubmitError(`Welcome back ${res.data.firstName}`)
          dispatch(login(res.data))
          history.goBack()          
          console.log("Now redirecting to account page")
          
        } catch (err) {
          if(err.response.data === 'User not found') {
            setSubmitError('Incorrect email')
          } else if(err.response.data === 'Incorrect password') {
            setSubmitError('Incorrect password')
          } 
          else {
            setSubmitError('Something went wrong')
          }
        }
      })()
      onSubmitProps.setSubmitting(false);
      // onSubmitProps.resetForm();
    },
    validationSchema,
  });

  const displayPassword = () => {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">LOGIN</h1>
        <Link to="/createAccount">
          <h3 className="h3-sub-title">Create Account</h3>
        </Link>
      </div>
      <div className="div-form">
        <div className="div-error-submit">{submitError}</div>
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="div-form-control">
            <label htmlFor="email">Email</label>
            <input
              className="input-text-field"
              type="text"
              id="input-login-email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="div-errors">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="password">Password</label>
            <input
              className="input-text-field"
              type={showPass}
              id="input-login-password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="div-errors">{formik.errors.password}</div>
            ) : null}
            <div id="div-show-password">
              <input
                type="checkbox"
                name="show-password"
                onClick={() => displayPassword()}
              />
              <label htmlFor="show-password"> Show Password</label>
            </div>
          </div>
          <button className="button-submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
