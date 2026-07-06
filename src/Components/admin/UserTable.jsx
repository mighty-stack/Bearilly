import Button from "../common/Button";

const UserTable = ({ users = [], onToggleUser, onDeleteUser }) => (
  <div className="app-card table-responsive">
    <table className="table align-middle mb-0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id || user.email}>
            <td className="fw-semibold">{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td><span className="badge text-bg-light">{user.active ? "Active" : "Blocked"}</span></td>
            <td className="text-end">
              <Button variant="ghost" size="sm" onClick={() => onToggleUser?.(user)}>{user.active ? "Block" : "Activate"}</Button>
              <Button variant="ghost" size="sm" onClick={() => onDeleteUser?.(user)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;