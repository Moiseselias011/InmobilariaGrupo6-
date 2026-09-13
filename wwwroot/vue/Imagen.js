console.log(" Imagen.JS CARGADO");

const app = Vue.createApp({


data() {
    return {

        imagenes: [],
        inmuebles: [],
        archivos: [],

        // Imágenes seleccionadas
        imagenesSeleccionadas: [],

        // Imagen elegida como portada
        imagenPortada: "",

        imagen: {
            IdImagen: 0,
            IdInmueble: 0,
            Url: "",
            EsPortada: false
        }
    };
},

mounted() {

    console.log(" VUE MONTADO");

    const ruta = window.location.pathname;

    console.log(" RUTA:", ruta);


    // =========================
    // LISTA
    // =========================

    if (ruta === "/Imagen" || ruta === "/Imagen/") {

        this.listarImagenes();

    }


    // =========================
    // CREAR
    // =========================

    if (ruta === "/Imagen/Create" || ruta === "/Imagen/Create/") {

        this.listarInmuebles();

        this.listarArchivos();

    }


    // =========================
    // EDITAR / ELIMINAR / DETAILS
    // =========================

    if (
        ruta.includes("/Imagen/Edit/") ||
        ruta.includes("/Imagen/Delete/") ||
        ruta.includes("/Imagen/Details/")
    ) {

        this.obtenerImagen();

    }


    if (ruta.includes("/Imagen/Edit/")) {

        this.listarInmuebles();

    }


    if (ruta.includes("/Imagen/Details/")) {

        this.listarInmuebles();

    }

},


methods: {

    // =========================
    // LISTAR IMAGENES
    // =========================

    listarImagenes() {

        console.log(" LISTAR IMAGENES EJECUTADO");

        fetch("/api/ControllerImagen")

            .then(response => {

                console.log(
                    "RESPUESTA LISTAR:",
                    response.status
                );

                if (!response.ok) {

                    throw new Error(
                        "Error al obtener Imagenes"
                    );

                }

                return response.json();

            })

            .then(data => {

                console.log(
                    "IMAGENES:",
                    data
                );

                this.imagenes = data;

            })

            .catch(error => {

                console.error(
                    "ERROR:",
                    error
                );

            });

    },


    // =========================
    // LISTAR INMUEBLES
    // =========================

    listarInmuebles() {

        console.log(
            " LISTAR INMUEBLES EJECUTADO"
        );

        fetch("/api/ControllerInmueble")

            .then(response => {

                console.log(
                    "RESPUESTA INMUEBLES:",
                    response.status
                );

                if (!response.ok) {

                    throw new Error(
                        "Error al obtener Inmuebles"
                    );

                }

                return response.json();

            })

            .then(data => {

                console.log(
                    "INMUEBLES:",
                    data
                );

                this.inmuebles = data;

            })

            .catch(error => {

                console.error(
                    "ERROR INMUEBLES:",
                    error
                );

            });

    },


    // =========================
    // LISTAR ARCHIVOS
    // =========================

    listarArchivos() {

        console.log(
            " LISTAR ARCHIVOS EJECUTADO"
        );

        fetch("/api/ControllerImagen/archivos")

            .then(response => {

                console.log(
                    "RESPUESTA ARCHIVOS:",
                    response.status
                );

                if (!response.ok) {

                    throw new Error(
                        "Error al obtener archivos"
                    );

                }

                return response.json();

            })

            .then(data => {

                console.log(
                    "ARCHIVOS:",
                    data
                );

                this.archivos = data;

            })

            .catch(error => {

                console.error(
                    "ERROR ARCHIVOS:",
                    error
                );

            });

    },


    // =========================
    // SELECCIONAR VARIAS IMAGENES
    // =========================

    seleccionarImagen(archivo) {

        console.log(
            " IMAGEN CLICKEADA:",
            archivo
        );


        const indice =
            this.imagenesSeleccionadas.indexOf(
                archivo
            );


        // Si ya estaba seleccionada,
        // la quitamos

        if (indice !== -1) {

            this.imagenesSeleccionadas.splice(
                indice,
                1
            );


            console.log(
                " IMAGEN QUITADA:",
                archivo
            );


            // Si era la portada,
            // también quitamos la portada

            if (this.imagenPortada === archivo) {

                this.imagenPortada = "";

            }

        }

        // Si no estaba seleccionada,
        // la agregamos

        else {

            this.imagenesSeleccionadas.push(
                archivo
            );


            console.log(
                " IMAGEN AGREGADA:",
                archivo
            );

        }


        console.log(
            " IMAGENES SELECCIONADAS:",
            this.imagenesSeleccionadas
        );

    },


    // =========================
    // SELECCIONAR PORTADA
    // =========================

    seleccionarPortada(imagen) {

        console.log(
            " PORTADA SELECCIONADA:",
            imagen
        );


        this.imagenPortada = imagen;


        console.log(
            " IMAGEN PORTADA:",
            this.imagenPortada
        );

    },


    // =========================
    // CREAR VARIAS IMAGENES
    // =========================

    crearImagen() {

        console.log(
            " CREAR IMAGEN EJECUTADO"
        );


        // Verificar inmueble

        if (!this.imagen.IdInmueble) {

            alert(
                "Seleccione un inmueble."
            );

            return;

        }


        // Verificar imágenes

        if (
            this.imagenesSeleccionadas.length === 0
        ) {

            alert(
                "Seleccione al menos una imagen."
            );

            return;

        }


        // Verificar portada

        if (this.imagenPortada === "") {

            alert(
                "Seleccione una imagen de portada."
            );

            return;

        }


        console.log(
            " INMUEBLE:",
            this.imagen.IdInmueble
        );

        console.log(
            " IMAGENES SELECCIONADAS:",
            this.imagenesSeleccionadas
        );

        console.log(
            " PORTADA:",
            this.imagenPortada
        );


        // Crear un POST por cada imagen

        const peticiones =
            this.imagenesSeleccionadas.map(
                archivo => {

                    const nuevaImagen = {

                        IdImagen: 0,

                        IdInmueble:
                            Number(
                                this.imagen.IdInmueble
                            ),

                        Url: archivo,

                        EsPortada:
                            archivo ===
                            this.imagenPortada

                    };


                    console.log(
                        " GUARDANDO IMAGEN:",
                        nuevaImagen
                    );


                    return fetch(
                        "/api/ControllerImagen",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    nuevaImagen
                                )

                        }

                    );

                }
            );


        // Esperar a que terminen todos los POST

        Promise.all(peticiones)

            .then(respuestas => {

                console.log(
                    " RESPUESTAS:",
                    respuestas
                );


                // Verificar que todos
                // hayan sido exitosos

                for (
                    const response of respuestas
                ) {

                    if (!response.ok) {

                        throw new Error(
                            "Error al guardar una de las imágenes."
                        );

                    }

                }


                console.log(
                    " TODAS LAS IMAGENES GUARDADAS"
                );


                // Volver a Lista de Imagen

                window.location.href =
                    "/Imagen";

            })

            .catch(error => {

                console.error(
                    " ERROR AL GUARDAR IMAGENES:",
                    error
                );

                alert(
                    "Ocurrió un error al guardar las imágenes."
                );

            });

    },


    // =========================
    // OBTENER ID
    // =========================

    obtenerId() {

        const partes =
            window.location.pathname.split("/");

        return partes[
            partes.length - 1
        ];

    },


    // =========================
    // OBTENER IMAGEN
    // =========================

    obtenerImagen() {

        const id =
            this.obtenerId();


        console.log(
            " OBTENER IMAGEN ID:",
            id
        );


        fetch(
            "/api/ControllerImagen/" + id
        )

            .then(response => {

                console.log(
                    " OBTENER IMAGEN RESPUESTA:",
                    response.status
                );


                if (!response.ok) {

                    throw new Error(
                        "Error al obtener Imagen"
                    );

                }


                return response.json();

            })

            .then(data => {

                console.log(
                    " IMAGEN:",
                    data
                );


                this.imagen = data;

            })

            .catch(error => {

                console.error(
                    " OBTENER IMAGEN ERROR:",
                    error
                );

            });

    },


    // =========================
    // OBTENER DIRECCION INMUEBLE
    // =========================

    obtenerDireccionInmueble() {

        const inmueble =
            this.inmuebles.find(

                inmueble =>
                    inmueble.IdInmueble ===
                    this.imagen.IdInmueble

            );


        if (inmueble) {

            return inmueble.Direccion;

        }


        return "Inmueble no encontrado";

    },


    // =========================
    // EDITAR IMAGEN
    // =========================

    editarImagen() {

        console.log(
            " EDITAR IMAGEN EJECUTADO"
        );


        console.log(
            this.imagen
        );


        fetch(
            "/api/ControllerImagen",
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(
                        this.imagen
                    )

            }

        )

            .then(response => {

                console.log(
                    " EDITAR IMAGEN RESPUESTA:",
                    response.status
                );


                if (!response.ok) {

                    throw new Error(
                        "Error al editar Imagen"
                    );

                }


                window.location.href =
                    "/Imagen";

            })

            .catch(error => {

                console.error(
                    " EDITAR IMAGEN ERROR:",
                    error
                );

            });

    },


    // =========================
    // ELIMINAR
    // =========================

    eliminar() {

        const id =
            this.imagen.IdImagen;


        console.log(
            " ELIMINAR IMAGEN ID:",
            id
        );


        fetch(
            "/api/ControllerImagen/" + id,
            {

                method: "DELETE"

            }

        )

            .then(response => {

                console.log(
                    " ELIMINAR IMAGEN RESPUESTA:",
                    response.status
                );


                if (!response.ok) {

                    throw new Error(
                        "Error al eliminar Imagen"
                    );

                }


                window.location.href =
                    "/Imagen";

            })

            .catch(error => {

                console.error(
                    " ELIMINAR IMAGEN ERROR:",
                    error
                );

            });

    }

}


});

app.mount("#app");
