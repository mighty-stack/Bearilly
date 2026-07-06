import { useEffect, useMemo, useState } from "react";
import { FiClipboard, FiFileText, FiKey, FiUsers } from "react-icons/fi";
import AdminStats from "../../Components/admin/AdminStats";
import Card from "../../Components/common/Card";
import Loader from "../../Components/common/Loader";
import PageHeader from "../../Components/common/PageHeader";
import adminService from "../../Services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadStats = async () => {
      try {
        setLoading(true);
        const result = await adminService.getAdminStats();
        if (!ignore) {
          const nextStats = [
            { label: "Users", value: result?.users ?? 0, icon: FiUsers },
            { label: "Access codes", value: result?.accessCodes ?? 0, icon: FiKey },
            { label: "Assessments", value: result?.assessments ?? 0, icon: FiFileText },
            { label: "Submissions", value: result?.submissions ?? 0, icon: FiClipboard },
          ];
          setStats(nextStats);
        }
      } catch (error) {
        if (!ignore) {
          setStats([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadStats();
    return () => {
      ignore = true;
    };
  }, []);

  const summaryCards = useMemo(() => {
    if (stats.length) {
      return stats;
    }

    return [
      { label: "Users", value: 0, icon: FiUsers },
      { label: "Access codes", value: 0, icon: FiKey },
      { label: "Assessments", value: 0, icon: FiFileText },
      { label: "Submissions", value: 0, icon: FiClipboard },
    ];
  }, [stats]);

  if (loading) {
    return <Loader label="Loading admin dashboard" />;
  }

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Manage platform activity from one place." />
      <AdminStats stats={summaryCards} />
      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-6">
          <Card>
            <h2 className="h6 fw-bold">Recent activity</h2>
            <p className="text-muted-app mb-0">Latest admin metrics are now pulled from the API.</p>
          </Card>
        </div>
        <div className="col-12 col-lg-6">
          <Card>
            <h2 className="h6 fw-bold">Access code usage</h2>
            <p className="text-muted-app mb-0">Monitor code creation and learner access from the live backend.</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;