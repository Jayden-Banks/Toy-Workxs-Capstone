import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../login/userSlice";

function CreateAccount() {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8, "password length"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, onSubmitProps) => {
      const { firstName, lastName, email, password: passHash } = values;

      (async () => {
        const body = {
          firstName,
          lastName,
          email,
          passHash,
        };
        try {
          const res = await axios.post("api/profile", body);
          setSubmitError(false);
          setSubmitSuccess("Account Successfully Created, redirecting...");
          dispatch(login(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
          setTimeout(function () {
            history.push("/account");
          }, 2000);
        } catch (err) {
          switch (err.response.data) {
            case "Validation len on passHash failed":
              setSubmitError("Password must be 8 or more characters");
              break;
            case "Email address already in use!":
              setSubmitError("Email already in use");
              break;
            default:
              setSubmitError("Something went wrong");
              break;
          }
        }
      })();
    },
    validationSchema,
  });
  useEffect(() => {
    if (user) {
      history.push("/account");
    }
  });

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">
          CREATE<br></br> ACCOUNT
        </h1>
        <Link to="/login">
          <h3 className="h3-sub-title">Login</h3>
        </Link>
      </div>
      <div className="div-form">
        <h3 className="h3-error-submit">{submitError}</h3>
        <h3 className="h3-success-submit">{submitSuccess}</h3>
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="div-form-control">
            <label htmlFor="firstName">First Name</label>
            <input
              className="input-text-field"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="div-errors">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="input-text-field"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="div-errors">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="email">Email</label>
            <input
              className="input-text-field"
              type="text"
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
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="div-errors">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-text-field"
              type="password"
              name="confirmPassword"
              placeholder="Confirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="div-errors">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
