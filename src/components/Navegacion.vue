<template>
    <nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <img src="../assets/vuefilos.png">
                </router-link>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link class="navbar-item" to="/">Portada</router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <router-link class="button is-primary" to="/registro"><strong>Registro</strong></router-link>
                            <router-link class="button is-light" to="/login">Login</router-link>
                            <router-link class="button is-light" to="/perfil">Perfil</router-link>
                            <a class="button is-light" href="#">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { bulmaHeader } from "../assets/utils";
    export default {
        name: "Navegacion",
        mounted() {
            bulmaHeader();
        }
    }
</script>

<style scoped>

</style>