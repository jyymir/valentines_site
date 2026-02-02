const innerPolygon = document.getElementById("inner-polygon");
const outer = document.getElementById("outer");
const closeBtn = document.getElementById("close-btn");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");
const heartsRow = document.querySelectorAll(".hearts-row");
const heartBtn = document.getElementById("heart-btn");
const noButton = document.getElementById("no-button");
const gifsFunny = document.getElementById("gifs-funny");
// const gifs = document.querySelectorAll(".floating-gif");
const gifLeft = document.getElementById("gif1");
const gifRight = document.getElementById("gif2");

noButton.addEventListener("mouseover", () => {
  let top = Math.floor(Math.random() * 90);
  let left = Math.floor(Math.random() * 90);

  noButton.style.position = "absolute";
  noButton.style.top = `${top}%`;
  noButton.style.left = `${left}%`;
});

function toggleEnvelope() {
  
  innerPolygon.classList.toggle("inner-open");
  outer.classList.toggle("outer-open");
  heartBtn.classList.toggle("hide");
  closeBtn.classList.toggle("show");
  message1.classList.toggle("hide");
  message2.classList.toggle("show");
  noButton.classList.toggle("hide");
  gifLeft.classList.toggle("show");
  gifRight.classList.toggle("show");

  
  heartsRow.forEach(element => element.classList.toggle("animated"));

  if (closeBtn.classList.contains("show")) {
      closeBtn.style.transform = "scale(1.2)";
      closeBtn.style.transition = "transform 0.5s ease";
  }
  
}

// Function to move the button
function moveNoButton() {
  // We subtract the button size (approx 60px) so it doesn't bleed off the right/bottom
  const maxX = window.innerWidth - 80;
  const maxY = window.innerHeight - 80;

  const newLeft = Math.floor(Math.random() * maxX);
  const newTop = Math.floor(Math.random() * maxY);

  noButton.style.position = "fixed"; // Fixed ensures it moves relative to the whole screen
  noButton.style.left = `${newLeft}px`;
  noButton.style.top = `${newTop}px`;
}

// Trigger move on desktop hover
noButton.addEventListener("mouseover", moveNoButton);

// Trigger move on mobile tap/touch
noButton.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevents the phone from accidentally "clicking" it anyway
  moveNoButton();
});

