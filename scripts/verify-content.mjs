import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "index.html",
  "package.json",
  "src/App.jsx",
  "src/main.jsx",
  "src/styles.css",
  "src/data/portfolio.js",
  "public/assets/taylor-jones.jpg",
  "public/assets/taylor-resume.pdf",
  "public/assets/taylor-writing-portfolio.pdf",
  "public/assets/work/final-softgirl-era-card.jpg",
  "public/assets/work/final-neon-springs-card.jpg",
  "public/assets/work/final-blackwood-card.jpg",
  "public/assets/work/final-fenty-kylie-comp-card.jpg",
  "public/assets/work/final-kiaros-logo-card.jpg",
  "public/assets/work/final-spotify-be-you-card.jpg",
  "public/assets/work/final-claires-adventure-card.jpg",
  "public/assets/work/final-eboni-envete-card.jpg",
  "public/assets/work/final-urban-cblue-card.jpg",
  "public/assets/work/original-softgirl-era.png",
  "public/assets/work/original-neon-springs.png",
  "public/assets/work/original-blackwood.png",
  "public/assets/work/original-fenty-kylie-comp.png",
  "public/assets/work/original-kiaros-logo.png",
  "public/assets/work/original-spotify-be-you.png",
  "public/assets/work/original-claires-adventure.png",
  "public/assets/work/original-eboni-envete.png",
  "public/assets/work/original-urban-cblue.png",
  "public/assets/work/urbn-feed-1.png",
  "public/assets/work/urbn-feed-2.png",
  "public/assets/work/urbn-feed-3.png",
  "public/assets/work/urbn-feed-4.png",
  "public/assets/work/urbn-feed-5.png",
];

const requiredText = [
  "Taylor Jones",
  "Strategic Marketing & Communications Leader",
  "The Soft Power Era",
  "Neon Spring? Kylie Jenner Approved?!",
  "Brandon Blackwood",
  "Fenty Skin & Kylie Skin Audit",
  "Kairos Atlas Press Release",
  "Spotify",
  "Claire",
  "Eboni Env",
  "The Cerulean Edit",
  "The Cerulean Edit That's All",
  "Curated Feeds for URBN Brands",
  "Urban Outfitters, Nuuly, Anthropologie, and Free People",
  "U.S. Customs and Border Protection",
  "U.S. Navy",
  "Fashion Institute of Technology",
  "English",
  "Economics",
  "Fashion History Theory & Culture",
  "View Resume",
  "View Full Writing Portfolio",
  "https://www.linkedin.com/in/taylormcjones/",
  "mailto:taylorjones114@gmail.com",
];

const missingFiles = requiredFiles.filter((file) => {
  return !fs.existsSync(path.join(root, file));
});

if (missingFiles.length > 0) {
  console.error(`Missing required files:\n${missingFiles.join("\n")}`);
  process.exit(1);
}

const appText = [
  fs.readFileSync(path.join(root, "src/App.jsx"), "utf8"),
  fs.readFileSync(path.join(root, "src/data/portfolio.js"), "utf8"),
  fs.readFileSync(path.join(root, "src/styles.css"), "utf8"),
].join("\n");

const missingText = requiredText.filter((text) => !appText.includes(text));

if (missingText.length > 0) {
  console.error(`Missing required Taylor content:\n${missingText.join("\n")}`);
  process.exit(1);
}

if (appText.includes("images.unsplash.com")) {
  console.error("Project cards must use Taylor portfolio images, not Unsplash placeholders.");
  process.exit(1);
}

for (const removedClass of ["hv-solid-block", "hv-hollow-frame"]) {
  if (appText.includes(removedClass)) {
    console.error(`Remove distracting portrait frame class: ${removedClass}`);
    process.exit(1);
  }
}

if (appText.includes("hero-slideshow")) {
  console.error("Hero should use a static profile image, not a slideshow.");
  process.exit(1);
}

for (const requiredSlideshowClass of ["static-hero-portrait", "work-slideshow", "slide-control"]) {
  if (!appText.includes(requiredSlideshowClass)) {
    console.error(`Missing slideshow UI marker: ${requiredSlideshowClass}`);
    process.exit(1);
  }
}

for (const galleryMarker of ["WorkGallery", "featured-work-gallery", "gallery: ["]) {
  if (!appText.includes(galleryMarker)) {
    console.error(`Missing URBN gallery marker: ${galleryMarker}`);
    process.exit(1);
  }
}

