import Button from "../common/Button";

const AccessCodeTable = ({ codes = [], onDisableCode }) => (
  <div className="app-card table-responsive">
    <table className="table align-middle mb-0">
      <thead>
        <tr>
          <th>Code</th>
          <th>Uses</th>
          <th>Status</th>
          <th className="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        {codes.map((code) => (
          <tr key={code.id || code.value}>
            <td className="fw-bold">{code.value}</td>
            <td>{code.used || 0}/{code.limit || "Unlimited"}</td>
            <td><span className="badge text-bg-light">{code.active ? "Active" : "Disabled"}</span></td>
            <td className="text-end">
              <Button variant="ghost" size="sm" onClick={() => onDisableCode?.(code)}>Disable</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AccessCodeTable;