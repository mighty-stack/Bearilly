import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTable from "../../Components/admin/UserTable";
import Button from "../../Components/common/Button";
import Loader from "../../Components/common/Loader";
import PageHeader from "../../Components/common/PageHeader";
import adminService from "../../Services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      try {
        setLoading(true);
        const result = await adminService.getUsers();
        const nextUsers = Array.isArray(result) ? result : result?.users || [];

        if (!ignore) {
          setUsers(nextUsers);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load users");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadUsers();
    return () => {
      ignore = true;
    };
  }, []);

  const toggleUser = async (selectedUser) => {
    try {
      await adminService.toggleUserStatus(selectedUser.id, !selectedUser.active);
      setUsers((current) => current.map((user) => (user.id === selectedUser.id ? { ...user, active: !user.active } : user)));
      toast.success("User status updated");
    } catch (error) {
      toast.error(error?.message || "Unable to update user");
    }
  };

  const deleteUser = async (selectedUser) => {
    try {
      await adminService.deleteUser(selectedUser.id);
      setUsers((current) => current.filter((user) => user.id !== selectedUser.id));
      toast.success("User removed");
    } catch (error) {
      toast.error(error?.message || "Unable to delete user");
    }
  };

  if (loading) {
    return <Loader label="Loading users" />;
  }

  return (
    <>
      <PageHeader title="Manage Users" subtitle="Control learner and admin accounts." action={<Button>Add user</Button>} />
      <UserTable users={users} onToggleUser={toggleUser} onDeleteUser={deleteUser} />
    </>
  );
};

export default ManageUsers;