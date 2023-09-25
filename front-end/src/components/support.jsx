import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import Input from "./common/input";
import Textarea from "./common/textarea";
import { useFormik } from "formik";
import ProgressBar from "../components/progressBar";

export const ForgotPpassword = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const form1 = useFormik({
    validateOnMount: true,
    initialValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
    validate: formikValidateUsingJoi({
      user_name: Joi.string().min(4).max(255).required(),
      user_email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      message: Joi.string().min(6).max(1024).required(),
    }),
  });
  const sendEmail = (e) => {
    setIsRunning(true);
    e.preventDefault();
    emailjs
      .sendForm(
        "service_vxhhzxp",
        "template_ni1228u",
        form.current,
        "S1xzbifbxjXJJbZFj"
      )
      .then(
        (result) => {
          toast.success("Messages sent", result);
          navigate("/");
        },
        (error) => {
          setError(error.text);
        }
      );
  };

  return (
    <div className="container">
      <PageHeader
        title="Send email to support"
        description="Forgot Ppassword"
      />
      <form
        ref={form}
        onSubmit={sendEmail}
        noValidate
        style={{
          maxWidth: "32rem",
          justifyContent: "center",
          margin: "auto",
          padding: "5px",
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...form1.getFieldProps("user_name")}
          type="user_name"
          name="user_name"
          label="Name"
          required
          error={form1.touched.user_name && form1.errors.user_name}
        />
        <Input
          {...form1.getFieldProps("user_email")}
          type="user_email"
          name="user_email"
          label="Email"
          required
          error={form1.touched.user_email && form1.errors.user_email}
        />
        <Textarea
          {...form1.getFieldProps("message")}
          type="message"
          name="message"
          label="Message"
          required
          error={form1.touched.message && form1.errors.message}
        />

        <div className="d-grid gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!form1.isValid}
          >
            {isRunning && <ProgressBar isRunning={isRunning} />}
            {isRunning ? null : "Send"}
          </button>
          <Link type="button" className="btn btn-primary" to="/">
            Back
          </Link>
        </div>
      </form>
      <div
        className=""
        style={{
          maxWidth: "32rem",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <img
          style={{
            maxHeight: "22rem",
          }}
          src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-mobile-8044866-6430775.png?f=webp"
          alt="sign up"
        />
      </div>
    </div>
  );
};

export default ForgotPpassword;
