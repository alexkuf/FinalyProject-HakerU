import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useAuth } from "../context/auth.context";
import { NavLink } from "react-router-dom";

const SignIn = ({ redirect = "/" }) => {
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("email"),
      password: Joi.string().min(6).max(1024).required().label("password"),
    }),

    async onSubmit(values) {
      try {
        await login(values);
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader title="Sign in" description="Sign in to continue" />
      <form
        onSubmit={form.handleSubmit}
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
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />
        <div className="d-grid gap-2 mt-2">
          <div className="">
            <NavLink className="nav-link" id="forgotPassword" to="/support">
              Forgot password!!!
            </NavLink>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!form.isValid}
          >
            Sign In
          </button>
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
          src="https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png"
          alt="sign up"
        />
      </div>
    </>
  );
};

export default SignIn;
