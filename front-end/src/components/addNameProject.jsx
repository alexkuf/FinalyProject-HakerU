import { useState } from "react";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import projectService from "../services/projectCervice";
import Input from "./common/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProjectNames } from "../hooks/useProjectNames";

function AddNameProject() {
  const projNames = useProjectNames();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        const { ...body } = values;
        await projectService.createProjectname(body);
        toast.success(`${body.name} : added successfully `);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title="Add new" description="Add new name project" />
      <div className="d-flex flex-wrap">
        <form
          onSubmit={form.handleSubmit}
          noValidate
          style={{
            width: "40rem",
            justifyContent: "center",
            marginTop: "20px",
            margin: "auto",
          }}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="card m-5 p-5">
            <Input
              {...form.getFieldProps("name")}
              type="text"
              label="Name project"
              required
              error={form.touched.name && form.errors.name}
            />
            <div
              className="card text-center mt-3 mb-3 overflow-auto"
              style={{
                maxHeight: "120px",
              }}
            >
              {projNames?.map((el, ind) => {
                return <div key={ind}>{el.name}</div>;
              })}
            </div>

            <button
              type="submit"
              disabled={!form.isValid}
              className="btn btn-primary"
            >
              Add
            </button>
            <Link type="button" className="btn btn-primary mt-2" to="/">
              Back
              <i className="bi bi-house-door ms-2"></i>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNameProject;
