const Loader = ({ label = "Loading" }) => (
  <div className="d-flex min-vh-50 align-items-center justify-content-center py-5">
    <div className="text-center">
      <div className="spinner-border text-info" role="status" aria-label={label} />
      <p className="mt-3 mb-0 text-muted-app fw-semibold">{label}</p>
    </div>
  </div>
);

export default Loader;