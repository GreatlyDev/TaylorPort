import { useState } from "react";
import {
  capabilities,
  documentLinks,
  education,
  experience,
  expertise,
  featuredWork,
  professionalDevelopment,
  tools,
} from "./data/portfolio.js";

function LineLabel({ children, className = "" }) {
  return (
    <div className={`line-label-wrapper ${className}`}>
      <span className="t-sans-caps">{children}</span>
    </div>
  );
}

function Slideshow({ slides, className = "", label, renderSlide }) {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;
  const goTo = (index) => setCurrent((index + slides.length) % slides.length);

  return (
    <div
      className={`slideshow ${className}`}
      aria-label={label}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(current - 1);
        if (event.key === "ArrowRight") goTo(current + 1);
      }}
    >
      <div className="slide-viewport">
        {slides.map((slide, index) => (
          <div
            className={`slide ${index === current ? "is-active" : ""}`}
            aria-hidden={index !== current}
            key={`${slide.title}-${slide.year ?? index}`}
          >
            {renderSlide(slide, index)}
          </div>
        ))}
      </div>

      <div className="slide-controls">
        <button className="slide-control" type="button" onClick={() => goTo(current - 1)}>
          <span className="sr-only">Previous slide</span>
          <span aria-hidden="true">Prev</span>
        </button>
        <div className="slide-dots" aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button
              className={`slide-dot ${index === current ? "is-active" : ""}`}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === current}
              onClick={() => goTo(index)}
              key={`dot-${slide.title}-${index}`}
            />
          ))}
        </div>
        <button className="slide-control" type="button" onClick={() => goTo(current === lastIndex ? 0 : current + 1)}>
          <span className="sr-only">Next slide</span>
          <span aria-hidden="true">Next</span>
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="container">
      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="Taylor Jones home">
          <div className="brand-icon">TJ</div>
          <h1 className="brand-name">Taylor Jones</h1>
          <span className="brand-sub t-sans-caps">Communications & Strategy</span>
        </a>

        <div className="nav-container">
          <nav className="main-nav t-sans-caps" aria-label="Primary navigation">
            <a href="#about">About</a>
            <div className="nav-dot" />
            <a href="#work">Work</a>
            <div className="nav-dot" />
            <a href="#experience">Experience</a>
            <div className="nav-dot" />
            <a href="#resume">Resume</a>
          </nav>
        </div>
      </header>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <LineLabel className="hero-label">Portfolio & Profile</LineLabel>
            <h2 className="t-display" aria-label="Strategic Marketing & Communications Leader">
              Strategic Marketing
              <br />
              & Communications Leader
            </h2>
            <p className="t-body hero-intro">
              Taylor Jones builds brand narratives, executive messaging, PR writing, and
              editorial strategy for organizations that need clear stories, disciplined
              execution, and culturally aware content.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn-text t-sans-caps">
                View Work <span aria-hidden="true">-&gt;</span>
              </a>
              <a href={documentLinks.resume} className="btn-text t-sans-caps accent-link" target="_blank" rel="noreferrer">
                View Resume <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <figure className="static-hero-portrait">
              <img src="/assets/taylor-jones.jpg" alt="Taylor Jones professional portrait" />
              <figcaption>
                <span className="t-sans-caps">Profile</span>
                <strong>Taylor Jones</strong>
                <span>Strategic marketing and communications leader with a polished editorial point of view.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-label">
            <span className="t-sans-caps">About Taylor</span>
          </div>
          <div className="about-text">
            <h3 className="t-h2">
              Orchestrating brand voice with precision, discipline, and cultural nuance.
            </h3>
            <div className="about-text-columns">
              <p className="t-body">
                Taylor is a strategic marketing communications professional with experience
                driving brand narrative alignment, executive messaging, and cross-channel
                content strategy within complex organizations.
              </p>
              <p className="t-body">
                Her background pairs communications strategy with Navy-honed leadership,
                operational excellence, disciplined execution, and cross-functional coordination.
                She is known for bridging strategy and storytelling across teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const staggerClass = index % 2 === 1 ? "project-card-staggered" : "";
  return (
    <article className={`project-card ${staggerClass}`}>
      <div className="pc-visual">
        <div className="pc-frame" />
        <div className="pc-image-wrapper">
          <img src={project.image} alt="" loading="lazy" />
        </div>
      </div>
      <div className="pc-meta t-sans-caps">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="pc-title t-h3">{project.title}</h3>
      <p className="pc-type t-sans-caps">{project.type}</p>
      <p className="pc-desc t-body">{project.description}</p>
      <a href={documentLinks.writingPortfolio} className="btn-text t-sans-caps" target="_blank" rel="noreferrer">
        View in Portfolio
      </a>
    </article>
  );
}

