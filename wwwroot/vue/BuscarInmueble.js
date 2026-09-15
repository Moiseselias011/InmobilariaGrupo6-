
const { createApp } = Vue;

createApp({
    data() {
        return {
            filtros: {
                Direccion: "",
                IdTipoInmueble: "",
                Cupo: "",
                FechaInicio: "",
                FechaFin: ""
            },

            inmuebles: [],
            direcciones: [],
            buscado: false
        };
    },

    methods: {

        async listarDirecciones() {

            const respuesta = await fetch("/api/ControllerInmueble");

            if (!respuesta.ok) {
                console.error("Error al obtener inmuebles");
                return;
            }

            const data = await respuesta.json();

            this.direcciones = [
                ...new Set(
                    data
                        .map(inmueble => inmueble.Direccion)
                        .filter(direccion => direccion)
                )
            ];
        },

        async buscarInmuebles() {

            const parametros = new URLSearchParams();

            if (this.filtros.Direccion) {
                parametros.append("Direccion", this.filtros.Direccion);
            }

            if (this.filtros.IdTipoInmueble) {
                parametros.append("IdTipoInmueble", this.filtros.IdTipoInmueble);
            }

            if (this.filtros.Cupo) {
                parametros.append("Cupo", this.filtros.Cupo);
            }

            if (this.filtros.FechaInicio) {
                parametros.append("FechaInicio", this.filtros.FechaInicio);
            }

            if (this.filtros.FechaFin) {
                parametros.append("FechaFin", this.filtros.FechaFin);
            }

            const respuesta = await fetch(
                `/api/ControllerInmueble/buscar?${parametros.toString()}`
            );

            if (!respuesta.ok) {
                console.error("Error al buscar inmuebles");
                return;
            }

            const data = await respuesta.json();

            this.inmuebles = data;
            this.buscado = true;
        },
 
  
    reservar(inmueble) {

    console.log("INMUEBLE:", inmueble);
    console.log("FECHA INICIO:", this.filtros.FechaInicio);
    console.log("FECHA FIN:", this.filtros.FechaFin);

    const parametros = new URLSearchParams();

    parametros.append("idInmueble", inmueble.IdInmueble);
    parametros.append("fechaInicio", this.filtros.FechaInicio);
    parametros.append("fechaFin", this.filtros.FechaFin);

    const url = `/Reserva/Create?${parametros.toString()}`;

    console.log("URL QUE VOY A ABRIR:", url);

    window.location.href = url;
    }




    },

    mounted() {
        this.listarDirecciones();
    }

}).mount("#app");

