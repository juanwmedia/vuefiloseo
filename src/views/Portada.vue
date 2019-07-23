<template>
    <section class="section">
        <div class="container">
            <h1 class="title has-text-centered">Los mejores recursos para dominar Vue.js</h1>
            <hr />

            <!-- Stream de recursos -->
            <div class="columns" id="portada">
                <div class="column is-half-tablet">

                    <div class="box">
                        <article class="media">
                            <div class="media-content">
                                <div class="content">
                                    <button class="delete is-small is-pulled-right" aria-label="delete"></button>
                                    <p>
                                        <strong>Título</strong>
                                        <br>
                                        Descripción...
                                        <br>
                                        <small>Usuario</small> <small><i> (Hace un  momento...)</i></small>
                                    </p>
                                </div>
                                <nav class="level is-pulled-left">
                                    <div class="level-left">
                                        <a class="level-item" aria-label="reply">
                                            <a href="#" target="_blank" class="button is-link is-small">Visitar</a>
                                        </a>
                                        <a class="level-item" aria-label="reply">
                                            <a href="#" target="_blank" class="button is-primary is-small">Más info.</a>
                                        </a>
                                    </div>
                                </nav>
                                <nav class="level is-pulled-right">
                                    <div class="level-right">
                                        <a href="#" class="level-item" aria-label="reply">
                                            3 comentario/s
                                        </a>
                                        <a  href="#" class="level-item" aria-label="like">
                                            2 voto/s
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </article>
                    </div>




                </div>

                <!-- Agregar recurso -->
                <div class="column is-offset-1">
                    <section class="section has-background-light">
                        <form>
                            <div class="field">
                                <label class="label">Título del recurso</label>
                                <div class="control">
                                    <input class="input" type="text" required />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">URL del recurso</label>
                                <div class="control">
                                    <input class="input" type="text" required />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Descripción del recurso</label>
                                <div class="control">
                                    <textarea class="textarea" required></textarea>
                                </div>
                            </div>
                            <div class="field is-grouped">
                                <div class="control">
                                    <button type="submit" class="button is-link">Agregar recurso</button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Portada',
    }
</script>

<style scoped>
    @media screen and (max-width: 768px) {
        #portada {
            display: flex;
            flex-direction: column-reverse;
        }
    }
</style>
