const app = Vue.createApp({
    data() {
        return {
            propietarios: []
        };
    },

    mounted() {
        fetch("/Api/ControllerPropietario")
            .then(response => response.json())
            .then(data => {
                this.propietarios = data;
            });
    }
});

app.mount("#app");