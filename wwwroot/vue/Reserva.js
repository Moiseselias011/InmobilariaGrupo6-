
console.log(" RESERVA.JS CARGADO");

const app = Vue.createApp({
    data() {
        return {
            reservas: [],

            reserva: {
                IdReserva: 0,
                IdInquilino: 0,
                IdInmueble: 0,
                FechaInicio: "",
                FechaFin: "",
                MontoPorDia: 0
            }
        };
    },

    mounted() {
        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);

        // INDEX
        if (ruta === "/Reserva" || ruta === "/Reserva/") {
            this.listarReservas();
        }

        // EDIT, DELETE y DETAILS
        if (
            ruta.includes("/Reserva/Edit/") ||
            ruta.includes("/Reserva/Delete/") ||
            ruta.includes("/Reserva/Details/")
        ) {
            this.obtenerReserva();
        }
    },

    methods: {

        // INDEX
        listarReservas() {
            console.log(" LISTAR RESERVAS EJECUTADO");

            fetch("/api/ControllerReserva")
                .then(response => {
                    console.log(" RESPUESTA LISTAR:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener reservas");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" RESERVAS:", data);

                    this.reservas = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },

        // CREATE
        crearReserva() {
            console.log(" CREAR RESERVA EJECUTADO");
            console.log(this.reserva);

            fetch("/api/ControllerReserva", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.reserva)
            })
                .then(response => {
                    console.log(" CREAR RESERVA RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al crear reserva");
                    }

                    window.location.href = "/Reserva";
                })
                .catch(error => {
                    console.error(" CREAR RESERVA ERROR:", error);
                });
        },

        // EDIT / DELETE / DETAILS
        obtenerId() {
            const partes = window.location.pathname.split("/");

            return partes[partes.length - 1];
        },

        obtenerReserva() {
            const id = this.obtenerId();

            console.log(" OBTENER RESERVA ID:", id);

            fetch("/api/ControllerReserva/ConDetalles/" + id)
                .then(response => {
                    console.log(" OBTENER RESERVA RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener reserva");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" RESERVA:", data);

                    this.reserva = data;
                })
                .catch(error => {
                    console.error(" OBTENER RESERVA ERROR:", error);
                });
        },

        // EDIT
        editarReserva() {
            console.log(" EDITAR RESERVA EJECUTADO");
            console.log(this.reserva);

            fetch("/api/ControllerReserva", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.reserva)
            })
                .then(response => {
                    console.log(" EDITAR RESERVA RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al editar reserva");
                    }

                    window.location.href = "/Reserva";
                })
                .catch(error => {
                    console.error(" EDITAR RESERVA ERROR:", error);
                });
        },

        // DELETE
        eliminar() {
            const id = this.reserva.IdReserva;

            console.log(" ELIMINAR RESERVA ID:", id);

            fetch("/api/ControllerReserva/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(" ELIMINAR RESERVA RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al eliminar reserva");
                    }

                    window.location.href = "/Reserva";
                })
                .catch(error => {
                    console.error(" ELIMINAR RESERVA ERROR:", error);
                });
        }
    }
});

app.mount("#app");