function Work() {
  return (
    <section className="work-section" id="work">
      <div className="container">
        <div className="work-header">
          <LineLabel>Featured Work 2019-2026</LineLabel>
          <p className="t-body section-intro">
            Selected writing and strategy samples across editorial culture writing, brand
            analysis, campaign planning, PR writing, real-world reporting, original concepts,
            and project pitches.
          </p>
        </div>

        <Slideshow
          slides={featuredWork}
          className="work-slideshow"
          label="Featured Taylor Jones work samples"
          renderSlide={(project) => (
            <article className="featured-work-slide">
              <div className="featured-work-media">
                <img src={project.image} alt="" />
              </div>
              <div className="featured-work-copy">
                <div className="pc-meta t-sans-caps">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="t-h2">{project.title}</h3>
                <p className="pc-type t-sans-caps">{project.type}</p>
                <p className="t-body">{project.description}</p>
              </div>
            </article>
          )}
        />

        <div className="project-index" aria-label="All work samples">
          {featuredWork.map((project, index) => (
            <a
              href={documentLinks.writingPortfolio}
              className="project-index-item"
              target="_blank"
              rel="noreferrer"
              key={project.title}
            >
              <span className="cap-num t-sans-caps">{String(index + 1).padStart(2, "0")}</span>
              <span className="project-index-title">{project.title}</span>
              <span className="project-index-meta t-sans-caps">
                {project.category} / {project.year}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="capabilities-section" id="expertise">
      <div className="container">
        <LineLabel>Practice Areas</LineLabel>
        <ul className="cap-list t-h3">
          {capabilities.map((capability, index) => (
            <li className="cap-item" key={capability.title}>
              <span className="cap-num t-sans-caps">{String(index + 1).padStart(2, "0")}</span>
              <span>{capability.title}</span>
              <span className="cap-desc t-body">{capability.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <LineLabel>Experience</LineLabel>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={`${item.company}-${item.role}`}>
              <div className="experience-meta">
                <p className="t-sans-caps">{item.period}</p>
                <h3 className="t-h3">{item.company}</h3>
                <p className="experience-role">{item.role}</p>
              </div>
              <ul className="experience-details t-body">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="t-body additional-experience">
          Additional brand and retail leadership experience includes Charlotte Russe, ALDO,
          and Forever 21.
        </p>
      </div>
    </section>
  );
}

function DetailColumns() {
  return (
    <section className="details-section">
      <div className="container details-grid">
        <div>
          <LineLabel>Skills & Expertise</LineLabel>
          <div className="tag-grid">
            {expertise.map((item) => (
              <span className="detail-tag t-sans-caps" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <LineLabel>Tools & Platforms</LineLabel>
          <div className="tag-grid">
            {tools.map((item) => (
              <span className="detail-tag t-sans-caps" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education-section">
      <div className="container">
        <LineLabel>Education & Development</LineLabel>
        <div className="education-grid">
          <div className="info-panel">
            <h3 className="t-h3">Education</h3>
            <ul className="t-body plain-list">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-panel">
            <h3 className="t-h3">Professional Development</h3>
            <ul className="t-body plain-list">
              {professionalDevelopment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="resume">
      <div className="container">
        <div className="footer-box">
          <div className="footer-content">
            <div className="brand-icon footer-icon">TJ</div>
            <h2 className="t-h2">Communications that clarify, connect, and move.</h2>
            <p className="t-body footer-copy">
              For communications, PR, brand strategy, editorial writing, or content strategy
              opportunities, review Taylor's resume and full writing portfolio.
            </p>
            <div className="footer-actions">
              <a href={documentLinks.resume} className="button-outline t-sans-caps" target="_blank" rel="noreferrer">
                View Resume
              </a>
              <a href={documentLinks.resume} className="button-outline button-accent t-sans-caps" download>
                Download Resume
              </a>
              <a
                href={documentLinks.writingPortfolio}
                className="button-outline t-sans-caps"
                target="_blank"
                rel="noreferrer"
              >
                View Full Writing Portfolio
              </a>
            </div>
          </div>
        </div>

        <LineLabel className="footer-label">Contact</LineLabel>
        <p className="t-body contact-copy">
          Let's connect about communications, brand strategy, PR, or editorial opportunities.
        </p>

        <div className="footer-links t-sans-caps">
          <a href={documentLinks.email}>Email Inquiries</a>
          <a href={documentLinks.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={documentLinks.writingPortfolio} target="_blank" rel="noreferrer">
            Writing Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Capabilities />
        <Experience />
        <DetailColumns />
        <Education />
      </main>
      <Footer />
    </>
  );
}
