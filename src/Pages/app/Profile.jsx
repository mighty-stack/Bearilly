import { useMemo } from "react";
import { FiMail, FiUser } from "react-icons/fi";
import Button from "../../Components/common/Button";
import Card from "../../Components/common/Card";
import Input from "../../Components/common/Input";
import PageHeader from "../../Components/common/PageHeader";
import authService from "../../Services/authService";

const Profile = () => {
  const user = useMemo(() => authService.getCurrentUser(), []);
  const fullName = user?.fullName || user?.name || "Learner";
  const email = user?.email || "";

  return (
    <>
      <PageHeader title="Profile" subtitle="Manage your learner details." />
      <Card bodyClassName="p-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, background: "rgba(36,138,142,.12)", color: "var(--primary-color)" }}>
            <FiUser size={28} aria-hidden="true" />
          </div>
          <div>
            <h2 className="h5 fw-bold mb-1">{fullName}</h2>
            <p className="text-muted-app mb-0">{user?.role || "Learner"}</p>
          </div>
        </div>
        <Input label="Full name" name="name" icon={FiUser} defaultValue={fullName} />
        <Input label="Email" name="email" type="email" icon={FiMail} defaultValue={email} />
        <Button>Save changes</Button>
      </Card>
    </>
  );
};

export default Profile;