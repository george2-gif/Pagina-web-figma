const menuToggle = document.getElementById("menuToggle");
const navRight = document.getElementById("navRight");
const searchForm = document.getElementById("searchForm");
const messageBox = document.getElementById("messageBox");

function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.add("show");

  clearTimeout(showMessage._t);
  showMessage._t = setTimeout(() => {
    messageBox.classList.remove("show");
  }, 2600);
}

if (menuToggle && navRight) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navRight.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const especialidad = document.getElementById("especialidad").value;
    const modalidad = document.getElementById("modalidad").value;

    if (!especialidad || !modalidad) {
      showMessage("Selecciona una especialidad y una modalidad para continuar.");
      return;
    }

    showMessage(`Buscando: ${especialidad} en modalidad ${modalidad}.`);
  });
}

document.addEventListener("click", (e) => {
  if (!navRight || !menuToggle) return;

  const clickDentroMenu = navRight.contains(e.target);
  const clickBoton = menuToggle.contains(e.target);

  if (!clickDentroMenu && !clickBoton) {
    navRight.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});