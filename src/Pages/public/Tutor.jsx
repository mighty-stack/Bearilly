import Card from "../../Components/common/Card";
import PageHeader from "../../Components/common/PageHeader";
import { FiMessageCircle, FiClock, FiZap } from "react-icons/fi";

const tutorFeatures = [
  {
    title: "Ask Questions Anytime",
    text: "Get instant answers from your AI tutor while studying. Never get stuck on difficult concepts.",
    icon: FiMessageCircle,
  },
  {
    title: "Simple Explanations",
    text: "Complex topics broken down into easy-to-understand language tailored to your learning pace.",
    icon: FiZap,
  },
  {
    title: "Always Available",
    text: "Study on your own schedule. Your AI tutor is available 24/7 whenever you need support.",
    icon: FiClock,
  },
];

const Tutor = () => (
  <section id="tutor" className="container py-4 py-lg-5">
    <PageHeader
      title="Meet Your AI Tutor"
      subtitle="Personalized learning support available whenever you need it"
    />
    
    <div className="row align-items-center g-4 mb-5">
      <div className="col-12 col-lg-6">
        <Card bodyClassName="p-4" style={{ background: "linear-gradient(135deg, rgba(36,138,142,.1) 0%, rgba(36,138,142,.05) 100%)" }}>
          <div className="text-center">
            <FiMessageCircle size={56} style={{ color: "var(--primary-color)" }} aria-hidden="true" />
            <h2 className="h4 fw-bold mt-3 mb-3">How It Works</h2>
            <div className="text-start" style={{ maxWidth: "400px", margin: "0 auto" }}>
              <div className="d-flex gap-3 mb-4">
                <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center fw-bold" 
                     style={{ width: 40, height: 40, background: "var(--primary-color)", color: "white" }}>
                  1
                </div>
                <div>
                  <h4 className="h6 fw-bold mb-1">Start Learning</h4>
                  <p className="small text-muted-app mb-0">Work through bite-size lessons at your own pace</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center fw-bold" 
                     style={{ width: 40, height: 40, background: "var(--primary-color)", color: "white" }}>
                  2
                </div>
                <div>
                  <h4 className="h6 fw-bold mb-1">Ask Questions</h4>
                  <p className="small text-muted-app mb-0">Type your questions and get instant answers</p>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center fw-bold" 
                     style={{ width: 40, height: 40, background: "var(--primary-color)", color: "white" }}>
                  3
                </div>
                <div>
                  <h4 className="h6 fw-bold mb-1">Master Concepts</h4>
                  <p className="small text-muted-app mb-0">Understand topics better with guided explanations</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="col-12 col-lg-6">
        <div className="d-grid gap-3">
          {tutorFeatures.map(({ title, text, icon: Icon }) => (
            <Card bodyClassName="p-4" key={title}>
              <div className="d-flex gap-3">
                <Icon size={28} style={{ color: "var(--primary-color)", flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <h3 className="h6 fw-bold mb-2">{title}</h3>
                  <p className="text-muted-app mb-0 small">{text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Tutor;
