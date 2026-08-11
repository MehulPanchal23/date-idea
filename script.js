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

// The NO button dodges around the invitation, but ALWAYS stays inside
// the visible invitation card / viewport. It also uses the same pink
// background as the YES button.
const noBtn = document.getElementById("tryBtn");
let noMoveTimer = null;

function moveNoButton() {
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "10000";
  noBtn.style.visibility = "visible";
  noBtn.style.display = "inline-flex";
  noBtn.style.alignItems = "center";
  noBtn.style.justifyContent = "center";
  noBtn.style.textAlign = "center";

  const buttonRect = noBtn.getBoundingClientRect();
  const buttonWidth = Math.max(buttonRect.width, 130);
  const buttonHeight = Math.max(buttonRect.height, 58);

  // Prefer the main invitation card as the movement boundary.
  const card = noBtn.closest(".card");
  const cardRect = card
    ? card.getBoundingClientRect()
    : {
        left: 0,
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      };

  const margin = 24;

  // Keep the entire button inside the card.
  const minX = Math.max(8, cardRect.left + margin);
  const minY = Math.max(8, cardRect.top + margin);
  const maxX = Math.min(
    window.innerWidth - buttonWidth - 8,
    cardRect.right - buttonWidth - margin
  );
  const maxY = Math.min(
    window.innerHeight - buttonHeight - 8,
    cardRect.bottom - buttonHeight - margin
  );

  if (maxX <= minX || maxY <= minY) {
    // Fallback for very small/mobile layouts: keep it inside viewport.
    noBtn.style.left = `${Math.max(8, (window.innerWidth - buttonWidth) / 2)}px`;
    noBtn.style.top = `${Math.max(8, (window.innerHeight - buttonHeight) / 2)}px`;
    return;
  }

  const yesBtn = document.getElementById("yesBtn");
  const yesRect = yesBtn.getBoundingClientRect();

  let x = minX;
  let y = minY;

  // Pick a position that doesn't overlap YES.
  for (let i = 0; i < 60; i++) {
    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);

    const gap = 32;
    const overlapsYes =
      x < yesRect.right + gap &&
      x + buttonWidth > yesRect.left - gap &&
      y < yesRect.bottom + gap &&
      y + buttonHeight > yesRect.top - gap;

    if (!overlapsYes) break;
  }

  // Clamp one final time so it can NEVER leave the boundary.
  x = Math.max(minX, Math.min(x, maxX));
  y = Math.max(minY, Math.min(y, maxY));

  noBtn.style.left = `${Math.round(x)}px`;
  noBtn.style.top = `${Math.round(y)}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
}

function isPointerNearNoButton(event) {
  const rect = noBtn.getBoundingClientRect();
  const padding = 55;

  return (
    event.clientX >= rect.left - padding &&
    event.clientX <= rect.right + padding &&
    event.clientY >= rect.top - padding &&
    event.clientY <= rect.bottom + padding
  );
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("pointerenter", moveNoButton);

document.addEventListener("pointermove", (event) => {
  if (isPointerNearNoButton(event)) {
    clearTimeout(noMoveTimer);
    noMoveTimer = setTimeout(moveNoButton, 10);
  }
});

noBtn.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

window.addEventListener("resize", () => {
  if (noBtn.style.position === "fixed") {
    moveNoButton();
  }
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
