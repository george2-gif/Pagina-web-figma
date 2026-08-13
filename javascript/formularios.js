/*
 * Validación local de los formularios de acceso y registro.
 * Sin sistema de autenticación: intercepta el envío, comprueba campos
 * obligatorios vacíos y redirige a la página de inicio.
 */

const HOME_URL = window.location.pathname.endsWith('/index.html') ? 'index.html' : '../index.html';

const authForms = document.querySelectorAll('form.login-form, form.register-form');

authForms.forEach((form) => {
  // Desactiva la validación nativa para que la comprobación
  // con alert() de este script sea la que controla el envío.
  form.setAttribute('novalidate', '');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    const values = {};

    requiredFields.forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        values[field.name] = field.checked;
      } else {
        values[field.name] = field.value.trim();
      }
    });

    const hasEmptyField = Object.values(values).some(
      (value) => value === false || value === ''
    );

    if (hasEmptyField) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    if (form.classList.contains('register-form')) {
      const nameField = form.querySelector('#full-name');
      const emailField = form.querySelector('#email');
      if (nameField) localStorage.setItem('userName', nameField.value.trim());
      if (emailField) localStorage.setItem('userEmail', emailField.value.trim());
    } else if (form.classList.contains('login-form')) {
      const emailField = form.querySelector('#login-email');
      if (emailField) {
        const email = emailField.value.trim();
        localStorage.setItem('userEmail', email);
        const derivedName = email.split('@')[0];
        localStorage.setItem('userName', derivedName.charAt(0).toUpperCase() + derivedName.slice(1));
      }
    }

    window.location.href = HOME_URL;
  });
});