const userEmail = localStorage.getItem("userEmail");
const welcomeMessage = document.getElementById("welcomeMessage");

if (userEmail) {
  welcomeMessage.textContent = `Logged in as: ${userEmail}`;
} else {
  window.location.href = "index.html";
}