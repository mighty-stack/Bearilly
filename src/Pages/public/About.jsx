import Card from "../../Components/common/Card";
import PageHeader from "../../Components/common/PageHeader";

const values = [
  "Mobile-first screens for learners who use phones most of the time.",
  "Short lessons with direct next actions.",
  "Admin controls for users, access codes, assessments, and submissions.",
];

const About = () => (
  <section id="about" className="container py-4 py-lg-5">
    <PageHeader
      title="About Bearily"
      subtitle="A simple learning platform for lessons, AI support, tools, and assessments."
    />
    <Card bodyClassName="p-4">
      <p className="lead text-muted-app">
        SkillPath helps learners unlock content with an access code, study in focused flows, ask an AI tutor for help, and submit work for review.
      </p>
      <div className="d-grid gap-3 mt-4">
        {values.map((value) => (
          <div className="d-flex gap-3" key={value}>
            <span className="rounded-circle flex-shrink-0 mt-1" style={{ width: 10, height: 10, background: "var(--secondary-color)" }} />
            <p className="mb-0">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  </section>
);

export default About;