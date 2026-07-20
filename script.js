const opening = document.getElementById("opening");
const hero = document.getElementById("hero");
function openDoors() {
   opening.classList.add("is-open");
   setTimeout(() => {
       opening.style.display = "none";
       window.scrollTo(0, 0);
   }, 1450);
}
opening.addEventListener("click", openDoors);