const app = Vue.createApp({

    data() {
        return {

            reporteSeleccionado: "inmuebles",

            inmuebles: [],

            propietarios: [],

            reservas: [],

            pagos: [],

            filtroDisponible: "",

            idPropietario: "",

            fechaInicio: "",

            fechaFin: "",

            idReserva: ""

        };
    },

    mounted() {

        this.listarInmuebles();
        this.listarPropietarios();

    },

    methods: {

        listarInmuebles() {

            let url =
                "/api/ReporteApi/Inmuebles";

            if (this.filtroDisponible !== "") {

                url +=
                    "?disponible=" +
                    this.filtroDisponible;

            }

            fetch(url)

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener los inmuebles."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.inmuebles = data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al cargar los inmuebles."
                    );

                });

        },

        listarPropietarios() {

            fetch(
                "/api/ControllerPropietario"
            )

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener los propietarios."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.propietarios =
                        data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al cargar los propietarios."
                    );

                });

        },

        listarInmueblesPorPropietario() {

            if (this.idPropietario === "") {

                alert(
                    "Seleccione un propietario."
                );

                return;

            }

            fetch(
                "/api/ReporteApi/InmueblesPorPropietario/" +
                this.idPropietario
            )

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener los inmuebles."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.inmuebles =
                        data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al cargar los inmuebles del propietario."
                    );

                });

        },

        listarReservasPorPeriodo() {

            if (
                this.fechaInicio === "" ||
                this.fechaFin === ""
            ) {

                alert(
                    "Seleccione las dos fechas."
                );

                return;

            }

            fetch(
                "/api/ReporteApi/ReservasPorPeriodo" +
                "?fechaInicio=" +
                this.fechaInicio +
                "&fechaFin=" +
                this.fechaFin
            )

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener las reservas."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.reservas =
                        data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al cargar las reservas."
                    );

                });

        },

        listarPagosReserva() {

            if (this.idReserva === "") {

                alert(
                    "Ingrese una reserva."
                );

                return;

            }

            fetch(
                "/api/ReporteApi/PagosReserva/" +
                this.idReserva
            )

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener los pagos."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.pagos =
                        data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al cargar los pagos."
                    );

                });

        },

        listarInmueblesDisponibles() {

            if (
                this.fechaInicio === "" ||
                this.fechaFin === ""
            ) {

                alert(
                    "Seleccione las dos fechas."
                );

                return;

            }

            fetch(
                "/api/ReporteApi/InmueblesDisponibles" +
                "?fechaInicio=" +
                this.fechaInicio +
                "&fechaFin=" +
                this.fechaFin
            )

                .then(response => {

                    if (!response.ok) {

                        throw new Error(
                            "No se pudieron obtener los inmuebles disponibles."
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    this.inmuebles =
                        data;

                })

                .catch(error => {

                    console.error(error);

                    alert(
                        "Error al buscar inmuebles disponibles."
                    );

                });

        }

    }

});

app.mount("#app");