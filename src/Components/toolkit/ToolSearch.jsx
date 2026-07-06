import { FiSearch } from "react-icons/fi";

const ToolSearch = ({ value, onChange }) => (
  <div className="position-relative mb-3">
    <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted-app" aria-hidden="true" />
    <input
      className="form-control app-input ps-5"
      value={value}
      placeholder="Search tools"
      onChange={(event) => onChange?.(event.target.value)}
    />
  </div>
);

export default ToolSearch;