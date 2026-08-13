/*
 * Menú compartido: abre y cierra la navegación principal en pantallas pequeñas,
 * igual que en el index.
 */
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");

    if (!header || !menuToggle) return;

    menuToggle.addEventListener("click", () => {
        const menuAbierto = header.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(menuAbierto));
        document.body.classList.toggle("menu-open", menuAbierto);
    });

    header.querySelectorAll("nav a, .auth-buttons a").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("menu-open");
            document.body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
});