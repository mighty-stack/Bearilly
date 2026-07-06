import "../../Styles/forms.css";

const Input = ({
  label,
  name,
  error,
  touched,
  icon: Icon,
  helperText,
  className = "",
  ...props
}) => {
  const hasError = Boolean(touched && error);

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label fw-semibold" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="position-relative">
        {Icon && (
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted-app">
            <Icon aria-hidden="true" />
          </span>
        )}
        <input
          id={name}
          name={name}
          className={`form-control app-input ${Icon ? "ps-5" : ""} ${hasError ? "is-invalid" : ""}`}
          {...props}
        />
        {hasError && <div className="invalid-feedback">{error}</div>}
      </div>
      {helperText && !hasError && <small className="text-muted-app">{helperText}</small>}
    </div>
  );
};

export default Input;