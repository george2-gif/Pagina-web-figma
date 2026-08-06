document.addEventListener("DOMContentLoaded", () => {

    /* ==============================================
       1. CAMBIO DE REDES SOCIALES AL PASAR EL CURSOR
       =============================================== */
    const iconosSociales = document.querySelectorAll('.icono-social img');

    iconosSociales.forEach(img => {
        const rutaBlanca = img.src; 
        const rutaColor = rutaBlanca.replace('.svg', '-color.svg');

        img.parentElement.addEventListener('mouseenter', () => {
            img.src = rutaColor;
        });

        img.parentElement.addEventListener('mouseleave', () => {
            img.src = rutaBlanca;
        });
    });

    /* ==============================================
       2. MENÚ DESPLEGABLE Y FILTRADO
       =============================================== */
    const searchFields = document.querySelectorAll(".search-field");

    searchFields.forEach(field => {
        const input = field.querySelector("input");
        const menu = field.querySelector(".dropdown-menu");
        
        if (!input || !menu) return;

        const listItems = menu.querySelectorAll("li");

        // Mostrar menú al enfocar
        input.addEventListener("focus", () => {
            cerrarTodosLosMenus();
            menu.classList.add("show-menu");
        });

        // Filtrar opciones en tiempo real
        input.addEventListener("input", () => {
            const query = input.value.toLowerCase().trim();
            menu.classList.add("show-menu");

            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? "" : "none";
            });
        });

        // Seleccionar una opción
        menu.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                input.value = e.target.textContent.trim();
                menu.classList.remove("show-menu");
                
                // Restablece visibilidad de opciones para la próxima apertura
                listItems.forEach(item => item.style.display = "");
            }
        });
    });

    // Cerrar menús al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-field")) {
            cerrarTodosLosMenus();
        }
    });

    function cerrarTodosLosMenus() {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.classList.remove("show-menu");
        });
    }

    /* ==============================================
       3. RESULTADOS DEL BOTÓN BUSCAR
       =============================================== */
    const botonBuscar = document.querySelector('.btn-search');
    const inputEspecialidad = document.getElementById('input-especialidades');
    const inputCiudad = document.getElementById('input-ciudades');

    if (botonBuscar && inputEspecialidad && inputCiudad) {
        botonBuscar.addEventListener('click', () => {
            const especialidadSeleccionada = inputEspecialidad.value.trim();
            const ciudadSeleccionada = inputCiudad.value.trim();

            if (especialidadSeleccionada === "" && ciudadSeleccionada === "") {
                alert("Por favor, selecciona una especialidad o una ciudad para buscar.");
                return;
            }

            const urlBusqueda = `resultados.html?especialidad=${encodeURIComponent(especialidadSeleccionada)}&ciudad=${encodeURIComponent(ciudadSeleccionada)}`;
            
            window.location.href = urlBusqueda;
        });
    }

});
/* ==============================================
       4. FUNCIONALIDAD DE LAS TARJETAS GRID (REPARADO)
   ============================================== */
document.addEventListener("DOMContentLoaded", function () {
    const tarjetas = document.querySelectorAll('.grid-tratamientos .card');

    tarjetas.forEach(tarjeta => {
        const tituloHtml = tarjeta.querySelector('h3');
        const esGrande = tituloHtml && tituloHtml.innerText.trim().toLowerCase() === 'psicología online';

        if (esGrande) {
            // Tarjeta grande: Flecha normal y NO hace nada al hacer clic
            tarjeta.style.cursor = 'default';
            tarjeta.addEventListener('click', function (e) {
                // Si hicieron clic en el botón verde, no hacemos nada aquí
                if (e.target.closest('.btn-tratamiento')) return;
                
                console.log("Clic visual en tarjeta grande (sin redirección)");
            });
        } else {
            // Tarjetas normales: Cursor de manita y redirección normal
            tarjeta.style.cursor = 'pointer';
            tarjeta.addEventListener('click', function () {
                if (tituloHtml) {
                    redirigirPorCategoria(tituloHtml.innerText);
                }
            });
        }
    });

    // Botón verde independiente
    const botonOnline = document.querySelector('.btn-tratamiento');
    if (botonOnline) {
        botonOnline.style.cursor = 'pointer';
        botonOnline.addEventListener('click', function (event) {
            event.stopPropagation();
            window.location.href = 'resultados.html?modalidad=online';
        });
    }
});

// Tu función auxiliar (se queda exactamente igual)
function redirigirPorCategoria(textoTitulo) {
    const categoria = textoTitulo.trim().toLowerCase();
    let urlDestino = '';
    if (categoria === 'depresión') urlDestino = 'resultados.html?especialidad=depresion';
    else if (categoria === 'ansiedad') urlDestino = 'resultados.html?especialidad=ansiedad';
    else if (categoria === 'autoestima') urlDestino = 'resultados.html?especialidad=autoestima';
    else if (categoria === 'ludopatía') urlDestino = 'resultados.html?especialidad=ludopatia';
    else if (categoria === 'bullying') urlDestino = 'resultados.html?especialidad=bullying';
    else if (categoria === 'tdah') urlDestino = 'resultados.html?especialidad=tdah';

    if (urlDestino !== '') {
        window.location.href = urlDestino;
    }
}
