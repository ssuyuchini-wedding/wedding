const opening = document.getElementById("opening");
function openDoors() {
   opening.classList.add("is-open");
}
opening.addEventListener("click", openDoors);