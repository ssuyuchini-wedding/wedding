const opening = document.getElementById("opening");
function openDoors() {
   opening.classList.add("is-open");
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