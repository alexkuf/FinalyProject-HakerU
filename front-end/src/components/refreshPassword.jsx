import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import usersServise from "../services/userService";

const RefreshPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser(id);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState("");

  const handleinputChange = () => {
    if (password.length > 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

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
        const { ...body } = values;
        usersServise.refreshPassword(id, { ...body, password: password });
        toast.success("Password change successfully");
        navigate("/manage");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  const formRef = useRef(form);

  useEffect(() => {
    if (!user) return;
    const { email, name, password } = user;
    formRef.current?.setValues({
      email,
      name,
      password,
    });
  }, [user]);

  return (
    <>
      <PageHeader
        title="Change password"
        description="Employee password changes"
      />
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
          {...form.getFieldProps("name")}
          type="name"
          label="Name"
          required
          disabled
        />
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          disabled
        />
        <div
          className="form justify-content-center"
          style={{
            maxWidth: "32rem",
            justifyContent: "center",
            margin: "auto",
            padding: "5px",
          }}
        >
          <label className="">New password: </label>
          <div className="card text-center">
            <input
              type="text"
              className="border border-0 text-center rounded-2"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleinputChange();
              }}
              error={form.touched.password && form.errors.password}
            />
          </div>
        </div>

        <div className="d-grid gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!isValid}
          >
            Change
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
          src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-reset-7232312-5889578.png"
          alt="sign up"
        />
      </div>
    </>
  );
};

export default RefreshPassword;
