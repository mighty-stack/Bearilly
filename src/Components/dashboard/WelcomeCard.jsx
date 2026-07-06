import { FiArrowRight } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";


const WelcomeCard = ({ name = "Learner", nextLesson, onContinue }) => (
  <Card className="border-0" bodyClassName="p-4" style={{ background: "linear-gradient(135deg, var(--primary-color), var(--primary-dark))", color: "var(--white)" }}>
    <p className="mb-1 opacity-75">Welcome back</p>
    <h2 className="h4 fw-bold mb-2">{name}</h2>
    <p className="mb-3 opacity-75">{nextLesson ? `Next lesson: ${nextLesson}` : "Pick up where you stopped."}</p>
    <Button variant="secondary" icon={FiArrowRight} onClick={onContinue}>
      Continue
    </Button>
  </Card>
);

export default WelcomeCard;