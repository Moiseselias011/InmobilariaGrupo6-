console.log("INMUEBLE.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            inmuebles: [],
            tipos: [],
            propietarios: [],
            imagenes: [],

            inmueble: {

                IdInmueble: 0,

                IdPropietario: 0,

                IdTipoInmueble: 0,

                Direccion: "",

                Cupo: 0,

                Coordenadas: "",

                PrecioPorDia: 0,

                PorcentajeSena: 0,

                Disponible: false,

                ImagenPortada: ""

            }
        };
    },

    mounted() {

        console.log("VUE MONTADO");

        const ruta = window.location.pathname;

        console.log("RUTA:", ruta);

        if (
            ruta === "/Inmueble" ||
            ruta === "/Inmueble/"
        ) {
            this.listarInmueble();
        }

        if (
            ruta === "/Inmueble/Create" ||
            ruta === "/Inmueble/Create/"
        ) {
            this.listarTipos();
            this.listarPropietarios();
        }

        if (
            ruta.includes("/Inmueble/Edit/") ||
            ruta.includes("/Inmueble/Delete/") ||
            ruta.includes("/Inmueble/Details/")
        ) {
            this.obtenerInmueble();
        }

        if (
            ruta.includes("/Inmueble/Edit/")
        ) {
            this.listarTipos();
            this.listarPropietarios();
        }

    },

    methods: {

        listarInmueble() {

            console.log("LISTAR INMUEBLE EJECUTADO");

            fetch("/api/ControllerInmueble")

                .then(response => {

                    console.log(
                        "RESPUESTA INMUEBLES:",
                        response.status
                    );

                    if (!response.ok) {
                        throw new Error(
                            "Error al obtener inmuebles"
                        );
                    }

                    return response.json();

                })

                .then(inmuebles => {

                    console.log(
                        "INMUEBLES:",
                        inmuebles
                    );

                    inmuebles = inmuebles.filter(
                        inmueble => inmueble.Disponible === true
                    );

                    console.log(
                        "INMUEBLES DISPONIBLES:",
                        inmuebles
                    );

                    return fetch(
                        "/api/ControllerImagen"
                    )

                        .then(response => {

                            console.log(
                                "RESPUESTA IMAGENES:",
                                response.status
                            );

                            if (!response.ok) {
                                throw new Error(
                                    "Error al obtener imágenes"
                                );
                            }

                            return response.json();

                        })

                        .then(imagenes => {

                            console.log(
                                "IMAGENES:",
                                imagenes
                            );

                            inmuebles.forEach(
                                inmueble => {

                                    const imagenPortada =
                                        imagenes.find(
                                            imagen =>
                                                Number(
                                                    imagen.IdInmueble
                                                ) ===
                                                Number(
                                                    inmueble.IdInmueble
                                                ) &&
                                                imagen.EsPortada === true
                                        );

                                    console.log(
                                        "INMUEBLE:",
                                        inmueble.IdInmueble,
                                        "PORTADA:",
                                        imagenPortada
                                    );

                                    if (imagenPortada) {

                                        inmueble.ImagenPortada =
                                            imagenPortada.Url;

                                    }
                                    else {

                                        inmueble.ImagenPortada =
                                            "";

                                    }

                                }
                            );

                            this.inmuebles =
                                inmuebles;

                            console.log(
                                "INMUEBLES DISPONIBLES CON PORTADA:",
                                this.inmuebles
                            );

                        });

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
                        error
                    );

                });

        },

        listarTipos() {

            console.log(
                "LISTAR TIPOS EJECUTADO"
            );

            fetch(
                "/api/ControllerTipoInmueble"
            )

                .then(response => {

                    console.log(
                        "RESPUESTA TIPOS:",
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
                        "TIPOS:",
                        data
                    );

                    this.tipos =
                        data;

                })

                .catch(error => {

                    console.error(
                        "ERROR TIPOS:",
                        error
                    );

                });

        },

        listarPropietarios() {

            console.log(
                "LISTAR PROPIETARIOS EJECUTADO"
            );

            fetch(
                "/api/ControllerPropietario"
            )

                .then(response => {

                    console.log(
                        "RESPUESTA PROPIETARIOS:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener propietarios"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "PROPIETARIOS:",
                        data
                    );

                    this.propietarios =
                        data;

                })

                .catch(error => {

                    console.error(
                        "ERROR PROPIETARIOS:",
                        error
                    );

                });

        },

        crearInmueble() {

            console.log(
                "CREAR INMUEBLE EJECUTADO"
            );

            console.log(
                this.inmueble
            );

            fetch(
                "/api/ControllerInmueble",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.inmueble
                        )

                }
            )

                .then(response => {

                    console.log(
                        "CREAR INMUEBLE RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al crear inmueble"
                        );

                    }

                    window.location.href =
                        "/Inmueble";

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
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

        obtenerInmueble() {

            const id =
                this.obtenerId();

            console.log(
                "OBTENER INMUEBLE ID:",
                id
            );

            fetch(
                "/api/ControllerInmueble/" +
                id
            )

                .then(response => {

                    console.log(
                        "RESPUESTA GET:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener inmueble"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "INMUEBLE:",
                        data
                    );

                    this.inmueble =
                        data;

                    const ruta =
                        window.location.pathname;

                    if (
                        ruta.includes(
                            "/Inmueble/Details/"
                        )
                    ) {

                        this.listarImagenes();

                    }

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
                        error
                    );

                });

        },

        listarImagenes() {

            console.log(
                "LISTAR IMAGENES DEL INMUEBLE"
            );

            fetch(
                "/api/ControllerImagen"
            )

                .then(response => {

                    console.log(
                        "RESPUESTA IMAGENES:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener imágenes"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "TODAS LAS IMAGENES:",
                        data
                    );

                    const id =
                        Number(
                            this.inmueble.IdInmueble
                        );

                    this.imagenes =
                        data.filter(
                            imagen =>
                                Number(
                                    imagen.IdInmueble
                                ) === id
                        );

                    console.log(
                        "IMAGENES DEL INMUEBLE:",
                        this.imagenes
                    );

                })

                .catch(error => {

                    console.error(
                        "ERROR IMAGENES:",
                        error
                    );

                });

        },

        editarInmueble() {

            console.log(
                "EDITAR INMUEBLE EJECUTADO"
            );

            console.log(
                this.inmueble
            );

            fetch(
                "/api/ControllerInmueble",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.inmueble
                        )

                }
            )

                .then(response => {

                    console.log(
                        "RESPUESTA EDIT:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al editar inmueble"
                        );

                    }

                    window.location.href =
                        "/Inmueble";

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
                        error
                    );

                });

        },

        eliminar() {

            const id =
                this.inmueble.IdInmueble;

            console.log(
                "ELIMINAR INMUEBLE ID:",
                id
            );

            fetch(
                "/api/ControllerInmueble/" +
                id,
                {

                    method: "DELETE"

                }
            )

                .then(response => {

                    console.log(
                        "RESPUESTA DELETE:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al eliminar inmueble"
                        );

                    }

                    window.location.href =
                        "/Inmueble";

                })

                .catch(error => {

                    console.error(
                        "ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");