import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
      name: Joi.string().min(2).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, isAdmin: false });
        toast.success("User added successfully");
        navigate("/manage");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title="Add new employee" description="Open new account" />
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
        <Input
          {...form.getFieldProps("name")}
          type="name"
          label="Name"
          required
          error={form.touched.name && form.errors.name}
        />

        <div className="d-grid gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!form.isValid}
          >
            Add new employee
          </button>
          <Link type="button" className="btn btn-primary" to="/manage">
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
          src="https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png"
          alt="sign up"
        />
      </div>
    </>
  );
};

export default AddUser;
