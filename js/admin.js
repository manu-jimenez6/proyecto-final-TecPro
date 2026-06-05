const usuario = JSON.parse(localStorage.getItem("usuario"));
let usuarioAEliminar = null;


if (!usuario) {
    window.location.href = "login.html";
}

if (usuario.rol !== "ADMIN") {
    window.location.href = "dashboard-usuario.html";
}

const bienvenida = document.getElementById("bienvenida");

bienvenida.textContent = `Bienvenid@, ${usuario.nombre}`;

const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", () => {

    localStorage.removeItem("usuario");

    window.location.href = "login.html";
});

const tablaUsuarios =
    document.getElementById("tabla-usuarios");

async function cargarUsuarios() {
    try {
        const token = usuario.token;

        const respuesta = await fetch(
            "http://localhost:8080/api/usuarios",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const usuarios = await respuesta.json();
        tablaUsuarios.innerHTML = "";
        usuarios.forEach((user) => {
        tablaUsuarios.innerHTML += `
        <tr>
            <td>${user.nombre}</td>
            <td>${user.correo}</td>
            <td>
                <span class="badge-rol">
                    ${user.rol}
                </span>
            </td>
            <td>
                <button
                    class="btn btn-accion btn-editar"
                    data-id="${user.id}"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditarUsuario">
                    <i class="bi bi-pencil-fill"></i>
                </button>

                <button
                    class="btn btn-accion btn-eliminar"
                    data-id="${user.id}"
                    data-bs-toggle="modal"
                    data-bs-target="#modalConfirmarEliminarUsuario">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
        `;
    });
    } catch (error) {
        console.error(error);
        alert("Error cargando usuarios");
    }
}

cargarUsuarios();
const btnAgregar =
    document.getElementById("btn-agregar");
    btnAgregar.addEventListener("click", async () => {
    const nombre =
        document.getElementById("nuevo-nombre").value;
    const correo =
        document.getElementById("nuevo-correo").value;
    const contrasena =
        document.getElementById("nuevo-password").value;
    try {
        const respuesta = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    contrasena
                })
            }
        );

        const data = await respuesta.text();
        alert(data);
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        alert("Error agregando usuario");
    }
});

document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-eliminar")) {
        const btn = e.target.closest(".btn-eliminar");
        usuarioAEliminar = btn.dataset.id;
    }
});

const btnConfirmarEliminar =
    document.getElementById("btn-confirmar-eliminar");
btnConfirmarEliminar.addEventListener("click", async () => {
    if (!usuarioAEliminar) return;
    try {
        const respuesta = await fetch(
            `http://localhost:8080/api/usuarios/${usuarioAEliminar}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${usuario.token}`
                }
            }
        );
        const data = await respuesta.text();
        alert(data);
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalConfirmarEliminarUsuario")
        );
        modal.hide();
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        alert("Error eliminando usuario");
    }
});

/* =========================
   BUSCADOR
========================= */

const buscador =
    document.getElementById("buscador");

buscador.addEventListener("keyup", () => {

    const texto =
        buscador.value.toLowerCase();

    const filas =
        document.querySelectorAll("#tabla-usuarios tr");

    filas.forEach((fila) => {

        const contenido =
            fila.textContent.toLowerCase();

        fila.style.display =
            contenido.includes(texto)
                ? ""
                : "none";
    });
});