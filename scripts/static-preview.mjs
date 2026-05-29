import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  capabilities,
  documentLinks,
  education,
  experience,
  expertise,
  featuredWork,
  professionalDevelopment,
  tools,
} from "../src/data/portfolio.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 5173);
const host = "127.0.0.1";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function lineLabel(text, className = "") {
  return `<div class="line-label-wrapper ${className}"><span class="t-sans-caps">${escapeHtml(text)}</span></div>`;
}

function renderWorkMedia(project) {
  if (!Array.isArray(project.gallery) || project.gallery.length === 0) {
    return `
      <div class="featured-work-media">
        <img src="${escapeHtml(project.image)}" alt="">
      </div>
    `;
  }

  const [firstImage] = project.gallery;

  return `
    <div class="featured-work-media has-gallery">
      <div class="featured-work-gallery" aria-label="${escapeHtml(project.title)} image gallery" data-gallery>
        <div class="gallery-main">
          <img src="${escapeHtml(firstImage.src)}" alt="${escapeHtml(`${project.title} - ${firstImage.label}`)}" data-gallery-main>
        </div>
        <div class="gallery-thumbnails" aria-label="URBN brand feed gallery">
          ${project.gallery
            .map(
              (item, index) => `
            <button class="gallery-thumb ${index === 0 ? "is-active" : ""}" type="button" aria-label="Show ${escapeHtml(item.label)} feed image" aria-pressed="${index === 0 ? "true" : "false"}" data-gallery-thumb="${escapeHtml(item.src)}" data-gallery-label="${escapeHtml(item.label)}">
              <img src="${escapeHtml(item.src)}" alt="" loading="lazy">
              <span class="gallery-label-text">${escapeHtml(item.shortLabel ?? item.label)}</span>
            </button>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function workSlideshow() {
  const slides = featuredWork;
  return `
    <div class="slideshow work-slideshow" aria-label="Featured Taylor Jones work samples" aria-roledescription="carousel" tabindex="0" data-slideshow>
      <div class="slide-viewport">
        ${slides
          .map(
            (project, index) => `
          <div class="slide ${index === 0 ? "is-active" : ""}" aria-hidden="${index === 0 ? "false" : "true"}">
            <article class="featured-work-slide">
              ${renderWorkMedia(project)}
              <div class="featured-work-copy">
                <div class="pc-meta t-sans-caps">
                  <span>${escapeHtml(project.category)}</span>
                  <span>${escapeHtml(project.year)}</span>
                </div>
                <h3 class="t-h2">${escapeHtml(project.title)}</h3>
                <p class="pc-type t-sans-caps">${escapeHtml(project.type)}</p>
                <p class="t-body">${escapeHtml(project.description)}</p>
              </div>
            </article>
          </div>`,
          )
          .join("")}
      </div>
      ${slideControls(slides)}
    </div>
  `;
}

function slideControls(slides) {
  return `
    <div class="slide-controls">
      <button class="slide-control" type="button" data-slide-prev>
        <span class="sr-only">Previous slide</span>
        <span aria-hidden="true">Prev</span>
      </button>
      <div class="slide-dots" aria-label="Slide navigation">
        ${slides
          .map(
            (slide, index) => `
          <button class="slide-dot ${index === 0 ? "is-active" : ""}" type="button" aria-label="Show slide ${index + 1}: ${escapeHtml(slide.title)}" aria-current="${index === 0 ? "true" : "false"}" data-slide-dot="${index}"></button>`,
          )
          .join("")}
      </div>
      <button class="slide-control" type="button" data-slide-next>
        <span class="sr-only">Next slide</span>
        <span aria-hidden="true">Next</span>
      </button>
    </div>
  `;
}

function projectIndex() {
  return `
    <div class="project-index" aria-label="All work samples">
      ${featuredWork
        .map(
          (project, index) => `
        <a href="${documentLinks.writingPortfolio}" class="project-index-item" target="_blank" rel="noreferrer">
          <span class="cap-num t-sans-caps">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-index-title">${escapeHtml(project.title)}</span>
          <span class="project-index-meta t-sans-caps">${escapeHtml(project.category)} / ${escapeHtml(project.year)}</span>
        </a>`,
        )
        .join("")}
    </div>
  `;
}

function renderPage() {
  const styles = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Taylor Jones | Strategic Communications Leader</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <header class="site-header">
          <a href="#top" class="brand-lockup" aria-label="Taylor Jones home">
            <div class="brand-icon">TJ</div>
            <h1 class="brand-name">Taylor Jones</h1>
            <span class="brand-sub t-sans-caps">Communications & Strategy</span>
          </a>
          <div class="nav-container">
            <nav class="main-nav t-sans-caps" aria-label="Primary navigation">
              <a href="#about">About</a><div class="nav-dot"></div>
              <a href="#work">Work</a><div class="nav-dot"></div>
              <a href="#experience">Experience</a><div class="nav-dot"></div>
              <a href="#resume">Resume</a>
            </nav>
          </div>
        </header>
      </div>

      <main>
        <section class="hero" id="top">
          <div class="container">
            <div class="hero-grid">
              <div class="hero-content">
                ${lineLabel("Portfolio & Profile", "hero-label")}
                <h2 class="t-display">Strategic Marketing<br>& Communications Leader</h2>
                <p class="t-body hero-intro">Taylor Jones builds brand narratives, executive messaging, PR writing, and editorial strategy for organizations that need clear stories, disciplined execution, and culturally aware content.</p>
                <div class="hero-actions">
                  <a href="#work" class="btn-text t-sans-caps">View Work <span aria-hidden="true">-&gt;</span></a>
                  <a href="${documentLinks.resume}" class="btn-text t-sans-caps accent-link" target="_blank" rel="noreferrer">View Resume <span aria-hidden="true">-&gt;</span></a>
                </div>
              </div>
              <div class="hero-visual">
                <figure class="static-hero-portrait">
                  <img src="/assets/taylor-jones.jpg" alt="Taylor Jones professional portrait">
                  <figcaption>
                    <span class="t-sans-caps">Profile</span>
                    <strong>Taylor Jones</strong>
                    <span>Strategic marketing and communications leader with a polished editorial point of view.</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section class="about-section" id="about">
          <div class="container">
            <div class="about-grid">
              <div class="about-label"><span class="t-sans-caps">About Taylor</span></div>
              <div class="about-text">
                <h3 class="t-h2">Orchestrating brand voice with precision, discipline, and cultural nuance.</h3>
                <div class="about-text-columns">
                  <p class="t-body">Taylor is a strategic marketing communications professional with experience driving brand narrative alignment, executive messaging, and cross-channel content strategy within complex organizations.</p>
                  <p class="t-body">Her background pairs communications strategy with Navy-honed leadership, operational excellence, disciplined execution, and cross-functional coordination. She is known for bridging strategy and storytelling across teams.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="work-section" id="work">
          <div class="container">
            <div class="work-header">
              ${lineLabel("Featured Work 2019-2026")}
              <p class="t-body section-intro">Selected writing and strategy samples across editorial culture writing, brand analysis, campaign planning, PR writing, real-world reporting, original concepts, and project pitches.</p>
            </div>
            ${workSlideshow()}
            ${projectIndex()}
          </div>
        </section>

        <section class="capabilities-section" id="expertise">
          <div class="container">
            ${lineLabel("Practice Areas")}
            <ul class="cap-list t-h3">
              ${capabilities
                .map(
                  (item, index) => `
                <li class="cap-item">
                  <span class="cap-num t-sans-caps">${String(index + 1).padStart(2, "0")}</span>
                  <span>${escapeHtml(item.title)}</span>
                  <span class="cap-desc t-body">${escapeHtml(item.description)}</span>
                </li>`,
                )
                .join("")}
            </ul>
          </div>
        </section>

        <section class="experience-section" id="experience">
          <div class="container">
            ${lineLabel("Experience")}
            <div class="experience-list">
              ${experience
                .map(
                  (item) => `
                <article class="experience-item">
                  <div class="experience-meta">
                    <p class="t-sans-caps">${escapeHtml(item.period)}</p>
                    <h3 class="t-h3">${escapeHtml(item.company)}</h3>
                    <p class="experience-role">${escapeHtml(item.role)}</p>
                  </div>
                  <ul class="experience-details t-body">
                    ${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
                  </ul>
                </article>`,
                )
                .join("")}
            </div>
            <p class="t-body additional-experience">Additional brand and retail leadership experience includes Charlotte Russe, ALDO, and Forever 21.</p>
          </div>
        </section>

        <section class="details-section">
          <div class="container details-grid">
            <div>
              ${lineLabel("Skills & Expertise")}
              <div class="tag-grid">${expertise.map((item) => `<span class="detail-tag t-sans-caps">${escapeHtml(item)}</span>`).join("")}</div>
            </div>
            <div>
              ${lineLabel("Tools & Platforms")}
              <div class="tag-grid">${tools.map((item) => `<span class="detail-tag t-sans-caps">${escapeHtml(item)}</span>`).join("")}</div>
            </div>
          </div>
        </section>

        <section class="education-section">
          <div class="container">
            ${lineLabel("Education & Development")}
            <div class="education-grid">
              <div class="info-panel">
                <h3 class="t-h3">Education</h3>
                <ul class="t-body plain-list">${education.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
              <div class="info-panel">
                <h3 class="t-h3">Professional Development</h3>
                <ul class="t-body plain-list">${professionalDevelopment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer" id="resume">
        <div class="container">
          <div class="footer-box">
            <div class="footer-content">
              <div class="brand-icon footer-icon">TJ</div>
              <h2 class="t-h2">Communications that clarify, connect, and move.</h2>
              <p class="t-body footer-copy">For communications, PR, brand strategy, editorial writing, or content strategy opportunities, review Taylor's resume and full writing portfolio.</p>
              <div class="footer-actions">
                <a href="${documentLinks.resume}" class="button-outline t-sans-caps" target="_blank" rel="noreferrer">View Resume</a>
                <a href="${documentLinks.resume}" class="button-outline button-accent t-sans-caps" download>Download Resume</a>
                <a href="${documentLinks.writingPortfolio}" class="button-outline t-sans-caps" target="_blank" rel="noreferrer">View Full Writing Portfolio</a>
              </div>
            </div>
          </div>
          ${lineLabel("Contact", "footer-label")}
          <p class="t-body contact-copy">Let's connect about communications, brand strategy, PR, or editorial opportunities.</p>
          <div class="footer-links t-sans-caps">
            <a href="${documentLinks.email}">Email Inquiries</a>
            <a href="${documentLinks.linkedIn}" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="${documentLinks.writingPortfolio}" target="_blank" rel="noreferrer">Writing Portfolio</a>
          </div>
        </div>
      </footer>
      <script>
        document.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
          const slides = Array.from(slideshow.querySelectorAll(".slide"));
          const dots = Array.from(slideshow.querySelectorAll("[data-slide-dot]"));
          let current = 0;

          function show(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
              const active = slideIndex === current;
              slide.classList.toggle("is-active", active);
              slide.setAttribute("aria-hidden", active ? "false" : "true");
            });
            dots.forEach((dot, dotIndex) => {
              const active = dotIndex === current;
              dot.classList.toggle("is-active", active);
              dot.setAttribute("aria-current", active ? "true" : "false");
            });
          }

          slideshow.querySelector("[data-slide-prev]")?.addEventListener("click", () => show(current - 1));
          slideshow.querySelector("[data-slide-next]")?.addEventListener("click", () => show(current + 1));
          dots.forEach((dot) => dot.addEventListener("click", () => show(Number(dot.dataset.slideDot))));
          slideshow.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") show(current - 1);
            if (event.key === "ArrowRight") show(current + 1);
          });
        });

        document.querySelectorAll("[data-gallery]").forEach((gallery) => {
          const mainImage = gallery.querySelector("[data-gallery-main]");
          const thumbs = Array.from(gallery.querySelectorAll("[data-gallery-thumb]"));

          thumbs.forEach((thumb) => {
            thumb.addEventListener("click", () => {
              if (!mainImage) return;
              mainImage.src = thumb.dataset.galleryThumb;
              mainImage.alt = thumb.getAttribute("aria-label") || "";
              thumbs.forEach((candidate) => {
                const active = candidate === thumb;
                candidate.classList.toggle("is-active", active);
                candidate.setAttribute("aria-pressed", active ? "true" : "false");
              });
            });
          });
        });
      </script>
    </body>
  </html>`;
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);

  if (requestUrl.pathname.startsWith("/assets/")) {
    const assetPath = path.join(root, "public", requestUrl.pathname);
    if (!assetPath.startsWith(path.join(root, "public"))) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    if (!fs.existsSync(assetPath)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const extension = path.extname(assetPath).toLowerCase();
    const contentType =
      extension === ".pdf"
        ? "application/pdf"
        : extension === ".jpg" || extension === ".jpeg"
          ? "image/jpeg"
          : extension === ".png"
            ? "image/png"
          : "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-store" });
    fs.createReadStream(assetPath).pipe(response);
    return;
  }

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  response.end(renderPage());
});

server.listen(port, host, () => {
  console.log(`Taylor Jones portfolio preview running at http://localhost:${port}/`);
});
