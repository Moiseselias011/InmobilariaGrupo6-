console.log(" USUARIO.JS CARGADO");

const app = Vue.createApp({

    data() {

        return {

            usuarios: [],

            buscar: "",

            pagina: 1,

            cantidadPorPagina: 10,

            total: 0,

            totalPaginas: 0,

            usuario: {

                IdUsuario: 0,
                Nombre: "",
                Apellido: "",
                Email: "",
                Password: "",
                Rol: ""

            }

        };

    },

    mounted() {

        console.log(" VUE MONTADO");

        const ruta =
            window.location.pathname;

        console.log(" RUTA:", ruta);

        if (
            ruta === "/Usuario" ||
            ruta === "/Usuario/"
        ) {

            this.listarUsuarios();

        }

        if (
            ruta.includes("/Usuario/Edit/") ||
            ruta.includes("/Usuario/Delete/") ||
            ruta.includes("/Usuario/Details/")
        ) {

            this.obtenerUsuario();

        }

    },

    methods: {

        listarUsuarios() {

            console.log(
                " LISTAR USUARIOS EJECUTADO"
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
                "/api/ControllerUsuario/paginado-usuarios?" +
                parametros.toString()
            )

                .then(response => {

                    console.log(
                        " RESPUESTA LISTAR:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener usuarios"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " USUARIOS:",
                        data
                    );

                    this.usuarios =
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

        buscarUsuarios() {

            this.pagina = 1;

            this.listarUsuarios();

        },

        paginaAnterior() {

            if (this.pagina > 1) {

                this.pagina--;

                this.listarUsuarios();

            }

        },

        paginaSiguiente() {

            if (
                this.pagina <
                this.totalPaginas
            ) {

                this.pagina++;

                this.listarUsuarios();

            }

        },

        crearUsuario() {

            console.log(
                " CREAR USUARIO EJECUTADO"
            );

            console.log(
                this.usuario
            );

            fetch(
                "/api/ControllerUsuario",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.usuario
                        )

                }
            )

                .then(response => {

                    console.log(
                        " CREAR USUARIO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al crear usuario"
                        );

                    }

                    window.location.href =
                        "/Usuario";

                })

                .catch(error => {

                    console.error(
                        " CREAR USUARIO ERROR:",
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

        obtenerUsuario() {

            const id =
                this.obtenerId();

            console.log(
                " OBTENER USUARIO ID:",
                id
            );

            fetch(
                "/api/ControllerUsuario/" +
                id
            )

                .then(response => {

                    console.log(
                        " OBTENER USUARIO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al obtener usuario"
                        );

                    }

                    return response.json();

                })

                .then(data => {

                    console.log(
                        " USUARIO:",
                        data
                    );

                    data.Password = "";

                    this.usuario =
                        data;

                })

                .catch(error => {

                    console.error(
                        " OBTENER USUARIO ERROR:",
                        error
                    );

                });

        },

        editarUsuario() {

            console.log(
                " EDITAR USUARIO EJECUTADO"
            );

            console.log(
                this.usuario
            );

            fetch(
                "/api/ControllerUsuario",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            this.usuario
                        )

                }
            )

                .then(response => {

                    console.log(
                        " EDITAR USUARIO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al editar usuario"
                        );

                    }

                    window.location.href =
                        "/Usuario";

                })

                .catch(error => {

                    console.error(
                        " EDITAR USUARIO ERROR:",
                        error
                    );

                });

        },

        eliminar() {

            const id =
                this.usuario.IdUsuario;

            console.log(
                " ELIMINAR USUARIO ID:",
                id
            );

            fetch(
                "/api/ControllerUsuario/" +
                id,
                {

                    method: "DELETE"

                }
            )

                .then(response => {

                    console.log(
                        " ELIMINAR USUARIO RESPUESTA:",
                        response.status
                    );

                    if (!response.ok) {

                        throw new Error(
                            "Error al eliminar usuario"
                        );

                    }

                    window.location.href =
                        "/Usuario";

                })

                .catch(error => {

                    console.error(
                        " ELIMINAR USUARIO ERROR:",
                        error
                    );

                });

        }

    }

});

app.mount("#app");