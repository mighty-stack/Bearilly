import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AccessCodeTable from "../../Components/admin/AccessCodeTable";
import Button from "../../Components/common/Button";
import Loader from "../../Components/common/Loader";
import PageHeader from "../../Components/common/PageHeader";
import adminService from "../../Services/adminService";

const ManageCodes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadCodes = async () => {
      try {
        setLoading(true);
        const result = await adminService.getAccessCodes();
        const nextCodes = Array.isArray(result) ? result : result?.accessCodes || [];

        if (!ignore) {
          setCodes(nextCodes);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load access codes");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadCodes();
    return () => {
      ignore = true;
    };
  }, []);

  const disableCode = async (selectedCode) => {
    try {
      await adminService.disableAccessCode(selectedCode.id);
      setCodes((current) => current.map((code) => (code.id === selectedCode.id ? { ...code, active: false } : code)));
      toast.success("Access code disabled");
    } catch (error) {
      toast.error(error?.message || "Unable to disable access code");
    }
  };

  if (loading) {
    return <Loader label="Loading access codes" />;
  }

  return (
    <>
      <PageHeader title="Manage Access Codes" subtitle="Create and control learner entry codes." action={<Button>Create code</Button>} />
      <AccessCodeTable codes={codes} onDisableCode={disableCode} />
    </>
  );
};

export default ManageCodes;