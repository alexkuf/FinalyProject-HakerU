const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group my-1">
      <label htmlFor={name}>
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value=""
        className={["form-control mb-1 text-center", error && "is - invalid"]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
      <span className="ivalid-feedback text-danger mb-5">{error}</span>
    </div>
  );
};

export default Textarea;
