import { FiBell, FiMenu, FiUser } from "react-icons/fi";
import Button from "../common/Button";

const Navbar = ({ title = "Learning App", user, onMenuClick, onProfileClick }) => (
  <header className="bg-white border-bottom sticky-top">
    <div className="container-fluid py-2">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2">
          <Button variant="ghost" className="d-lg-none px-2" icon={FiMenu} onClick={onMenuClick}>
            <span className="visually-hidden">Menu</span>
          </Button>
          <strong className="fs-5 text-truncate">{title}</strong>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button variant="ghost" className="px-2" icon={FiBell}>
            <span className="visually-hidden">Notifications</span>
          </Button>
          <button className="btn d-flex align-items-center gap-2 p-1" type="button" onClick={onProfileClick}>
            <span className="d-none d-sm-inline fw-semibold">{user?.name || "Student"}</span>
            <span className="rounded-circle bg-light border d-inline-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
              <FiUser aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;