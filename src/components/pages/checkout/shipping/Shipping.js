import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useHistory } from "react-router";

function Shipping(props) {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [addressInfo, setAddressInfo] = useState("");
  const history = useHistory();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    zipcode: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
    state: Yup.string()
      .required("Required")
      .min(2, "Must be exactly 2 letters")
      .max(2, "Must be exactly 2 letters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      zipcode: "",
      state: "",
    },
    onSubmit: (values, onSubmitProps) => {
      let addressInfoParts = "";
      for (const key in values) {
        addressInfoParts += " " + values[key];
      }
      setAddressInfo(addressInfoParts);
      setSubmitSuccess("Address Accepted, Redirecting to Payment");
    },
    validationSchema,
  });

  useEffect(() => {
    if (addressInfo) {
      const totalPrice = props.location.totalPrice;
      const discount = props.location.discount;
      setTimeout(function () {
        history.push({
          pathname: "/payment",
          addressInfo,
          totalPrice,
          discount,
        });
      }, 1500);
    }
  }, [addressInfo]);

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Shipping Info</h1>
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
            <label htmlFor="address">Street Address</label>
            <input
              className="input-text-field"
              type="text"
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="div-errors">{formik.errors.address}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              className="input-text-field"
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipcode}
            />
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <div className="div-errors">{formik.errors.zipcode}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="state">State 2 letter abbreviation</label>
            <input
              className="input-text-field"
              type="text"
              name="state"
              placeholder="State"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="div-errors">{formik.errors.state}</div>
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

export default Shipping;
