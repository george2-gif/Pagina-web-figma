/*
 * Funcionalidad de la página principal.
 * Cada bloque comprueba que sus elementos existan para que el script pueda
 * cargarse sin errores aunque una sección no esté presente.
 */
document.addEventListener("DOMContentLoaded", () => {
    inicializarMenu();
    inicializarRedesSociales();
    inicializarBuscadores();
    inicializarTarjetas();
});

/* Abre y cierra la navegación principal en pantallas pequeñas. */
function inicializarMenu() {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");

    if (!header || !menuToggle) return;

    menuToggle.addEventListener("click", () => {
        const menuAbierto = header.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(menuAbierto));
    });

    header.querySelectorAll("nav a, .auth-buttons a").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* Cambia los iconos sociales por su versión de color al pasar el cursor. */
function inicializarRedesSociales() {
    document.querySelectorAll(".icono-social img").forEach((image) => {
        const rutaOriginal = image.src;
        const rutaDeColor = rutaOriginal.replace(".svg", "-color.svg");
        const enlace = image.parentElement;

        if (!enlace) return;

        enlace.addEventListener("mouseenter", () => {
            image.src = rutaDeColor;
        });

        enlace.addEventListener("mouseleave", () => {
            image.src = rutaOriginal;
        });
    });
}

/* Controla los dos menús de opciones del buscador principal. */
function inicializarBuscadores() {
    const searchFields = document.querySelectorAll(".search-field");

    searchFields.forEach((field) => {
        const input = field.querySelector("input");
        const menu = field.querySelector(".dropdown-menu");

        if (!input || !menu) return;

        const options = [...menu.querySelectorAll("li")];

        input.addEventListener("focus", () => {
            cerrarMenus();
            menu.classList.add("show-menu");
        });

        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();

            menu.classList.add("show-menu");
            options.forEach((option) => {
                const matches = option.textContent.toLowerCase().includes(query);
                option.hidden = !matches;
            });
        });

        menu.addEventListener("click", (event) => {
            const option = event.target.closest("li");

            if (!option) return;

            input.value = option.textContent.trim();
            menu.classList.remove("show-menu");
            options.forEach((item) => {
                item.hidden = false;
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search-field")) cerrarMenus();
    });

    const searchButton = document.querySelector(".btn-search");
    const specialtyInput = document.querySelector("#input-especialidades");
    const cityInput = document.querySelector("#input-ciudades");

    if (!searchButton || !specialtyInput || !cityInput) return;

    searchButton.addEventListener("click", () => {
        const specialty = specialtyInput.value.trim();
        const city = cityInput.value.trim();

        if (!specialty && !city) {
            alert("Por favor, selecciona una especialidad o una ciudad para buscar.");
            return;
        }

        const params = new URLSearchParams({
            especialidad: specialty,
            ciudad: city,
        });

        window.location.href = `html/vista9.html?${params}`;
    });
}

/* Oculta todos los menús desplegables del buscador. */
function cerrarMenus() {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show-menu");
    });
}

/* Activa la navegación de las tarjetas de tratamientos. */
function inicializarTarjetas() {
    const cards = document.querySelectorAll(".grid-tratamientos .card");

    cards.forEach((card) => {
        const title = card.querySelector("h3");
        const titleText = title?.textContent.trim() ?? "";
        const isOnlineCard = titleText.toLowerCase() === "psicología online";

        card.style.cursor = isOnlineCard ? "default" : "pointer";

        if (!isOnlineCard) {
            card.addEventListener("click", () => {
                redirigirPorCategoria(titleText);
            });
        }
    });

    const onlineButton = document.querySelector(".btn-tratamiento");

    onlineButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        window.location.href = "html/vista9.html?modalidad=online";
    });
}

/* Construye la URL de resultados correspondiente a una categoría. */
function redirigirPorCategoria(title) {
    const categories = {
        depresión: "depresion",
        ansiedad: "ansiedad",
        autoestima: "autoestima",
        ludopatía: "ludopatia",
        bullying: "bullying",
        tdah: "tdah",
    };
    const category = categories[title.trim().toLowerCase()];

    if (!category) return;

    window.location.href = `html/vista9.html?especialidad=${category}`;
}
/* =======================================================================
   FUNCIÓN AUXILIAR: REDIRECCIÓN A VISTAS DIFERENTES POR CATEGORÍA
   ======================================================================= */
function redirigirPorCategoria(textoTitulo) {
    const categoria = textoTitulo.trim().toLowerCase();
    let urlDestino = '';

    // Modifica los nombres de los archivos según cómo los hayas guardado tú y tu compañero:
    if (categoria === 'depresión') {
        urlDestino = 'depresion.html'; // Cambia por tu archivo de depresión
    } 
    else if (categoria === 'ansiedad') {
        urlDestino = 'html/encontrandolapaz.html';  // Cambia por tu archivo de ansiedad
    } 
    else if (categoria === 'autoestima') {
        urlDestino = 'autoestima.html'; // Cambia por tu archivo de autoestima
    } 
    else if (categoria === 'ludopatía') {
        urlDestino = 'ludopatia.html';  // Cambia por tu archivo de ludopatía
    } 
    else if (categoria === 'bullying') {
        urlDestino = 'bullying.html';   // Cambia por tu archivo de bullying
    } 
    else if (categoria === 'tdah') {
        urlDestino = 'tdah.html';       // Cambia por tu archivo de TDAH
    }

    // Si los archivos están dentro de una carpeta llamada por ejemplo "vistas", 
    // debes ponerle el nombre antes, así: urlDestino = 'vistas/depresion.html';

    // Ejecuta la redirección automática si la ruta existe
    if (urlDestino !== '') {
        window.location.href = urlDestino;
    }
}

