import { useState, useEffect } from "react";
import Card from "../../Components/common/Card";
import PageHeader from "../../Components/common/PageHeader";
import { FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Student",
    text: "Bearilly made learning so much easier. The bite-size lessons fit perfectly into my busy schedule, and the AI tutor helped me understand complex concepts instantly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Working Professional",
    text: "I loved how practical the toolkit is. I can quickly access the tools I need without getting lost in complicated menus. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Learner",
    text: "The mobile-first design is perfect for learning on the go. I can complete lessons during my commute and chat with the AI tutor whenever I'm stuck.",
    rating: 4,
  },
  {
    name: "David Martinez",
    role: "Student",
    text: "As someone who struggles with traditional learning, Bearilly's focused approach and AI support have been game-changing for my studies.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  // const paginate = (newDirection) => {
  //   setDirection(newDirection);
  //   setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  // };

  return (
    <section id="testimonials" className="container py-4 py-lg-5">
      <PageHeader
        title="What Our Learners Say"
        subtitle="Hear from real users about their experience with Bearilly"
      />

      <div style={styles.carouselContainer}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={styles.slideWrapper}
          >
            <Card bodyClassName="p-4 h-100" style={styles.testimonialCard}>
              <div className="d-flex gap-1 mb-3">
                {Array(testimonials[currentIndex].rating)
                  .fill(0)
                  .map((_, i) => (
                    <FiStar
                      key={i}
                      size={18}
                      style={{ color: "var(--secondary-color)", fill: "var(--secondary-color)" }}
                      aria-hidden="true"
                    />
                  ))}
              </div>
              <p className="mb-4 text-muted-app" style={styles.testimonialText}>
                "{testimonials[currentIndex].text}"
              </p>
              <div style={styles.divider} />
              <div style={styles.authorSection}>
                <p className="fw-bold mb-1">{testimonials[currentIndex].name}</p>
                <small className="text-muted-app">{testimonials[currentIndex].role}</small>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons
        <div style={styles.navContainer}>
          <button
            onClick={() => paginate(-1)}
            style={styles.navButton}
            aria-label="Previous testimonial"
            title="Previous"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            style={styles.navButton}
            aria-label="Next testimonial"
            title="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div> */}

        {/* Dots Indicator */}
        <div style={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              style={{
                ...styles.dot,
                background: index === currentIndex ? "var(--primary-color)" : "var(--border-color)",
              }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    width: "100%",
    margin: "2rem 0 0 0",
  },
  slideWrapper: {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
  },
  testimonialCard: {
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  testimonialText: {
    fontSize: "1.05rem",
    lineHeight: "1.8",
    fontStyle: "italic",
  },
  divider: {
    height: "1px",
    background: "var(--border-color)",
    margin: "1.5rem 0",
  },
  authorSection: {
    marginTop: "auto",
  },
  navContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  navButton: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "2px solid var(--primary-color)",
    background: "transparent",
    color: "var(--primary-color)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginTop: "10px",
    height: "2px",
  },
  dot: {
    width: "1%",
    height: "2px",
    borderRadius: "100%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
};

export default Testimonials;
