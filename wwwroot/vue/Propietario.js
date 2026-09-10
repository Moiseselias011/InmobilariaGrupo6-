console.log(" PROPIETARIO.JS CARGADO");

const app = Vue.createApp({
    data() {
        return {
            propietarios: [],

            propietario: {
                idPropietario: 0,
                nombre: "",
                apellido: "",
                dni: "",
                telefono: "",
                email: ""
            }
        };
    },

    mounted() {
        console.log(" VUE MONTADO");

        const ruta = window.location.pathname;

        console.log(" RUTA:", ruta);

        // INDEX
        if (ruta === "/Propietario" || ruta === "/Propietario/") {
            this.listarPropietarios();
        }

        // EDIT, DELETE y DETAILS
        if (
            ruta.includes("/Propietario/Edit/") ||
            ruta.includes("/Propietario/Delete/") ||
            ruta.includes("/Propietario/Details/")
        ) {
            this.obtenerPropietario();
        }
    },

    methods: {

       
        // INDEX
      

        listarPropietarios() {
            console.log(" LISTAR PROPIETARIOS EJECUTADO");

            fetch("/api/ControllerPropietario")
                .then(response => {
                    console.log(" RESPUESTA LISTAR:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener propietarios");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" PROPIETARIOS:", data);

                    this.propietarios = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


       
        // CREATE
       

        crearPropietario() {
            console.log(" CREAR PROPIETARIO EJECUTADO");
            console.log(this.propietario);

            fetch("/api/ControllerPropietario", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.propietario)
            })
                .then(response => {
                    console.log(" CREAR PROPIETARIO RESPUESTA:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al crear propietario");
                    }

                    window.location.href = "/Propietario";
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


        obtenerPropietario() {
            const id = this.obtenerId();

            console.log(" OBTENER PROPIETARIO ID:", id);

            fetch("/api/ControllerPropietario/" + id)
                .then(response => {
                    console.log(" RESPUESTA GET:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al obtener propietario");
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(" PROPIETARIO:", data);

                    this.propietario = data;
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


      
        // EDIT
        

        editarPropietario() {
            console.log(" EDITAR PROPIETARIO EJECUTADO");
            console.log(this.propietario);

            fetch("/api/ControllerPropietario", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(this.propietario)
            })
                .then(response => {
                    console.log(" RESPUESTA EDIT:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al editar propietario");
                    }

                    window.location.href = "/Propietario";
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        },


      
        // DELETE
        

        eliminar() {
            const id = this.propietario.idPropietario;

            console.log(" ELIMINAR PROPIETARIO ID:", id);

            fetch("/api/ControllerPropietario/" + id, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(" RESPUESTA DELETE:", response.status);

                    if (!response.ok) {
                        throw new Error("Error al eliminar propietario");
                    }

                    window.location.href = "/Propietario";
                })
                .catch(error => {
                    console.error(" ERROR:", error);
                });
        }
    }
});

app.mount("#app");