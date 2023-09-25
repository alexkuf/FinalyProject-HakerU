import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { useProjectNames } from "../hooks/useProjectNames";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { toast } from "react-toastify";
import cardsService from "../services/cardsCervice";
import useCheckIsComplete from "../hooks/usecheckIscomplete";

const useCardsCreate = () => {
  const { checkComplete, cardName, checkIscomplete } = useCheckIsComplete();
  const { user } = useAuth();
  const [select, setSelect] = useState([]);
  const [pNames, setPName] = useState([]);
  const [rev, setRev] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const projNames = useProjectNames();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState([]);

  const handleStopClick = async () => {
    let id = cardName._id;
    try {
      const { stopTime, ...body } = cardName;
      if (stopTime) {
        body.stopTime = Date();
      }
      await cardsService.updateCard(id, body);
      toast.success("Project successfully stopped");
      navigate("/");
    } catch ({ response }) {
      if (response && response.status === 400) {
        setError(response.data);
      }
    }
  };

  const handleSelectChange = (e) => {
    checkIscomplete();
    setSelect(e.target.value);
    const sortedData = [...projNames].sort((a, b) => {
      if (a > b) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setPName(sortedData);
  };

  const handlePrNameFromRevisinChange = (e) => {
    if (e.target.value !== "Choose project:" && rev !== "") {
      setIsEmpty(true);
      form.setValues({
        projectName: e.target.value,
        employeeName: user.name,
        createAt: Date(),
        startTime: Date(),
        stopTime: "Not finished",
        actions: select,
        revision: rev,
      });
      setProjectName(e.target.value);
    } else {
      setIsEmpty(false);
      setProjectName(e.target.value);
    }
  };
  const handleRevisinChange = (e) => {
    if (e.target.value !== "Choose revision:" && projectName !== "") {
      setIsEmpty(true);
      setRev(e.target.value);
      form.setValues({
        projectName: projectName,
        employeeName: user.name,
        createAt: Date(),
        startTime: Date(),
        stopTime: "Not finished",
        actions: select,
        revision: e.target.value,
      });
    } else {
      setRev(e.target.value);
      setIsEmpty(false);
    }
  };

  const handleIsEmptyChange = (e) => {
    if (e.target.value !== "Choose project:") {
      setIsEmpty(true);
      setProjectName(e.target.value);
      form.setValues({
        projectName: e.target.value,
        employeeName: user.name,
        createAt: Date(),
        startTime: Date(),
        stopTime: "Not finished",
        actions: select,
        revision:
          select === "New Project"
            ? "00"
            : select === "Order drawing"
            ? "100"
            : "",
      });
    } else {
      setIsEmpty(false);
    }
  };

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
        await cardsService.createCard(body);
        toast.success("Data added successfully");
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return {
    checkComplete,
    cardName,
    form,
    pNames,
    rev,
    isEmpty,
    user,
    select,
    error,
    handleStopClick,
    handleSelectChange,
    handlePrNameFromRevisinChange,
    handleRevisinChange,
    handleIsEmptyChange,
  };
};

export default useCardsCreate;
