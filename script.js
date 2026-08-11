const pages = {
  question: document.getElementById("page-question"),
  details: document.getElementById("page-details"),
  food: document.getElementById("page-food"),
  success: document.getElementById("page-success")
};

let selectedFood = "Italian";

function showPage(name) {
  Object.values(pages).forEach(page => page.classList.remove("active"));
  pages[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("yesBtn").addEventListener("click", () => {
  showPage("details");
});

const tryBtn = document.getElementById("tryBtn");
tryBtn.addEventListener("click", () => {
  tryBtn.classList.remove("shake");
  void tryBtn.offsetWidth;
  tryBtn.classList.add("shake");
  tryBtn.textContent = "Are you sure? 😌";
  setTimeout(() => tryBtn.textContent = "Try again", 1100);
});

document.getElementById("foodNext").addEventListener("click", () => {
  showPage("food");
});

document.getElementById("backBtn").addEventListener("click", () => {
  showPage("details");
});

document.querySelectorAll(".food-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".food-option").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    selectedFood = button.dataset.food;
  });
});

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

document.getElementById("dateBtn").addEventListener("click", () => {
  const date = document.getElementById("dateInput").value;
  const time = document.getElementById("timeInput").value;
  const plan = document.getElementById("planInput").value.trim() || "A surprise date";

  document.getElementById("finalDate").textContent = formatDate(date);
  document.getElementById("finalTime").textContent = formatTime(time);
  document.getElementById("finalPlan").textContent = plan;
  document.getElementById("finalFood").textContent =
    selectedFood === "You Pick" ? "You Pick 💕" : selectedFood + " 🍽️";

  showPage("success");
  launchConfetti();
});

document.getElementById("changePlan").addEventListener("click", () => {
  showPage("details");
});

function launchConfetti() {
  const container = document.querySelector(".hearts");
  container.innerHTML = "";
  const symbols = ["♥", "❤", "🌹", "✦", "•"];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");
    piece.className = "heart-particle";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.fontSize = `${12 + Math.random() * 18}px`;
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = "", 4200);
}
