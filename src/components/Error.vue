<template>
    <div class="notification is-danger">
        {{ mensaje }}
    </div>
</template>

<script>
    export default {
        name: "Error",
        props: ['mensaje'],
    }
</script>

<style scoped>
    .notification {
        margin-top: 20px;
    }
</style>
