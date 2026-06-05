const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo = document.getElementById("email").value;

    const contrasena =
        document.getElementById("contrasena-login").value;

    try {

        const respuesta = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo,
                    contrasena
                })
            }
        );

        const data = await respuesta.json();

        console.log("STATUS:", respuesta.status);
        console.log("DATA:", data);

        if (!respuesta.ok) {
            throw new Error(data.mensaje || "Credenciales incorrectas");
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario || data));

        alert("Login correcto");

        if (data.rol === "ADMIN") {
            window.location.href = "panel-admin.html";
        } else {
            window.location.href = "dashboard-usuario.html";
        }

    } catch(error) {

        console.error(error);

        alert("Error al iniciar sesión");
    }
});