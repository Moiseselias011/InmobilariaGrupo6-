console.log(" RESERVA.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            reservas: [],

            inquilinos: [],

            reserva: {
                IdReserva: 0,
                IdInquilino: 0,
                IdInmueble: 0,
                FechaInicio: "",
                FechaFin: "",
                MontoPorDia: 0
            },

            fechaExtensionInicio: "",
            fechaExtensionFin: "",

            fechaTerminacion: "",

            metodoPagoTerminacion: ""

        };
    },

    mounted() {

        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);
        console.log(" URL:", window.location.href);
        console.log(" PARAMETROS:", window.location.search);

        if (ruta === "/Reserva/Create") {

            const parametros =
                new URLSearchParams(window.location.search);

            console.log(
                " ID INMUEBLE URL:",
                parametros.get("idInmueble")
            );

            console.log(
                " FECHA INICIO URL:",
                parametros.get("fechaInicio")
            );

            console.log(
                " FECHA FIN URL:",
                parametros.get("fechaFin")
            );

            this.reserva.IdInmueble =
                parametros.get("idInmueble") || 0;

            this.reserva.FechaInicio =
                parametros.get("fechaInicio") || "";

            this.reserva.FechaFin =
                parametros.get("fechaFin") || "";

            console.log(
                " RESERVA CARGADA:",
                this.reserva
            );

            this.listarInquilinos();
        }

        if (
            ruta === "/Reserva" ||
            ruta === "/Reserva/"
        ) {

            this.listarReservas();

        }

        if (
            ruta.includes("/Reserva/Edit/") ||
            ruta.includes("/Reserva/Delete/") ||
            ruta.includes("/Reserva/Details/")
        ) {

            this.obtenerReserva();

        }

    },

    computed: {

        diasOriginales() {

            const inicio =
                this.convertirFecha(
                    this.reserva.FechaInicio
                );

            const fin =
                this.convertirFecha(
                    this.reserva.FechaFin
                );

            if (!inicio || !fin) {
                return 0;
            }

            const diferencia =
                fin.getTime() -
                inicio.getTime();

            return Math.round(
                diferencia /
                (1000 * 60 * 60 * 24)
            );
        },

        diasTranscurridos() {

            if (!this.fechaTerminacion) {
                return 0;
            }

            const inicio =
                this.convertirFecha(
                    this.reserva.FechaInicio
                );

            const terminacion =
                this.convertirFecha(
                    this.fechaTerminacion
                );

            if (!inicio || !terminacion) {
                return 0;
            }

            const diferencia =
                terminacion.getTime() -
                inicio.getTime();

            return Math.round(
                diferencia /
                (1000 * 60 * 60 * 24)
            );
        },

        diasRestantes() {

            if (!this.fechaTerminacion) {
                return 0;
            }

            const terminacion =
                this.convertirFecha(
                    this.fechaTerminacion
                );

            const fin =
                this.convertirFecha(
                    this.reserva.FechaFin
                );

            if (!terminacion || !fin) {
                return 0;
            }

            const diferencia =
                fin.getTime() -
                terminacion.getTime();

            return Math.round(
                diferencia /
                (1000 * 60 * 60 * 24)
            );
        },

        porcentajeMulta() {

            if (
                this.diasOriginales <= 0 ||
                this.diasTranscurridos <= 0 ||
                this.diasRestantes <= 0
            ) {
                return 0;
            }

            if (
                this.diasTranscurridos <
                this.diasOriginales / 2
            ) {

                return 0.50;

            }

            return 0.25;
        },

        porcentajeMultaTexto() {

            if (this.porcentajeMulta === 0) {
                return "0%";
            }

            return (
                this.porcentajeMulta * 100
            ) + "%";

        },

        montoRestante() {

            if (
                this.diasRestantes <= 0 ||
                !this.reserva.MontoPorDia
            ) {
                return "0.00";
            }

            const monto =
                this.diasRestantes *
                Number(this.reserva.MontoPorDia);

            return monto.toFixed(2);
        },

        montoMulta() {

            if (
                this.diasRestantes <= 0 ||
                this.porcentajeMulta <= 0
            ) {
                return "0.00";
            }

            const monto =
                Number(this.montoRestante) *
                this.porcentajeMulta;

            return monto.toFixed(2);
        }

    },

    methods: {

        convertirFecha(fecha) {

            if (!fecha) {
                return null;
            }

            const texto =
                String(fecha).substring(0, 10);

            const partes =
                texto.split("-");

            if (partes.length !== 3) {
                return null;
            }

            const anio =
                Number(partes[0]);

            const mes =
                Number(partes[1]);

            const dia =
                Number(partes[2]);

            if (
                !anio ||
                !mes ||
                !dia
            ) {
                return null;
            }

            return new Date(
                anio,
                mes - 1,
                dia
            );
        },

        listarInquilinos() {

            console.log(
                " LISTAR INQUILINOS EJECUTADO"
            );

            fetch("/api/ControllerInquilino")

                .then(response => {

                    console.log(
                        " RESPUESTA INQUILINOS:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener inquilinos"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " INQUILINOS:",
                        data
                    );

                    this.inquilinos = data;

                })

                .catch(error => {

                    console.error(
                        " ERROR INQUILINOS:",
                        error
                    );

                });

        },

        listarReservas() {

            console.log(
                " LISTAR RESERVAS EJECUTADO"
            );

            fetch("/api/ControllerReserva")

                .then(response => {

                    console.log(
                        " RESPUESTA LISTAR:",
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
                        " RESERVAS:",
                        data
                    );

                    this.reservas = data;

                })

                .catch(error => {

                    console.error(
                        " ERROR:",
                        error
                    );

                });

        },

        crearReserva() {

            console.log(
                " CREAR RESERVA EJECUTADO"
            );

            console.log(
                this.reserva
            );

            fetch(
                "/api/ControllerReserva",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.reserva
                        )

                }
            )

                .then(response => {

                    console.log(
                        " CREAR RESERVA RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al crear reserva"
                        );

                    }

                    window.location.href =
                        "/Reserva";

                })

                .catch(error => {

                    console.error(
                        " CREAR RESERVA ERROR:",
                        error
                    );

                });

        },

        obtenerId() {

            const partes =
                window.location.pathname.split("/");

            return partes[
                partes.length - 1
            ];

        },

        obtenerReserva() {

            const id =
                this.obtenerId();

            console.log(
                " OBTENER RESERVA ID:",
                id
            );

            fetch(
                "/api/ControllerReserva/ConDetalles/" +
                id
            )

                .then(response => {

                    console.log(
                        " OBTENER RESERVA RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener reserva"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " RESERVA:",
                        data
                    );

                    this.reserva =
                        data;

                })

                .catch(error => {

                    console.error(
                        " OBTENER RESERVA ERROR:",
                        error
                    );

                });

        },

        editarReserva() {

            console.log(
                " EDITAR RESERVA EJECUTADO"
            );

            console.log(
                this.reserva
            );

            fetch(
                "/api/ControllerReserva",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.reserva
                        )

                }
            )

                .then(response => {

                    console.log(
                        " EDITAR RESERVA RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al editar reserva"
                        );

                    }

                    window.location.href =
                        "/Reserva";

                })

                .catch(error => {

                    console.error(
                        " EDITAR RESERVA ERROR:",
                        error
                    );

                });

        },

        extenderReserva() {

            const id =
                this.reserva.IdReserva;

            console.log(
                " EXTENDER RESERVA ID:",
                id
            );

            console.log(
                " NUEVA FECHA INICIO:",
                this.fechaExtensionInicio
            );

            console.log(
                " NUEVA FECHA FIN:",
                this.fechaExtensionFin
            );

            if (
                !this.fechaExtensionInicio ||
                !this.fechaExtensionFin
            ) {

                alert(
                    "Debe seleccionar las nuevas fechas."
                );

                return;

            }

            if (
                this.fechaExtensionInicio >=
                this.fechaExtensionFin
            ) {

                alert(
                    "La fecha de inicio debe ser anterior a la fecha de fin."
                );

                return;

            }

            fetch(
                "/api/ControllerReserva/Extender/" +
                id,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        FechaInicio:
                            this.fechaExtensionInicio,

                        FechaFin:
                            this.fechaExtensionFin

                    })

                }
            )

                .then(async response => {

                    console.log(
                        " EXTENSION RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        const mensaje =
                            await response.text();

                        throw new Error(
                            mensaje ||
                            "No se pudo extender la reserva."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " NUEVA RESERVA:",
                        data
                    );

                    alert(
                        "La extensión fue creada correctamente."
                    );

                    window.location.href =
                        "/Reserva";

                })

                .catch(error => {

                    console.error(
                        " ERROR EXTENSION:",
                        error
                    );

                    alert(
                        error.message
                    );

                });

        },

        terminarReserva() {

            const id =
                this.reserva.IdReserva;

            console.log(
                " TERMINAR RESERVA ID:",
                id
            );

            console.log(
                " FECHA TERMINACION:",
                this.fechaTerminacion
            );

            console.log(
                " FECHA INICIO:",
                this.reserva.FechaInicio
            );

            console.log(
                " FECHA FIN:",
                this.reserva.FechaFin
            );

            console.log(
                " DÍAS ORIGINALES:",
                this.diasOriginales
            );

            console.log(
                " DÍAS TRANSCURRIDOS:",
                this.diasTranscurridos
            );

            console.log(
                " DÍAS RESTANTES:",
                this.diasRestantes
            );

            console.log(
                " PORCENTAJE:",
                this.porcentajeMultaTexto
            );

            console.log(
                " MULTA:",
                this.montoMulta
            );

            if (!this.fechaTerminacion) {

                alert(
                    "Debe seleccionar la fecha de terminación."
                );

                return;

            }

            const inicio =
                this.convertirFecha(
                    this.reserva.FechaInicio
                );

            const terminacion =
                this.convertirFecha(
                    this.fechaTerminacion
                );

            const fin =
                this.convertirFecha(
                    this.reserva.FechaFin
                );

            if (!inicio || !terminacion || !fin) {

                alert(
                    "No se pudieron interpretar correctamente las fechas."
                );

                return;

            }

            if (
                terminacion.getTime() <=
                inicio.getTime()
            ) {

                alert(
                    "La fecha de terminación debe ser posterior a la fecha de inicio."
                );

                return;

            }

            if (
                terminacion.getTime() >=
                fin.getTime()
            ) {

                alert(
                    "La fecha de terminación debe ser anterior a la fecha de fin original."
                );

                return;

            }

            if (!this.metodoPagoTerminacion) {

                alert(
                    "Debe seleccionar un método de pago."
                );

                return;

            }

            const confirmar =
                confirm(
                    "La multa será de $" +
                    this.montoMulta +
                    ". ¿Desea pagar la multa y finalizar la reserva?"
                );

            if (!confirmar) {
                return;
            }

            fetch(
                "/api/ControllerReserva/Terminar/" +
                id,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        FechaTerminacion:
                            this.fechaTerminacion,

                        MetodoPago:
                            this.metodoPagoTerminacion

                    })

                }
            )

                .then(async response => {

                    console.log(
                        " TERMINAR RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        const mensaje =
                            await response.text();

                        throw new Error(
                            mensaje ||
                            "No se pudo terminar la reserva."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " TERMINACIÓN COMPLETADA:",
                        data
                    );

                    alert(
                        "La reserva fue terminada correctamente.\n" +
                        "Multa registrada: $" +
                        data.montoMulta
                    );

                    this.obtenerReserva();

                    this.fechaTerminacion =
                        "";

                    this.metodoPagoTerminacion =
                        "";

                })

                .catch(error => {

                    console.error(
                        " ERROR TERMINACIÓN:",
                        error
                    );

                    alert(
                        error.message
                    );

                });

        },

        eliminar() {

            const id =
                this.reserva.IdReserva;

            console.log(
                " ELIMINAR RESERVA ID:",
                id
            );

            fetch(
                "/api/ControllerReserva/" +
                id,
                {

                    method: "DELETE"

                })

                .then(response => {

                    console.log(
                        " ELIMINAR RESERVA RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al eliminar reserva"
                        );

                    }

                    window.location.href =
                        "/Reserva";

                })

                .catch(error => {

                    console.error(
                        " ELIMINAR RESERVA ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");