for (const galleryQualityMarker of [
  '{ src: "/assets/work/urbn-feed-1.png", label: "Anthropologie", shortLabel: "Anthro" }',
  '{ src: "/assets/work/urbn-feed-2.png", label: "Nuuly", shortLabel: "Nuuly" }',
  '{ src: "/assets/work/urbn-feed-4.png", label: "URBN brand overview", shortLabel: "URBN" }',
  '{ src: "/assets/work/urbn-feed-5.png", label: "Urban Outfitters", shortLabel: "UO" }',
  "object-fit: contain;",
  "white-space: nowrap;",
]) {
  if (!appText.includes(galleryQualityMarker)) {
    console.error(`URBN gallery needs cleaner full-image display/labels: ${galleryQualityMarker}`);
    process.exit(1);
  }
}

if (appText.indexOf('shortLabel: "UO"') > appText.indexOf('shortLabel: "URBN"')) {
  console.error("URBN gallery should end with the all-brand URBN overview image.");
  process.exit(1);
}

const curatedFeedsBlock = appText.match(/title: "Curated Feeds for URBN Brands"[\s\S]*?description:/)?.[0] ?? "";
if (!curatedFeedsBlock.includes('year: "2024"')) {
  console.error("Curated Feeds for URBN Brands should use 2024 as its year.");
  process.exit(1);
}

const appSource = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
const previewSource = fs.readFileSync(path.join(root, "scripts/static-preview.mjs"), "utf8");

if (appSource.includes("View in Full Portfolio") || previewSource.includes("View in Full Portfolio")) {
  console.error("Featured slideshow slides should not include a View in Full Portfolio link.");
  process.exit(1);
}

if (!appSource.includes("href={documentLinks.linkedIn}") || !appSource.includes('target="_blank"')) {
  console.error("React LinkedIn footer link must open in a new tab.");
  process.exit(1);
}

if (!previewSource.includes('href="${documentLinks.linkedIn}" target="_blank"')) {
  console.error("Static preview LinkedIn footer link must open in a new tab.");
  process.exit(1);
}

if (!previewSource.includes("renderWorkMedia") || !previewSource.includes("data-gallery-thumb")) {
  console.error("Static preview should render the URBN mini-gallery thumbnails.");
  process.exit(1);
}

for (const projectJumpMarker of ["currentProject", "data-project-jump", ".project-index-item.is-active"]) {
  if (!appText.includes(projectJumpMarker) && !previewSource.includes(projectJumpMarker)) {
    console.error(`Project index should control the slideshow instead of opening the PDF: ${projectJumpMarker}`);
    process.exit(1);
  }
}

const workImageMatches = appText.match(/image:\s*"\/assets\/work\//g) ?? [];
if (workImageMatches.length < 10) {
  console.error(`Expected 10 local work-card images, found ${workImageMatches.length}.`);
  process.exit(1);
}

const finalWorkImageMatches = appText.match(/image:\s*"\/assets\/work\/final-/g) ?? [];
if (finalWorkImageMatches.length > 0) {
  console.error("Work slideshow should use original supplied images, not padded final card images.");
  process.exit(1);
}

const originalWorkImageMatches = appText.match(/image:\s*"\/assets\/work\/original-/g) ?? [];
if (originalWorkImageMatches.length < 9) {
  console.error(`Expected 9 original supplied slideshow images, found ${originalWorkImageMatches.length}.`);
  process.exit(1);
}

const urbnGalleryMatches = appText.match(/src:\s*"\/assets\/work\/urbn-feed-/g) ?? [];
if (urbnGalleryMatches.length < 5) {
  console.error(`Expected 5 URBN gallery images, found ${urbnGalleryMatches.length}.`);
  process.exit(1);
}

if (appSource.includes("featuredWork.slice")) {
  console.error("Work slideshow should include all final project images, not a slice.");
  process.exit(1);
}

if (previewSource.includes("featuredWork.slice")) {
  console.error("Static preview work slideshow should include all final project images, not a slice.");
  process.exit(1);
}

if (appText.includes("The Cerulean Edit. That Is All.")) {
  console.error("Cerulean project title should use the updated wording.");
  process.exit(1);
}

if (!appText.includes("aspect-ratio: 4 / 3;") || !appText.includes("height: 100%;") || !appText.includes("object-position: center;")) {
  console.error("Featured slideshow images should fill the whole media panel.");
  process.exit(1);
}

if (!appText.includes(".work-slideshow .slide-viewport") || !appText.includes("height: clamp(620px, 58vw, 760px);")) {
  console.error("Work slideshow viewport should reserve a stable height so controls do not jump between slides.");
  process.exit(1);
}

console.log("Taylor portfolio content verification passed.");
