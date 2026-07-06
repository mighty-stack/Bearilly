import { useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";

const QuizCard = ({ question, options = [], answer, onSubmit }) => {
  const [selected, setSelected] = useState("");

  return (
    <Card>
      <h3 className="h5 fw-bold mb-3">{question}</h3>
      <div className="d-grid gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`btn text-start border rounded-3 p-3 ${selected === option ? "border-info bg-light" : "bg-white"}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <Button className="mt-3" fullWidth disabled={!selected} onClick={() => onSubmit?.({ selected, correct: selected === answer })}>
        Submit answer
      </Button>
    </Card>
  );
};

export default QuizCard;