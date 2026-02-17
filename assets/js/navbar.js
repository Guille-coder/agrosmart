const toggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (toggleBtn && navLinks) {

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleBtn.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggleBtn.classList.remove("active");
    });
  });

}
// ===== Active Page Indicator =====

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
// ===== Page Fade In =====
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});