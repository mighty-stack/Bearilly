const ToolCategoryFilter = ({ categories = [], active = "All", onChange }) => (
  <div className="d-flex gap-2 overflow-auto pb-2 mb-3">
    {["All", ...categories].map((category) => (
      <button
        key={category}
        type="button"
        className={`btn btn-sm rounded-pill flex-shrink-0 ${active === category ? "text-white" : "bg-white border"}`}
        style={{ background: active === category ? "var(--primary-color)" : undefined }}
        onClick={() => onChange?.(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default ToolCategoryFilter;