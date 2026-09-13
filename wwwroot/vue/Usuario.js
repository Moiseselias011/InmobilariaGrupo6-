
console.log(" USUARIO.JS CARGADO");

const app = Vue.createApp({
    data() {
        return {
            usuarios: [],

            usuario: {
                IdUsuario: 0,
                Nombre: "",
                Apellido: "",
                Email: "",
                Password: "",
                Rol: ""
            }
        };
    },

    mounted() {
        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);

        // INDEX
        if (ruta === "/Usuario" || ruta === "/Usuario/") {
            this.listarUsuarios();
        }

        // EDIT, DELETE y DETAILS
        if (
            ruta.includes("/Usuario/Edit/") ||
            ruta.includes("/Usuario/Delete/") ||
            ruta.includes("/Usuario/Details/")
        ) {
            this.obtenerUsuario();
        }
    },

    methods: {

        // INDEX
        listarUsuarios() {
            console.log(" LISTAR USUARIOS EJECUTADO");

            fetch("/api/ControllerUsuario")
                .then(response => {
                    console.log(" RESPUESTA LISTAR:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener usuarios");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" USUARIOS:", data);

                    this.usuarios = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },

        // CREATE
        crearUsuario() {
            console.log(" CREAR USUARIO EJECUTADO");
            console.log(this.usuario);

            fetch("/api/ControllerUsuario", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.usuario)
            })
                .then(response => {
                    console.log(" CREAR USUARIO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al crear usuario");
                    }

                    window.location.href = "/Usuario";
                })
                .catch(error => {
                    console.error(" CREAR USUARIO ERROR:", error);
                });
        },

        // EDIT / DELETE / DETAILS
        obtenerId() {
            const partes = window.location.pathname.split("/");

            return partes[partes.length - 1];
        },

        obtenerUsuario() {
            const id = this.obtenerId();

            console.log(" OBTENER USUARIO ID:", id);

            fetch("/api/ControllerUsuario/" + id)
                .then(response => {
                    console.log(" OBTENER USUARIO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener usuario");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" USUARIO:", data);

                    this.usuario = data;
                })
                .catch(error => {
                    console.error(" OBTENER USUARIO ERROR:", error);
                });
        },

        // EDIT
        editarUsuario() {
            console.log(" EDITAR USUARIO EJECUTADO");
            console.log(this.usuario);

            fetch("/api/ControllerUsuario", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.usuario)
            })
                .then(response => {
                    console.log(" EDITAR USUARIO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al editar usuario");
                    }

                    window.location.href = "/Usuario";
                })
                .catch(error => {
                    console.error(" EDITAR USUARIO ERROR:", error);
                });
        },

        // DELETE
        eliminar() {
            const id = this.usuario.IdUsuario;

            console.log(" ELIMINAR USUARIO ID:", id);

            fetch("/api/ControllerUsuario/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(" ELIMINAR USUARIO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al eliminar usuario");
                    }

                    window.location.href = "/Usuario";
                })
                .catch(error => {
                    console.error(" ELIMINAR USUARIO ERROR:", error);
                });
        }
    }
});

app.mount("#app");

