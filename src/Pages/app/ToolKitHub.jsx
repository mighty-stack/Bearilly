import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../Components/common/PageHeader";
import Loader from "../../Components/common/Loader";
import ToolCategoryFilter from "../../Components/toolkit/ToolCategoryFiller";
import ToolGrid from "../../Components/toolkit/ToolGrid";
import ToolSearch from "../../Components/toolkit/ToolSearch";
import toolkitService from "../../Services/toolkitService";

const ToolkitHub = () => {
  const [tools, setTools] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadTools = async () => {
      try {
        setLoading(true);
        const result = await toolkitService.getTools();
        const nextTools = Array.isArray(result) ? result : result?.tools || [];

        if (!ignore) {
          setTools(nextTools);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Unable to load toolkit");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTools();
    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(tools.map((tool) => tool.category))], [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const matchesQuery = tool.title?.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query, tools]);

  if (loading) {
    return <Loader label="Loading toolkit" />;
  }

  return (
    <>
      <PageHeader title="Toolkit" subtitle="Fast tools for learning and submissions." />
      <ToolSearch value={query} onChange={setQuery} />
      <ToolCategoryFilter categories={categories} active={category} onChange={setCategory} />
      <ToolGrid tools={filteredTools} onOpenTool={(tool) => toast.success(`${tool.title} opened`)} />
    </>
  );
};

export default ToolkitHub;