const app = Vue.createApp({
    data() {
        return {
            usuario: {
                IdUsuario: 0,
                Nombre: '',
                Apellido: '',
                Email: '',
                Rol: '',
                Avatar: ''
            },

            avatarSeleccionado: null
        };
    },

    methods: {

        obtenerPerfil() {

            fetch('/Usuario/ObtenerPerfil')
                .then(response => {

                    if (!response.ok) {
                        throw new Error('No se pudo obtener el perfil');
                    }

                    return response.json();
                })
                .then(data => {

                    this.usuario = data;

                })
                .catch(error => {

                    console.error('Error:', error);

                });
        },

        seleccionarAvatar(event) {

            this.avatarSeleccionado = event.target.files[0];

        },

        guardarPerfil() {

    const formData = new FormData();

    formData.append("Nombre", this.usuario.Nombre);
    formData.append("Apellido", this.usuario.Apellido);
    formData.append("Email", this.usuario.Email);

    if (this.avatarSeleccionado) {
        formData.append("Avatar", this.avatarSeleccionado);
    }

    fetch('/Usuario/ActualizarPerfil', {
        method: 'POST',
        body: formData
    })
        .then(response => {

            if (!response.ok) {
                throw new Error('No se pudo actualizar el perfil');
            }

            return response.json();
        })
        .then(data => {

            this.usuario = data;

            alert("Perfil actualizado correctamente");

        })
        .catch(error => {

            console.error('Error:', error);
            alert("Ocurrió un error al actualizar el perfil");

        });
}
    },

    mounted() {

        this.obtenerPerfil();

    }
});

app.mount('#app');