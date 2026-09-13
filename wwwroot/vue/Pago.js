console.log("PAGO.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            pagos: [],

            pago: {
                IdPago: 0,
                IdReserva: 0,
                FechaPago: "",
                Monto: 0,
                MetodoPago: ""
            }

        };
    },

    mounted() {

        console.log("VUE PAGO MONTADO");

        const ruta = window.location.pathname;

        console.log("RUTA:", ruta);


        // INDEX
        if (ruta === "/Pago" || ruta === "/Pago/") {

            this.listarPagos();

        }


        // EDIT, DELETE Y DETAILS
        if (
            ruta.includes("/Pago/Edit/") ||
            ruta.includes("/Pago/Delete/") ||
            ruta.includes("/Pago/Details/")
        ) {

            this.obtenerPago();

        }

    },

    methods: {


        // ==========================================
        // INDEX
        // ==========================================

        listarPagos() {

            console.log("LISTAR PAGOS EJECUTADO");

            fetch("/api/ControllerPago")

                .then(response => {

                    console.log(
                        "RESPUESTA LISTAR PAGOS:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener pagos"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log("PAGOS:", data);

                    this.pagos = data;

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
                        error
                    );

                });

        },


        // ==========================================
        // CREATE
        // ==========================================

        crearPago() {

            console.log("CREAR PAGO EJECUTADO");

            console.log(this.pago);


            fetch("/api/ControllerPago", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(this.pago)

            })

                .then(response => {

                    console.log(
                        "CREAR PAGO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al crear pago"
                        );

                    }

                    window.location.href = "/Pago";

                })

                .catch(error => {

                    console.error(
                        "CREAR PAGO ERROR:",
                        error
                    );

                });

        },


        // ==========================================
        // OBTENER ID
        // ==========================================

        obtenerId() {

            const partes =
                window.location.pathname.split("/");

            return partes[partes.length - 1];

        },


        // ==========================================
        // OBTENER PAGO
        // ==========================================

        obtenerPago() {

            const id = this.obtenerId();

            console.log(
                "OBTENER PAGO ID:",
                id
            );


            fetch(
                "/api/ControllerPago/" + id
            )

                .then(response => {

                    console.log(
                        "OBTENER PAGO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener pago"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "PAGO:",
                        data
                    );

                    this.pago = data;

                })

                .catch(error => {

                    console.error(
                        "OBTENER PAGO ERROR:",
                        error
                    );

                });

        },


        // ==========================================
        // EDITAR
        // ==========================================

        editarPago() {

            console.log(
                "EDITAR PAGO EJECUTADO"
            );

            console.log(this.pago);


            fetch("/api/ControllerPago", {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify(
                    this.pago
                )

            })

                .then(response => {

                    console.log(
                        "EDITAR PAGO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al editar pago"
                        );

                    }

                    window.location.href =
                        "/Pago";

                })

                .catch(error => {

                    console.error(
                        "EDITAR PAGO ERROR:",
                        error
                    );

                });

        },


        // ==========================================
        // ELIMINAR
        // ==========================================

        eliminarPago() {

            const id =
                this.pago.IdPago;


            console.log(
                "ELIMINAR PAGO ID:",
                id
            );


            fetch(
                "/api/ControllerPago/" + id,
                {

                    method: "DELETE"

                }
            )

                .then(response => {

                    console.log(
                        "ELIMINAR PAGO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al eliminar pago"
                        );

                    }

                    window.location.href =
                        "/Pago";

                })

                .catch(error => {

                    console.error(
                        "ELIMINAR PAGO ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");