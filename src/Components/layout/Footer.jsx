import { Link } from "react-router-dom";
import { FiMail, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Home", href: "/" },
        { label: "Learning", href: "/app/learning" },
        { label: "AI Tutor", href: "/app/ai-tutor" },
        { label: "Toolkit", href: "/app/toolkit" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "Access Code", href: "/access-code" },
        { label: "Profile", href: "/app/profile" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Bearilly", href: "/#about" },
        { label: "Our Tutor", href: "/#tutor" },
        { label: "Testimonials", href: "/#testimonials" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiMail, href: "#", label: "Email" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiGithub, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="footer" style={styles.footer}>
      <div className="container py-5">
        {/* Footer Grid - 4 columns (3 link sections + brand/social) */}
        <div className="row g-4 mb-5 mt-3">
          {footerSections.map((section) => (
            <div className="col-12 col-sm-6 col-lg-3" key={section.title}>
              <h4 style={styles.sectionTitle}>{section.title}</h4>
              <ul style={styles.linkList}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} style={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Brand / Social - rightmost column */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div style={styles.brandSection}>
              <h3 style={styles.brandName}>Bearilly</h3>
              <p style={styles.brandText}>
                Learn skills in simple daily steps with bite-size lessons, AI support, and practical tools.
              </p>

              <div style={styles.socialContainer}>
                <div style={styles.socialLinks}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      style={styles.socialIcon}
                      title={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright / Powered by - left aligned */}
        <div style={styles.copyrightContainer}>
          <p style={styles.copyright}>
            Powered by Bearilly
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, var(--background-color) 0%, rgba(36, 138, 142, 0.05) 100%)",
    borderTop: "1px solid var(--border-color)",
    marginTop: "auto",
  },
  brandRow: {
    borderBottom: "2px solid var(--border-color)",
    paddingBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--text-dark)",
    marginBottom: "1.25rem",
    letterSpacing: "0.5px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.9rem",
    display: "inline-block",
    padding: "0.5rem 0",
    transition: "all 0.3s ease",
  },
  divider: {
    height: "1px",
    background: "var(--border-color)",
    margin: "1.5rem 0",
  },
  brandSection: {
    marginBottom: "1.5rem",
    paddingRight: "2rem",
  },
  brandName: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "var(--primary-color)",
    marginBottom: "1rem",
  },
  brandText: {
    color: "var(--text-muted)",
    fontSize: "0.95rem",
    marginBottom: 0,
    lineHeight: 1.7,
  },
  socialContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
    flexDirection: "column",
  },
  followText: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--text-dark)",
    whiteSpace: "nowrap",
  },
  socialLinks: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  socialIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(36, 138, 142, 0.1)",
    color: "var(--primary-color)",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  copyrightContainer: {
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: "1px solid var(--border-color)",
    textAlign: "center",
  },
  copyright: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    margin: 0,
  },
};

export default Footer;