
console.log("  INQUILINO.JS CARGADO");

const app = Vue.createApp({
    data() {
        return {
            inquilinos: [],

            inquilino: {
                IdInquilino: 0,
                DNI: "",
                NombreCompleto: "",
                Telefono: "",
                Email: ""
            }
        };
    },

    mounted() {
        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);

        // INDEX
        if (ruta === "/Inquilino" || ruta === "/Inquilino/") {
            this.listarInquilinos();
        }

        // EDIT, DELETE y DETAILS
        if (
            ruta.includes("/Inquilino/Edit/") ||
            ruta.includes("/Inquilino/Delete/") ||
            ruta.includes("/Inquilino/Details/")
        ) {
            this.obtenerInquilino();
        }
    },

    methods: {

        // INDEX
        listarInquilinos() {
            console.log(" LISTAR INQUILINOS EJECUTADO");

            fetch("/api/ControllerInquilino")
                .then(response => {
                    console.log(" RESPUESTA LISTAR:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener inquilinos");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" INQUILINOS:", data);

                    this.inquilinos = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },

        // CREATE
        crearInquilino() {
            console.log(" CREAR INQUILINO EJECUTADO");
            console.log(this.inquilino);

            fetch("/api/ControllerInquilino", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.inquilino)
            })
                .then(response => {
                    console.log(" CREAR INQUILINO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al crear inquilino");
                    }

                    window.location.href = "/Inquilino";
                })
                .catch(error => {
                    console.error(" CREAR INQUILINO ERROR:", error);
                });
        },

        // EDIT / DELETE / DETAILS
        obtenerId() {
            const partes = window.location.pathname.split("/");

            return partes[partes.length - 1];
        },

        obtenerInquilino() {
            const id = this.obtenerId();

            console.log(" OBTENER INQUILINO ID:", id);

            fetch("/api/ControllerInquilino/" + id)
                .then(response => {
                    console.log(" OBTENER INQUILINO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener inquilino");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" INQUILINO:", data);

                    this.inquilino = data;
                })
                .catch(error => {
                    console.error(" OBTENER INQUILINO ERROR:", error);
                });
        },

        // EDIT
        editarInquilino() {
            console.log(" EDITAR INQUILINO EJECUTADO");
            console.log(this.inquilino);

            fetch("/api/ControllerInquilino", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.inquilino)
            })
                .then(response => {
                    console.log(" EDITAR INQUILINO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al editar inquilino");
                    }

                    window.location.href = "/Inquilino";
                })
                .catch(error => {
                    console.error(" EDITAR INQUILINO ERROR:", error);
                });
        },

        // DELETE
        eliminar() {
            const id = this.inquilino.IdInquilino;

            console.log(" ELIMINAR INQUILINO ID:", id);

            fetch("/api/ControllerInquilino/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(" ELIMINAR INQUILINO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al eliminar inquilino");
                    }

                    window.location.href = "/Inquilino";
                })
                .catch(error => {
                    console.error(" ELIMINAR INQUILINO ERROR:", error);
                });
        }
    }
});

app.mount("#app");

