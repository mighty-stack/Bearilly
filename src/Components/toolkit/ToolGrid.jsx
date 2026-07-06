import EmptyState from "../common/EmptyState";
import ToolCard from "./ToolCard";

const ToolGrid = ({ tools = [], onOpenTool }) => {
  if (!tools.length) {
    return <EmptyState title="No tools found" message="Try a different search or category." />;
  }

  return (
    <div className="row g-3">
      {tools.map((tool) => (
        <div className="col-12 col-md-6 col-xl-4" key={tool.id || tool.title}>
          <ToolCard {...tool} onOpen={() => onOpenTool?.(tool)} />
        </div>
      ))}
    </div>
  );
};

export default ToolGrid;