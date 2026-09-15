
console.log("INMUEBLE.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            inmuebles: [],
            tipos: [],
            imagenes: [],

            inmueble: {
                IdInmueble: 0,
                IdPropietario: 0,
                IdTipoInmueble: 0,
                Direccion: "",
                Cupo: 0,
                Coordenadas: "",
                PrecioPorDia: 0,
                Disponible: false,
                ImagenPortada: ""
            }
        };
    },

    mounted() {

        console.log("VUE MONTADO");

        const ruta = window.location.pathname;

        console.log("RUTA:", ruta);

        // Index
        if (
            ruta === "/Inmueble" ||
            ruta === "/Inmueble/"
        ) {
            this.listarInmueble();
        }

        // Create
        if (
            ruta === "/Inmueble/Create" ||
            ruta === "/Inmueble/Create/"
        ) {
            this.listarTipos();
        }

        // Edit, Delete y Details
        if (
            ruta.includes("/Inmueble/Edit/") ||
            ruta.includes("/Inmueble/Delete/") ||
            ruta.includes("/Inmueble/Details/")
        ) {
            this.obtenerInmueble();
        }

        // Edit
        if (
            ruta.includes("/Inmueble/Edit/")
        ) {
            this.listarTipos();
        }

    },

    methods: {

        // Listar inmuebles disponibles
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

                    // Mostrar solo disponibles
                    inmuebles = inmuebles.filter(
                        inmueble => inmueble.Disponible === true
                    );

                    console.log(
                        "INMUEBLES DISPONIBLES:",
                        inmuebles
                    );

                    console.log(
                        "VOY A BUSCAR IMAGENES"
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

                            // Buscar portada
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

        // Listar tipos
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

        // Crear inmueble
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

        // Obtener ID
        obtenerId() {

            const partes =
                window.location.pathname.split("/");

            return partes[
                partes.length - 1
            ];

        },

        // Obtener inmueble
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

                    // Buscar imágenes en Details
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

        // Listar imágenes
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

                    // Filtrar imágenes del inmueble
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

        // Editar inmueble
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

        // Eliminar inmueble
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

