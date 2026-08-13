/*
 * Menú compartido: abre y cierra la navegación principal en pantallas pequeñas,
 * igual que en el index.
 */
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");

    if (localStorage.getItem('isLoggedIn') === 'true') {
        const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Usuario';
        const initial = userName.charAt(0).toUpperCase();
        document.querySelectorAll(".auth-buttons").forEach((authContainer) => {
            authContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #00c2b2; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;" title="${userName}">
                        ${initial}
                    </div>
                    <span style="color: #6b7280; font-weight: 500; font-size: 0.9rem; white-space: nowrap;">Hola, ${userName}</span>
                    <button type="button" id="btn-cerrar-sesion" class="btn-login" style="background: #e53e3e; box-shadow: 0 10px 24px rgba(229, 62, 62, 0.25); border: none; cursor: pointer; padding: 8px 14px; font-size: 13px;">Cerrar sesión</button>
                </div>
            `;
        });

        document.querySelectorAll("#btn-cerrar-sesion").forEach((btn) => {
            btn.addEventListener("click", () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                window.location.reload();
            });
        });
    }

    // Manejo de "Agendar Cita" -> Abre la vista de agendar cita (vista14.html)
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a, button");
        if (!link) return;
        const text = link.textContent.trim().toLowerCase();
        if (text.includes("agendar cita") || text.includes("agendar una cita")) {
            event.preventDefault();
            const bookingUrl = window.location.pathname.includes('/html/') ? 'vista14.html' : 'html/vista14.html';
            window.location.href = bookingUrl;
        }
    });

    // Carrusel / Paginación dinámica de psicólogos
    const pagesData = [
        [
            { name: "Dr. Sergio Martínez", specialty: "Terapia de Pareja y Familia", desc: "Especialista en resolución de conflictos conyugales y fortalecimiento de la comunicación familiar bajo principios de amor y respeto mutuo.", price: "$35.00", img: "../assets/img/Jorge.png" },
            { name: "Dra. Claudia Rivera", specialty: "Psicoterapia Humanista y Depresión", desc: "Enfoque centrado en la persona para superar cuadros depresivos y encontrar propósito de vida a través de la fe y la ciencia psicológica.", price: "$40.00", img: "../assets/img/Elena.png" },
            { name: "Lic. Roberto Gómez", specialty: "Adicciones y Consejería Juvenil", desc: "Dedicado a guiar a jóvenes y adultos en la superación de dependencias, integrando herramientas terapéuticas con acompañamiento espiritual.", price: "$30.00", img: "../assets/img/Antonio.png" }
        ],
        [
            { name: "Dra. Elizabeth Ramos", specialty: "Terapia de Pareja, Ansiedad y Depresión", desc: "Especialista con más de 10 años de experiencia integrando principios bíblicos con la psicología clínica moderna.", price: "$45.00", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=88" },
            { name: "Dr. Fernando Ayala", specialty: "Psicología Clínica y Liderazgo", desc: "Ayudando a profesionales y familias a superar el estrés crónico y el burnout mediante la guía espiritual.", price: "$50.00", img: "../assets/img/Dr. Fernando Ayala.png" },
            { name: "Dra. Rebeca Salazar", specialty: "Psicología Infantil y Adolescente", desc: "Dedicada a guiar a las nuevas generaciones hacia un desarrollo emocional saludable, siempre bajo los valores de la familia.", price: "$40.00", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=88" }
        ],
        [
            { name: "Lic. Mauricio Pérez", specialty: "Superación de Adicciones", desc: "Acompañamiento especializado en procesos de desintoxicación y recuperación con enfoque espiritual y psicológico.", price: "$35.00", img: "../assets/img/Muricio.png" },
            { name: "Dra. Gabriela Zelaya", specialty: "Terapia Matrimonial y Familiar", desc: "Restauración de hogares y matrimonios a través del perdón, la comunicación asertiva y principios bíblicos.", price: "$55.00", img: "../assets/img/Dra. Gabriela Zelaya.png" },
            { name: "Dr. Antonio Fuentes", specialty: "Trastornos de Ansiedad", desc: "Herramientas cognitivo-conductuales combinadas con paz interior para superar ataques de pánico y fobias.", price: "$40.00", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=88" }
        ]
    ];

    document.querySelectorAll(".pagination").forEach((pagination) => {
        const links = [...pagination.querySelectorAll("a:not(:first-child):not(:last-child)")];
        links.forEach((pageLink, pageIndex) => {
            pageLink.addEventListener("click", (event) => {
                event.preventDefault();
                links.forEach(l => l.classList.remove("current"));
                pageLink.classList.add("current");

                const cards = document.querySelectorAll(".profile-card");
                const currentData = pagesData[pageIndex % pagesData.length];

                cards.forEach((card, i) => {
                    if (currentData[i]) {
                        const data = currentData[i];
                        const h2 = card.querySelector(".profile-content h2");
                        const spec = card.querySelector(".specialty");
                        const desc = card.querySelector(".profile-description");
                        const price = card.querySelector(".profile-price strong");
                        const img = card.querySelector(".profile-photo-wrap img");

                        if (h2) h2.textContent = data.name;
                        if (spec) {
                            const iconSvg = spec.querySelector("svg")?.outerHTML || '';
                            spec.innerHTML = iconSvg + ' ' + data.specialty;
                        }
                        if (desc) desc.textContent = data.desc;
                        if (price) price.textContent = data.price;
                        if (img) img.src = data.img;
                    }
                });

                document.querySelector(".directory, .profiles, main")?.scrollIntoView({ behavior: 'smooth' });
            });
        });

        const prevArrow = pagination.querySelector("a:first-child");
        const nextArrow = pagination.querySelector("a:last-child");

        prevArrow?.addEventListener("click", (event) => {
            event.preventDefault();
            const current = links.findIndex(l => l.classList.contains("current"));
            if (current > 0) {
                links[current - 1].click();
            }
        });

        nextArrow?.addEventListener("click", (event) => {
            event.preventDefault();
            const current = links.findIndex(l => l.classList.contains("current"));
            if (current < links.length - 1) {
                links[current + 1].click();
            }
        });
    });

    if (!header || !menuToggle) return;

    menuToggle.addEventListener("click", () => {
        const menuAbierto = header.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(menuAbierto));
        document.body.classList.toggle("menu-open", menuAbierto);
    });

    header.querySelectorAll("nav a, .auth-buttons a, .auth-buttons button").forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("menu-open");
            document.body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
});