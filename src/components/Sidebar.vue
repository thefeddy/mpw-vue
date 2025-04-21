<script>
import { ref } from 'vue';

/* Stores */

/* libs */
import jwt_decode from 'jwt-decode';

export default {
    name: 'MPWSidebar',
    props: {

    },
    methods: {
        logout() {
            window.sessionStorage.clear();

            this.$router.push({ name: 'Home' });
        },

    },
    setup() {

        return {

        }
    },
    data() {
        return {
            title: null
        }
    }

};
</script>

<template>
    <sidebar>

    </sidebar>
</template>

<style lang="scss" scoped>
sidebar {
    position: relative;

    display: flex;

    border-right: 1px solid #0d0d0d;
    background: #282c37;

    flex-basis: 280px;
    flex-grow: 0;
    flex-shrink: 0;

    &::before {
        position: absolute;
        top: 0;
        right: 0;

        width: 1px;
        height: 100%;

        content: '';

        background: #121212;
    }

    &::after {
        position: absolute;
        top: 0;
        right: -1px;

        width: 1px;
        height: 100%;

        content: '';

        background: #191918;
    }
}
</style>
