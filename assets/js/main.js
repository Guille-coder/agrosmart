const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  localStorage.setItem("userEmail", email);

  window.location.href = "dashboard.html";
});