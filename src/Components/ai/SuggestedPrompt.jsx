const SuggestedPrompts = ({ prompts = [], onSelect }) => (
  <div className="d-flex gap-2 overflow-auto pb-2">
    {prompts.map((prompt) => (
      <button
        key={prompt}
        type="button"
        className="btn btn-sm bg-white border rounded-pill flex-shrink-0"
        onClick={() => onSelect?.(prompt)}
      >
        {prompt}
      </button>
    ))}
  </div>
);

export default SuggestedPrompts;