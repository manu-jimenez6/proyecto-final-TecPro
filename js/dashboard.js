const usuario = JSON.parse(localStorage.getItem("usuario"));

console.log(usuario);

if (!usuario) {
    window.location.href = "login.html";
}

document.getElementById("bienvenida").textContent =
    `Bienvenida, ${usuario.nombre}`;

document.getElementById("fecha-registro").textContent =
    usuario.fechaRegistro || "No disponible";

document.getElementById("ultimo-acceso").textContent =
    new Date().toLocaleTimeString();

document.getElementById("estado-cuenta").textContent =
    usuario.estado || "Activo";

document.getElementById("info-nombre").textContent =
    usuario.nombre;

document.getElementById("info-correo").textContent =
    usuario.correo;

document.getElementById("info-rol").textContent =
    usuario.rol;

// Modal
document.getElementById("editar-nombre").value =
    usuario.nombre;

document.getElementById("editar-correo").value =
    usuario.correo;

document
    .getElementById("btn-logout")
    .addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href = "index.html";
    });