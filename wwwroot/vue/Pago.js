console.log("PAGO.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            pagos: [],

            reservas: [],

            reservaSeleccionada: null,

            pago: {
                IdPago: 0,
                IdReserva: 0,
                FechaPago: "",
                Monto: 0,
                MetodoPago: "",
                IdUsuarioCreacion: 0,
                UsuarioCreacion: null,
                IdUsuarioAnulacion: null,
                UsuarioAnulacion: null,
                Anulado: false
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


        // CREATE

        if (
            ruta === "/Pago/Create" ||
            ruta === "/Pago/Create/"
        ) {

            this.listarReservas();

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

    computed: {

        cantidadDias() {

            if (!this.reservaSeleccionada) {

                return 0;

            }

            const fechaInicio =
                new Date(
                    this.reservaSeleccionada.FechaInicio
                );

            const fechaFin =
                new Date(
                    this.reservaSeleccionada.FechaFin
                );

            const diferencia =
                fechaFin - fechaInicio;

            return Math.ceil(
                diferencia /
                (1000 * 60 * 60 * 24)
            );

        }

    },

    methods: {


        // INDEX

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


        // LISTAR RESERVAS

        listarReservas() {

            console.log(
                "LISTAR RESERVAS PARA PAGOS"
            );

            fetch("/api/ControllerPago/Reservas")

                .then(response => {

                    console.log(
                        "RESPUESTA RESERVAS:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener reservas"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "RESERVAS:",
                        data
                    );

                    this.reservas = data;

                })

                .catch(error => {

                    console.error(
                        "ERROR RESERVAS:",
                        error
                    );

                });

        },


        // SELECCIONAR RESERVA

        seleccionarReserva() {

            console.log(
                "RESERVA SELECCIONADA:",
                this.pago.IdReserva
            );

            const id =
                Number(
                    this.pago.IdReserva
                );

            this.reservaSeleccionada =
                this.reservas.find(
                    reserva =>
                        Number(
                            reserva.IdReserva
                        ) === id
                );

            console.log(
                "DATOS RESERVA:",
                this.reservaSeleccionada
            );

            if (!this.reservaSeleccionada) {

                this.pago.Monto = 0;

                return;

            }

            // Calcular monto

            const fechaInicio =
                new Date(
                    this.reservaSeleccionada.FechaInicio
                );

            const fechaFin =
                new Date(
                    this.reservaSeleccionada.FechaFin
                );

            const diferencia =
                fechaFin - fechaInicio;

            const dias =
                Math.ceil(
                    diferencia /
                    (1000 * 60 * 60 * 24)
                );

            this.pago.Monto =
                dias *
                Number(
                    this.reservaSeleccionada.MontoPorDia
                );

            console.log(
                "DÍAS:",
                dias
            );

            console.log(
                "MONTO TOTAL:",
                this.pago.Monto
            );

        },


        // CREATE

        crearPago() {

            console.log(
                "CREAR PAGO EJECUTADO"
            );

            console.log(
                this.pago
            );

            if (
                !this.pago.IdReserva ||
                this.pago.IdReserva == 0
            ) {

                alert(
                    "Debe seleccionar una reserva."
                );

                return;

            }

            if (!this.pago.FechaPago) {

                alert(
                    "Debe seleccionar la fecha de pago."
                );

                return;

            }

            if (!this.pago.MetodoPago) {

                alert(
                    "Debe seleccionar un método de pago."
                );

                return;

            }

            fetch(
                "/api/ControllerPago",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.pago
                        )

                }
            )

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

                    window.location.href =
                        "/Pago";

                })

                .catch(error => {

                    console.error(
                        "CREAR PAGO ERROR:",
                        error
                    );

                    alert(
                        "No se pudo crear el pago."
                    );

                });

        },


        // OBTENER ID

        obtenerId() {

            const partes =
                window.location.pathname.split("/");

            return partes[
                partes.length - 1
            ];

        },


        // OBTENER PAGO

        obtenerPago() {

            const id =
                this.obtenerId();

            console.log(
                "OBTENER PAGO ID:",
                id
            );

            fetch(
                "/api/ControllerPago/ConDetalles/" +
                id
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

                    this.pago =
                        data;

                })

                .catch(error => {

                    console.error(
                        "OBTENER PAGO ERROR:",
                        error
                    );

                });

        },


        // EDITAR

        editarPago() {

            console.log(
                "EDITAR PAGO EJECUTADO"
            );

            console.log(
                this.pago
            );

            fetch(
                "/api/ControllerPago",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.pago
                        )

                }
            )

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


        // ANULAR PAGO

        eliminarPago() {

            const id =
                this.pago.IdPago;

            console.log(
                "ANULAR PAGO ID:",
                id
            );

            fetch(
                "/api/ControllerPago/Anular/" +
                id,
                {

                    method: "PUT"

                }
            )

                .then(response => {

                    console.log(
                        "ANULAR PAGO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al anular pago"
                        );

                    }

                    window.location.href =
                        "/Pago";

                })

                .catch(error => {

                    console.error(
                        "ANULAR PAGO ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");