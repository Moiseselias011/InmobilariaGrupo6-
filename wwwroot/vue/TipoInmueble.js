console.log(" TIPO INMUEBLE.JS CARGADO");

const app = Vue.createApp({

    data() {

        return {

            tipoinmuebles: [],

            buscar: "",

            pagina: 1,

            cantidadPorPagina: 10,

            total: 0,

            totalPaginas: 0,

            tipoinmueble: {

                IdTipoInmueble: 0,

                Nombre: ""

            }

        };

    },

    mounted() {

        console.log(" VUE MONTADO");

        const ruta =
            window.location.pathname;

        console.log(" RUTA:", ruta);

        if (
            ruta === "/TipoInmueble" ||
            ruta === "/TipoInmueble/"
        ) {

            this.listarTipoInmuebles();

        }

        if (
            ruta.includes("/TipoInmueble/Edit/") ||
            ruta.includes("/TipoInmueble/Delete/") ||
            ruta.includes("/TipoInmueble/Details/")
        ) {

            this.obtenerTipoInmueble();

        }

    },

    methods: {

        listarTipoInmuebles() {

            console.log(
                " LISTAR TIPO INMUEBLES EJECUTADO"
            );

            const parametros =
                new URLSearchParams({

                    pagina:
                        this.pagina,

                    cantidad:
                        this.cantidadPorPagina,

                    buscar:
                        this.buscar

                });

            fetch(
                "/api/ControllerTipoInmueble/paginado-tipos?" +
                parametros.toString()
            )

                .then(response => {

                    console.log(
                        " RESPUESTA LISTAR:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener tipos de inmueble"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " TIPOS DE INMUEBLE:",
                        data
                    );

                    this.tipoinmuebles =
                        data.datos;

                    this.pagina =
                        data.pagina;

                    this.total =
                        data.total;

                    this.totalPaginas =
                        data.totalPaginas;

                })

                .catch(error => {

                    console.error(
                        " ERROR:",
                        error
                    );

                });

        },

        buscarTipos() {

            this.pagina = 1;

            this.listarTipoInmuebles();

        },

        paginaAnterior() {

            if (this.pagina > 1) {

                this.pagina--;

                this.listarTipoInmuebles();

            }

        },

        paginaSiguiente() {

            if (
                this.pagina <
                this.totalPaginas
            ) {

                this.pagina++;

                this.listarTipoInmuebles();

            }

        },

        crearTipoInmueble() {

            console.log(
                " CREAR TIPO INMUEBLE EJECUTADO"
            );

            console.log(
                this.tipoinmueble
            );

            fetch(
                "/api/ControllerTipoInmueble",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.tipoinmueble
                        )

                }
            )

                .then(response => {

                    console.log(
                        " CREAR RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al crear tipo de inmueble"
                        );

                    }

                    window.location.href =
                        "/TipoInmueble";

                })

                .catch(error => {

                    console.error(
                        " CREAR ERROR:",
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

        obtenerTipoInmueble() {

            const id =
                this.obtenerId();

            console.log(
                " OBTENER TIPO INMUEBLE ID:",
                id
            );

            fetch(
                "/api/ControllerTipoInmueble/" +
                id
            )

                .then(response => {

                    console.log(
                        " RESPUESTA GET:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener tipo de inmueble"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " TIPO INMUEBLE:",
                        data
                    );

                    this.tipoinmueble =
                        data;

                })

                .catch(error => {

                    console.error(
                        " OBTENER ERROR:",
                        error
                    );

                });

        },

        editarTipoInmueble() {

            console.log(
                " EDITAR TIPO INMUEBLE EJECUTADO"
            );

            console.log(
                this.tipoinmueble
            );

            fetch(
                "/api/ControllerTipoInmueble",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.tipoinmueble
                        )

                }
            )

                .then(response => {

                    console.log(
                        " RESPUESTA EDIT:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al editar tipo de inmueble"
                        );

                    }

                    window.location.href =
                        "/TipoInmueble";

                })

                .catch(error => {

                    console.error(
                        " EDITAR ERROR:",
                        error
                    );

                });

        },

        eliminar() {

            const id =
                this.tipoinmueble.IdTipoInmueble;

            console.log(
                " ELIMINAR TIPO INMUEBLE ID:",
                id
            );

            fetch(
                "/api/ControllerTipoInmueble/" +
                id,
                {

                    method: "DELETE"

                }

            )

                .then(response => {

                    console.log(
                        " RESPUESTA DELETE:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al eliminar tipo de inmueble"
                        );

                    }

                    window.location.href =
                        "/TipoInmueble";

                })

                .catch(error => {

                    console.error(
                        " ELIMINAR ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");