import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";

const LessonContent = ({ lesson, onPrevious, onNext, onComplete, isLast = false }) => (
  <div className="mx-auto" style={{ maxWidth: 760 }}>
    <Card bodyClassName="p-4">
      <p className="small fw-bold mb-2" style={{ color: "var(--secondary-color)" }}>{lesson?.category || "Lesson"}</p>
      <h1 className="h3 fw-bold mb-3">{lesson?.title}</h1>
      {lesson?.media && <img className="img-fluid rounded-3 mb-3" src={lesson.media} alt="" />}
      <div className="fs-6 lh-lg text-muted-app">{lesson?.content}</div>
    </Card>
    <div className="d-flex justify-content-between gap-2 mt-3">
      <Button variant="ghost" icon={FiArrowLeft} onClick={onPrevious}>Back</Button>
      <Button icon={isLast ? FiCheck : FiArrowRight} onClick={isLast ? onComplete : onNext}>
        {isLast ? "Finish" : "Next"}
      </Button>
    </div>
  </div>
);

export default LessonContent;