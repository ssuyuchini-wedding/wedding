const opening = document.getElementById("opening");
const hero = document.getElementById("hero");
function openDoors() {
   opening.classList.add("is-open");
   setTimeout(() => {
       opening.style.display = "none";
       hero.scrollIntoView({
           behavior: "auto",
           block: "start"
       });
   }, 1450);
}
opening.addEventListener("click", openDoors);