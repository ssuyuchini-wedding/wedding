const opening = document.getElementById("opening");
const openButton = document.getElementById("open-door-btn");
openButton.addEventListener("click", () => {
   opening.classList.add("is-open");
});