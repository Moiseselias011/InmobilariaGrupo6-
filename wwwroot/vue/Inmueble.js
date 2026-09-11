
console.log(" INMUEBLE.JS CARGADO");

const app = Vue.createApp({
    data() {
        return {
            inmuebles: [],

            tipos: [],

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
        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);

        // INDEX
        if (ruta === "/Inmueble" || ruta === "/Inmueble/") {
            this.listarInmueble();
        }

        // CREATE
        if (ruta === "/Inmueble/Create" || ruta === "/Inmueble/Create/") {
            this.listarTipos();
        }

        // EDIT, DELETE y DETAILS
        if (
            ruta.includes("/Inmueble/Edit/") ||
            ruta.includes("/Inmueble/Delete/") ||
            ruta.includes("/Inmueble/Details/")
        ) {
            this.obtenerInmueble();
        }

        // EDIT
        if (ruta.includes("/Inmueble/Edit/")) {
            this.listarTipos();
        }
    },

    methods: {

        // INDEX

        listarInmueble() {
            console.log(" LISTAR INMUEBLE EJECUTADO");

            fetch("/api/ControllerInmueble")
                .then(response => {
                    console.log(" RESPUESTA LISTAR:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener inmuebles");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" INMUEBLES:", data);

                    this.inmuebles = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


        // TIPOS DE INMUEBLE

        listarTipos() {
            console.log(" LISTAR TIPOS EJECUTADO");

            fetch("/api/ControllerTipoInmueble")
                .then(response => {
                    console.log(" RESPUESTA TIPOS:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener tipos de inmueble");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" TIPOS:", data);

                    this.tipos = data;
                })
                .catch(error => {
                    console.error(" ERROR TIPOS:", error);
                });
        },


        // CREATE

        crearInmueble() {
            console.log(" CREAR INMUEBLE EJECUTADO");
            console.log(this.inmueble);

            fetch("/api/ControllerInmueble", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.inmueble)
            })
                .then(response => {
                    console.log(" CREAR INMUEBLE RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al crear inmueble");
                    }

                    window.location.href = "/Inmueble";
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


        // EDIT / DELETE / DETAILS

        obtenerId() {
            const partes = window.location.pathname.split("/");

            return partes[partes.length - 1];
        },


        obtenerInmueble() {
            const id = this.obtenerId();

            console.log(" OBTENER INMUEBLE ID:", id);

            fetch("/api/ControllerInmueble/" + id)
                .then(response => {
                    console.log(" RESPUESTA GET:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener inmueble");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" INMUEBLE:", data);

                    this.inmueble = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


        // EDIT

        editarInmueble() {
            console.log(" EDITAR INMUEBLE EJECUTADO");
            console.log(this.inmueble);

            fetch("/api/ControllerInmueble", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.inmueble)
            })
                .then(response => {
                    console.log(" RESPUESTA EDIT:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al editar inmueble");
                    }

                    window.location.href = "/Inmueble";
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


        // DELETE

        eliminar() {
            const id = this.inmueble.IdInmueble;

            console.log(" ELIMINAR INMUEBLE ID:", id);

            fetch("/api/ControllerInmueble/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(" RESPUESTA DELETE:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al eliminar inmueble");
                    }

                    window.location.href = "/Inmueble";
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        }
    }
});

app.mount("#app");

