const opening = document.getElementById("opening");
const openingHint = document.querySelector(".opening-hint");
const hero = document.getElementById("hero");
function openDoors() {
    // 一定先回到最上面
   window.scrollTo({
       top: 0,
       behavior: "auto"
   });
   openingHint.style.display = "none";
   opening.classList.add("is-open");
   hero.classList.add("hero-visible");
   setTimeout(() => {
       opening.style.display = "none";
       // 門打開後才允許滑動
       document.body.classList.remove("no-scroll");
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
   let x, y;
do {
   x = Math.random() * 100;
   y = Math.random() * 100;
} while (
   x > 35 && x < 65 &&
   y > 25 && y < 70
);
sparkle.style.left = `${x}vw`;
sparkle.style.top  = `${y}vh`;
   // 每顆大小稍微不同
   const r = Math.random();
   let size;
   if (r < 0.75) {
   size = Math.random() * 2 + 1.5;      // 小光點
} else if (r < 0.97) {
   size = Math.random() * 2 + 3.5;        // 中光點
} else {
   size = Math.random() * 2 + 5.5;        // 少數大光球
}
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
// 每 280 毫秒產生一顆
setInterval(createBackgroundSparkle, 280);

/* =========================
  點擊出現囍和小光點
========================= */
function createClickEffect(event) {
   // 開門前不觸發
   if (!hero.classList.contains("hero-visible")) {
       return;
   }
   const x = event.clientX;
   const y = event.clientY;
   // 每次隨機出現 2 或 3 個囍
   const xiCount = Math.floor(Math.random() * 2) + 2;
   for (let i = 0; i < xiCount; i++) {
       const xi = document.createElement("span");
       xi.classList.add("click-xi");
       xi.textContent = "囍";
       // 每個囍不要完全重疊
       const offsetX = Math.random() * 50 - 25;
       const offsetY = Math.random() * 40 - 20;
       xi.style.left = `${x + offsetX}px`;
       xi.style.top = `${y + offsetY}px`;
       // 每個囍大小不同
       const size = Math.random() * 6 + 14;
       xi.style.fontSize = `${size}px`;
       // 每個囍稍微錯開出現
       xi.style.animationDelay = `${i * 0.08}s`;
       const xiMoveX = Math.random() * 50 - 25;
       const xiMoveY = -(Math.random() * 35 + 20);
       const xiRotate = Math.random() * 20 - 10;
       xi.style.setProperty("--xi-x", `${xiMoveX}px`);
       xi.style.setProperty("--xi-y", `${xiMoveY}px`);
       xi.style.setProperty("--xi-rotate", `${xiRotate}deg`);
       document.body.appendChild(xi);
       setTimeout(() => {
           xi.remove();
       }, 1400);
   }
   // 點擊周圍的大光點
   for (let i = 0; i < 14; i++) {
       const dot = document.createElement("span");
       dot.classList.add("click-sparkle");
       dot.style.left = `${x}px`;
       dot.style.top = `${y}px`;
       const angle = Math.random() * Math.PI * 2;
       const distance = Math.random() * 55 + 25;
       const moveX = Math.cos(angle) * distance;
       const moveY = Math.sin(angle) * distance;
       dot.style.setProperty("--move-x", `${moveX}px`);
       dot.style.setProperty("--move-y", `${moveY}px`);
       // 4–8px
       const size = Math.random() * 4 + 4;
       dot.style.width = `${size}px`;
       dot.style.height = `${size}px`;
       // 不要所有光點同時消失
       dot.style.animationDuration =
           `${Math.random() * 0.4 + 0.8}s`;
       document.body.appendChild(dot);
       setTimeout(() => {
           dot.remove();
       }, 1400);
   }
}
document.addEventListener("click", createClickEffect);
const scrollHint = document.getElementById("scrollHint");
scrollHint?.addEventListener("click", () => {
   document.getElementById("invitation")
       ?.scrollIntoView({
           behavior: "smooth"
       });
});
const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           entry.target.classList.add("is-visible");
       }
   });
}, {
   threshold: 0.2
});
document.querySelectorAll(".section-inner").forEach(section => {
   observer.observe(section);
});
/* =========================
  Hero Parallax
========================= */
let parallaxTicking = false;
function updateHeroParallax() {
   const heroHeight = hero.offsetHeight;
   const scrollY = window.scrollY;
   // 只在 Hero 附近計算
   if (scrollY <= heroHeight) {
       const moveY = Math.min(scrollY * 0.07, 45);
       const heroPhoto = document.querySelector(".hero-photo");
       heroPhoto?.style.setProperty(
           "--parallax-y",
           `${moveY}px`
       );
   }
   parallaxTicking = false;
}
window.addEventListener(
   "scroll",
   () => {
       if (!parallaxTicking) {
           requestAnimationFrame(updateHeroParallax);
           parallaxTicking = true;
       }
   },
   { passive: true }
);
/* =========================
  Fate Section Animation
========================= */
const fateSection = document.querySelector(".fate-section");
if (fateSection) {
   const fateObserver = new IntersectionObserver(
       (entries, observer) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   entry.target.classList.add("is-visible");
                   // 動畫只播放一次
                   observer.unobserve(entry.target);
               }
           });
       },
       {
           threshold:0.35
       }
   );
   fateObserver.observe(fateSection);
}