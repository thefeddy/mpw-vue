<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, defineExpose } from 'vue';

export default {
    name: 'MPWModal',
    props: {

    },
    expose: ['open', 'close'],
    methods: {
        close() {
            this.showing = false;
            this.$emit('close');
        },
        open() {
            this.showing = true;
            this.$emit('open');
        }

    },
    setup() {

    },
    data() {
        return {
            showing: false
        }
    }

};
</script>

<template>
    <modal :class="{ showing }">
        <modal-body>
            <close @click="close">x</close>
            <slot name="modalBody"></slot>
        </modal-body>
    </modal>
</template>

<style lang="scss" scoped>
modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;

    display: block;
    visibility: hidden;

    width: 100vw;
    height: 100vh;

    transition: all 550ms ease-in-out;

    opacity: 0;
    background: rgba(0, 0, 0, 0.75);

    &.showing {
        visibility: visible;

        opacity: 1;

        modal-body {
            top: 50%;
        }
    }

    modal-body {
        position: absolute;
        z-index: 101;
        top: 60%;
        left: 50%;

        width: 600px;
        min-height: 300px;

        transition: all 550ms ease-in-out;
        transform: translate(-50%, -50%);

        background: #fffceb;

        h1 {
            font-family: 'Poppins';
            font-size: 150px;
            font-weight: 500;

            color: #fff;
        }


        close {
            font-family: 'Poppins';
            font-size: 18px;
            font-weight: 500;

            position: absolute;
            top: 10px;
            right: 10px;

            width: 25px;
            height: 25px;

            cursor: pointer;
            user-select: none;
            text-align: center;

            color: #fff;
            background: #e5771e;
            box-shadow: 5px 5px #bb3f03;
        }
    }
}
</style>
