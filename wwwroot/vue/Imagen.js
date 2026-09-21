console.log("Imagen.JS CARGADO");

const app = Vue.createApp({

    data() {
        return {

            imagenes: [],
            inmuebles: [],
            archivos: [],

            archivosSeleccionados: [],
            imagenesSeleccionadas: [],
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

        console.log("VUE MONTADO");

        const ruta = window.location.pathname;

        console.log("RUTA:", ruta);

        if (ruta === "/Imagen" || ruta === "/Imagen/") {

            this.listarImagenes();

        }

        if (ruta === "/Imagen/Create" || ruta === "/Imagen/Create/") {

            this.listarInmuebles();

        }

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

        listarImagenes() {

            console.log("LISTAR IMAGENES EJECUTADO");

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

        listarInmuebles() {

            console.log(
                "LISTAR INMUEBLES EJECUTADO"
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

        seleccionarArchivos(event) {

            const archivos = Array.from(
                event.target.files
            );

            this.archivosSeleccionados = archivos;

            this.imagenesSeleccionadas =
                archivos.map(archivo => ({
                    nombre: archivo.name,
                    url: URL.createObjectURL(archivo)
                }));

            this.imagenPortada = "";

            console.log(
                "ARCHIVOS SELECCIONADOS:",
                archivos
            );

        },

        seleccionarPortada(imagen) {

            this.imagenPortada =
                imagen.nombre;

            console.log(
                "PORTADA:",
                this.imagenPortada
            );

        },

        crearImagen() {

            console.log(
                "CREAR IMAGEN EJECUTADO"
            );

            if (!this.imagen.IdInmueble) {

                alert(
                    "Seleccione un inmueble."
                );

                return;

            }

            if (
                this.archivosSeleccionados.length === 0
            ) {

                alert(
                    "Seleccione al menos una imagen."
                );

                return;

            }

            if (this.imagenPortada === "") {

                alert(
                    "Seleccione una imagen de portada."
                );

                return;

            }

            const formData = new FormData();

            formData.append(
                "idInmueble",
                this.imagen.IdInmueble
            );

            formData.append(
                "portada",
                this.imagenPortada
            );

            this.archivosSeleccionados.forEach(
                archivo => {

                    formData.append(
                        "archivos",
                        archivo
                    );

                }
            );

            fetch(
                "/api/ControllerImagen/subir",
                {
                    method: "POST",
                    body: formData
                }
            )

                .then(response => {

                    console.log(
                        "RESPUESTA SUBIDA:",
                        response.status
                    );

                    if (!response.ok) {

                        return response.text()
                            .then(mensaje => {

                                throw new Error(
                                    mensaje
                                );

                            });

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        "IMAGENES GUARDADAS:",
                        data
                    );

                    window.location.href =
                        "/Imagen";

                })

                .catch(error => {

                    console.error(
                        "ERROR AL SUBIR:",
                        error
                    );

                    alert(
                        error.message ||
                        "Ocurrió un error al subir las imágenes."
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

        obtenerImagen() {

            const id =
                this.obtenerId();

            console.log(
                "OBTENER IMAGEN ID:",
                id
            );

            fetch(
                "/api/ControllerImagen/" + id
            )

                .then(response => {

                    console.log(
                        "OBTENER IMAGEN RESPUESTA:",
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
                        "IMAGEN:",
                        data
                    );

                    this.imagen = data;

                })

                .catch(error => {

                    console.error(
                        "OBTENER IMAGEN ERROR:",
                        error
                    );

                });

        },

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

        editarImagen() {

            console.log(
                "EDITAR IMAGEN EJECUTADO"
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
                        "EDITAR IMAGEN RESPUESTA:",
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
                        "EDITAR IMAGEN ERROR:",
                        error
                    );

                });

        },

        eliminar() {

            const id =
                this.imagen.IdImagen;

            console.log(
                "ELIMINAR IMAGEN ID:",
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
                        "ELIMINAR IMAGEN RESPUESTA:",
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
                        "ELIMINAR IMAGEN ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");