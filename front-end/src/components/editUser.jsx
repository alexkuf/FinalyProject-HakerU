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

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser(id);
  const [error, setError] = useState("");
  const [isAdminBox, setIsAdminBox] = useState(false);

  const handleChange = (e) => {
    if (!isAdminBox) {
      setIsAdminBox(true);
    } else {
      setIsAdminBox(false);
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
        usersServise.updateUser(id, { ...body, isAdmin: isAdminBox });
        toast.success("User change successfully");
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
    setIsAdminBox(user.isAdmin);
    formRef.current?.setValues({
      email,
      name,
      password,
    });
  }, [user]);
  return (
    <>
      <PageHeader
        title="Edit employee"
        description="Employee profile changes"
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
          error={form.touched.name && form.errors.name}
        />
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          error={form.touched.email && form.errors.email}
        />
        <div className="m-auto mt-3" style={{ height: "40px" }}>
          <label className="fs-5 me-3 text-center">Administartor:</label>
          <input
            type="checkbox"
            className=""
            style={{ width: "20px", height: "20px", paddingTop: "5px" }}
            checked={isAdminBox}
            onChange={(e) => handleChange(e.target.checked)}
          />
        </div>

        <div className="d-grid gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!form.isValid}
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
          src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-group-icon--28.png"
          alt="sign up"
        />
      </div>
    </>
  );
};

export default EditUser;
