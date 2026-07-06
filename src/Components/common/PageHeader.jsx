const PageHeader = ({ title, subtitle, action }) => (
  <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
    <div>
      <h1 className="h4 fw-bold mb-1">{title}</h1>
      {subtitle && <p className="mb-0 text-muted-app">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

export default PageHeader;