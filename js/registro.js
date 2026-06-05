const formRegistro = document.getElementById("form-registro");

formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-registro").value.trim();
    const correo = document.getElementById("email-registro").value.trim();
    const contrasena = document.getElementById("contrasena-registro").value.trim();

    if (!nombre || !correo || !contrasena) {
        alert("Completa todos los campos");
        return;
    }

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

        if (!respuesta.ok) {
            const error = await respuesta.text();
            throw new Error(error);
        }

        const mensaje = await respuesta.text();
        alert(mensaje || "Usuario registrado correctamente");
        formRegistro.reset();
        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        alert(error.message || "Error al registrar usuario");
    }
});