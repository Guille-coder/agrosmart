window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    localStorage.setItem("userEmail", email);

    window.location.href = "dashboard.html";
  });
}