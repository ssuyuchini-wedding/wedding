const opening = document.getElementById("opening");
function openDoors() {
   opening.classList.add("is-open");
   setTimeout(() => {
       opening.style.display = "none";
   }, 1450);
}
opening.addEventListener("click", openDoors);