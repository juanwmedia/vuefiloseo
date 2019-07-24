<template>
    <div class="notification is-success">
        <button @click="$emit('cerrarMensaje')" class="delete"></button>
        {{ mensaje }}
    </div>
</template>

<script>
    export default {
        name: "Exito",
        props: ['mensaje'],
    }
</script>

<style scoped>
    .notification {
        margin-top: 20px;
    }
</style>