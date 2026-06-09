/* ═══════════════════════════════════════════════════════════
   ZONA GAMER — script.js
   Funcionalidad compartida: navbar hamburguesa + modal login
═══════════════════════════════════════════════════════════ */
 
document.addEventListener('DOMContentLoaded', function () {
 
    // ── HAMBURGUESA ──────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
 
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('abierto');
        });
 
        // Cerrar menú al hacer click en un link
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('abierto');
            });
        });
 
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('abierto');
            }
        });
    }
 
    // ── MODAL LOGIN ──────────────────────────────────────────
    const modalOverlay = document.getElementById('modalOverlay');
    const modalForm    = document.getElementById('modalForm');
    const modalCerrar  = document.getElementById('modalCerrar');
    const btnEntrar    = document.getElementById('btnEntrar');
 
    // Abrir modal
    if (btnEntrar && modalOverlay) {
        btnEntrar.addEventListener('click', function () {
            modalOverlay.classList.add('abierto');
        });
    }
 
    // Cerrar modal con botón X
    if (modalCerrar && modalOverlay) {
        modalCerrar.addEventListener('click', function () {
            modalOverlay.classList.remove('abierto');
            limpiarModal();
        });
    }
 
    // Cerrar modal al hacer click fuera
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('abierto');
                limpiarModal();
            }
        });
    }
 
    // Cerrar modal con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('abierto')) {
            modalOverlay.classList.remove('abierto');
            limpiarModal();
        }
    });
 
    function limpiarModal() {
        if (!modalForm) return;
        const inputs = modalForm.querySelectorAll('input');
        inputs.forEach(function (inp) {
            inp.classList.remove('invalido', 'valido');
            inp.value = '';
        });
        const errores = modalForm.querySelectorAll('.modal-error');
        errores.forEach(function (err) { err.textContent = ''; });
    }
 
    // ── VALIDACIÓN MODAL ─────────────────────────────────────
    if (modalForm) {
        modalForm.addEventListener('submit', function (e) {
            e.preventDefault();
 
            const inputUsuario  = document.getElementById('loginUsuario');
            const inputPassword = document.getElementById('loginPassword');
            const errUsuario    = document.getElementById('errorUsuario');
            const errPassword   = document.getElementById('errorPassword');
 
            if (!inputUsuario || !inputPassword) return;
 
            const usuario  = inputUsuario.value.trim();
            const password = inputPassword.value;
            const regexUsuario = /^[a-zA-Z0-9_]{4,20}$/;
            let esValido = true;
 
            // Validar usuario
            if (!regexUsuario.test(usuario)) {
                esValido = false;
                inputUsuario.classList.add('invalido');
                inputUsuario.classList.remove('valido');
                if (errUsuario) errUsuario.textContent = 'Usuario inválido (letras, números, _, mín. 4 caracteres).';
            } else {
                inputUsuario.classList.remove('invalido');
                inputUsuario.classList.add('valido');
                if (errUsuario) errUsuario.textContent = '';
            }
 
            // Validar contraseña
            if (password.length < 6) {
                esValido = false;
                inputPassword.classList.add('invalido');
                inputPassword.classList.remove('valido');
                if (errPassword) errPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            } else {
                inputPassword.classList.remove('invalido');
                inputPassword.classList.add('valido');
                if (errPassword) errPassword.textContent = '';
            }
 
            if (!esValido) return;
 
            // Verificar contra localStorage
            const usuarioGuardado  = localStorage.getItem('usuarioRegistrado');
            const passwordGuardada = localStorage.getItem('passwordRegistrada');
 
            if (usuario === usuarioGuardado && password === passwordGuardada) {
                alert('¡Bienvenido de vuelta, ' + usuario + '!');
                modalOverlay.classList.remove('abierto');
                limpiarModal();
            } else {
                inputUsuario.classList.add('invalido');
                inputPassword.classList.add('invalido');
                if (errUsuario)  errUsuario.textContent  = 'Usuario o contraseña incorrectos.';
                if (errPassword) errPassword.textContent = '¿Ya creaste tu cuenta?';
            }
        });
    }
 
});