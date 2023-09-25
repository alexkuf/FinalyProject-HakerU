import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import cardsService from "../services/cardsCervice";
import { useCard } from "../hooks/useCard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useTimeAndDateFormat from "../hooks/usetimeDateFormat";

const CardsEdit = ({ theme }) => {
  const {
    shortDateFormat,
    CheckArrival,
    CheckArrival1,
    isValdTime,
    isValdTime1,
  } = useTimeAndDateFormat();
  const [error, setError] = useState("");
  const [shDate, setShDate] = useState("");
  const [splitStarTimePart1, setSplitStarTimePart1] = useState("");
  const [splitStarTimePart2, setSplitStarTimePart2] = useState("");
  const [splitStopTimePart1, setSplitStopTimePart1] = useState("");
  const [splitStopTimePart2, setSplitStopTimePart2] = useState("");
  const [message, setMessage] = useState("");
  const [messageStartTime, setMessageStartTime] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const card = useCard(id);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      projectName: "",
      employeeName: "",
      createAt: "",
      startTime: "",
      stopTime: "",
      actions: "",
      revision: "",
    },

    validate: formikValidateUsingJoi({
      projectName: Joi.string().min(0).max(255).required(),
      employeeName: Joi.string().min(0).max(255).required(),
      createAt: Joi.string().min(0).max(400).required(),
      startTime: Joi.string().min(0).max(255),
      stopTime: Joi.string().min(0).max(255),
      actions: Joi.string().min(0).max(255),
      revision: Joi.string().min(0).max(255),
    }),

    async onSubmit(values) {
      try {
        const { ...body } = values;
        cardsService.updateCard(id, body);
        toast("Changes made successfully");
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    CheckArrival(messageStartTime);
    CheckArrival1(message);
  }, [messageStartTime, message, CheckArrival, CheckArrival1]);

  const formRef = useRef(form);

  useEffect(() => {
    if (!card) return;
    const {
      projectName,
      employeeName,
      createAt,
      startTime,
      stopTime,
      actions,
      revision,
    } = card;
    setShDate(card.createAt);
    setSplitStarTimePart1(card.startTime.slice(0, 15));
    setSplitStarTimePart2(card.startTime.slice(25));
    setSplitStopTimePart1(card.stopTime.slice(0, 15));
    setSplitStopTimePart2(card.stopTime.slice(25));
    let date = new Date(card.startTime);
    let datetext = date.toTimeString();
    let datetime = datetext.split(" ")[0];
    setMessageStartTime(datetime);
    date = new Date(card.stopTime);
    datetext = date.toTimeString();
    datetime = datetext.split(" ")[0];
    setMessage(datetime);
    formRef.current?.setValues({
      projectName,
      employeeName,
      createAt,
      startTime,
      stopTime,
      actions,
      revision,
    });
  }, [card]);

  const updateStopTime = () => {
    form.setValues({
      projectName: card.projectName,
      employeeName: card.employeeName,
      createAt: card.createAt,
      startTime: `${
        splitStarTimePart1 + " " + messageStartTime + " " + splitStarTimePart2
      }`,
      stopTime: `${
        splitStopTimePart1 + " " + message + " " + splitStopTimePart2
      }`,
      actions: card.actions,
      revision: card.revision,
    });
  };

  return (
    <>
      <PageHeader title="Edit Project" description="" />
      <form
        onSubmit={form.handleSubmit}
        noValidate
        style={{
          maxWidth: "40rem",
          margin: "auto",
          padding: "10px",
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("projectName")}
          type="text"
          label="Project name:"
          required
          className={
            theme === "dark"
              ? "form-control mb-1 text-center bg-secondary text-white"
              : "form-control mb-1 text-center"
          }
          disabled
        />
        <Input
          {...form.getFieldProps("employeeName")}
          type="text"
          label="Emploee name:"
          required
          className={
            theme === "dark"
              ? "form-control mb-1 text-center bg-secondary text-white"
              : "form-control mb-1 text-center"
          }
          disabled
        />
        <Input
          value={shortDateFormat(shDate)}
          type="text"
          label="Date creation:"
          required
          className={
            theme === "dark"
              ? "form-control mb-1 text-center bg-secondary text-white"
              : "form-control mb-1 text-center"
          }
          disabled
        />
        <Input
          value={messageStartTime}
          type="text"
          label="Start time"
          required
          onChange={(e) => {
            setMessageStartTime(e.target.value);
            CheckArrival(e.target.value);
          }}
          error={!isValdTime ? "Time not valid" : ""}
        />
        <Input
          value={message}
          type="text"
          disabled={false}
          label="Stop time:"
          required
          onChange={(e) => {
            setMessage(e.target.value);
            CheckArrival1(e.target.value);
          }}
          error={!isValdTime1 ? "Time not valid" : ""}
        />
        <Input
          {...form.getFieldProps("actions")}
          type="text"
          label="Action:"
          required
          className={
            theme === "dark"
              ? "form-control mb-1 text-center bg-secondary text-white"
              : "form-control mb-1 text-center"
          }
          disabled
        />
        <Input
          {...form.getFieldProps("revision")}
          type="text"
          label="Revision:"
          required
          className={
            theme === "dark"
              ? "form-control mb-1 text-center bg-secondary text-white"
              : "form-control mb-1 text-center"
          }
          disabled
          error={form.touched.revision && form.errors.revision}
        />

        <div className="my-2 d-flex justify-content-between">
          <button
            type="submit"
            disabled={!isValdTime}
            className="btn btn-success"
            onClick={() => {
              updateStopTime();
            }}
          >
            Edit Card
          </button>
          <Link type="button" className="btn btn-primary ms-2 " to="/my-page">
            <i className="bi bi-house-door me-2"></i>
            <i className="bi bi-arrow-return-left"></i>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CardsEdit;
