import Card from "../common/Card";

const AdminStats = ({ stats = [] }) => (
  <div className="row g-3">
    {stats.map((stat) => (
      <div className="col-6 col-xl-3" key={stat.label}>
        <Card>
          <p className="small text-muted-app mb-1">{stat.label}</p>
          <h2 className="h3 fw-bold mb-0">{stat.value}</h2>
        </Card>
      </div>
    ))}
  </div>
);

export default AdminStats;