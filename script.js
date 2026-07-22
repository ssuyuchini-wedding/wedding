const opening = document.getElementById("opening");
const openingHint = document.querySelector(".opening-hint");
const hero = document.getElementById("hero");
function openDoors() {
   openingHint.style.display = "none";
   opening.classList.add("is-open");
   // 開門時，後面的文字開始依序出現
   hero.classList.add("hero-visible");
   setTimeout(() => {
       opening.style.display = "none";
   }, 1450);
}
opening.addEventListener("click", openDoors);
const weddingDate = new Date(2027, 1, 28, 17, 30, 0);
const daysElement = document.getElementById("countdown-days");
const hoursElement = document.getElementById("countdown-hours");
const minutesElement = document.getElementById("countdown-minutes");
const secondsElement = document.getElementById("countdown-seconds");
function updateCountdown() {
   if (
       !daysElement ||
       !hoursElement ||
       !minutesElement ||
       !secondsElement
   ) {
       console.error("Countdown elements were not found.");
       return;
   }
   const difference = weddingDate.getTime() - Date.now();
   if (difference <= 0) {
       daysElement.textContent = "000";
       hoursElement.textContent = "00";
       minutesElement.textContent = "00";
       secondsElement.textContent = "00";
       return;
   }
   const days = Math.floor(difference / (1000 * 60 * 60 * 24));
   const hours = Math.floor(
       (difference / (1000 * 60 * 60)) % 24
   );
   const minutes = Math.floor(
       (difference / (1000 * 60)) % 60
   );
   const seconds = Math.floor(
       (difference / 1000) % 60
   );
   daysElement.textContent = String(days).padStart(3, "0");
   hoursElement.textContent = String(hours).padStart(2, "0");
   minutesElement.textContent = String(minutes).padStart(2, "0");
   secondsElement.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
/* =========================
  背景隨機小光點
========================= */
function createBackgroundSparkle() {
   // 開門前不產生光點
   if (!hero.classList.contains("hero-visible")) {
       return;
   }
   const sparkle = document.createElement("span");
   sparkle.classList.add("sparkle");
   // 隨機出現在畫面中
   sparkle.style.left = `${Math.random() * 100}vw`;
   sparkle.style.top = `${Math.random() * 100}vh`;
   // 每顆大小稍微不同
   const size = Math.random() * 2.5 + 1.5;
   sparkle.style.width = `${size}px`;
   sparkle.style.height = `${size}px`;
   // 每顆動畫速度稍微不同
   sparkle.style.animationDuration =
       `${Math.random() * 2 + 2.5}s`;
   document.body.appendChild(sparkle);
   setTimeout(() => {
       sparkle.remove();
   }, 5000);
}
// 每 350 毫秒產生一顆
setInterval(createBackgroundSparkle, 350);

/* =========================
  點擊出現囍和小光點
========================= */
function createClickEffect(event) {
   // 開門前不要觸發，避免影響開門
   if (!hero.classList.contains("hero-visible")) {
       return;
   }
   const x = event.clientX;
   const y = event.clientY;
   // 建立金色囍
   const xi = document.createElement("span");
   xi.classList.add("click-xi");
   xi.textContent = "囍";
   xi.style.left = `${x}px`;
   xi.style.top = `${y}px`;
   document.body.appendChild(xi);
   setTimeout(() => {
       xi.remove();
   }, 1200);
   // 建立周圍的小光點
   for (let i = 0; i < 8; i++) {
       const dot = document.createElement("span");
       dot.classList.add("click-sparkle");
       dot.style.left = `${x}px`;
       dot.style.top = `${y}px`;
       const angle = Math.random() * Math.PI * 2;
       const distance = Math.random() * 35 + 18;
       const moveX = Math.cos(angle) * distance;
       const moveY = Math.sin(angle) * distance;
       dot.style.setProperty("--move-x", `${moveX}px`);
       dot.style.setProperty("--move-y", `${moveY}px`);
       const size = Math.random() * 3 + 2;
       dot.style.width = `${size}px`;
       dot.style.height = `${size}px`;
       document.body.appendChild(dot);
       setTimeout(() => {
           dot.remove();
       }, 1000);
   }
}
document.addEventListener("click", createClickEffect);