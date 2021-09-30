import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

/* // todo
  MVP
  - Create Header "Create Account"
  - Create form with 3 text inputs (first name, last name, email)
  - onSubmit handle that verifies the 3 inputs, gives feedback and then posts info to database with a successfully created account message
  - Create "Create" button

  Future Features
  - Create div "Having Issues" other component
  - email already used error verification message
*/

function CreateAccount() {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
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
      console.log("Form data", values);
      const { firstName, lastName, email, password, confirmPassword } = values;
      console.log(firstName, lastName, email, password, confirmPassword);
      // todo Axios post here for creating a profile and we done
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
    validationSchema,
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
