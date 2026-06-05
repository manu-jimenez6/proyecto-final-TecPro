const usuario = JSON.parse(localStorage.getItem("usuario"));
const inputNombre = document.getElementById("editar-nombre");
const inputCorreo = document.getElementById("editar-correo");
const inputPassword = document.getElementById("editar-password");
const btnGuardar = document.getElementById("btn-guardar");

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


document.getElementById("editar-nombre").value =
    usuario.nombre;

document.getElementById("editar-correo").value =
    usuario.correo;

    btnGuardar.addEventListener("click", async () => {

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const contrasena = inputPassword.value.trim();

    try {

        const respuesta = await fetch(
            `http://localhost:8080/api/usuarios/${usuario.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}`
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contrasena
                })
            }
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo actualizar el perfil");
        }

        const usuarioActualizado = await respuesta.json();

        localStorage.setItem(
            "usuario",
            JSON.stringify({
                ...usuario,
                nombre: usuarioActualizado.nombre,
                correo: usuarioActualizado.correo
            })
        );

        alert("Perfil actualizado correctamente");

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalPerfil")
        );

        modal.hide();

        const bienvenida = document.getElementById("bienvenid@");

        if (bienvenida) {
            bienvenida.textContent =
                `Bienvenid@, ${usuarioActualizado.nombre}`;
        }

    } catch (error) {
        console.error(error);
        alert(error.message);
    }

});


document
    .getElementById("btn-logout")
    .addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href = "index.html";
    });

const btnConfirmarEliminar =
    document.getElementById("btn-confirmar-eliminar");

btnConfirmarEliminar.addEventListener("click", async () => {

    try {

        const respuesta = await fetch(
            "http://localhost:8080/api/usuarios/perfil/baja",
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${usuario.token}`
                }
            }
        );

        const mensaje = await respuesta.text();

        if (!respuesta.ok) {
            throw new Error(mensaje);
        }

        alert(mensaje);

        localStorage.removeItem("usuario");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});