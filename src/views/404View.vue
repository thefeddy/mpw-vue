<script>
/* vue */
import { ref, onMounted, nextTick } from 'vue';

/* Components */
import MPWHeader from '@/components/Header.vue';

/* Stores */
import { UserStore } from '@/stores/user';
import { SearchStore } from '@/stores/search';

/* Services*/
import api from '@/services/api.js';

/* utils*/
import * as utils from '@/utils/utils.js';

/* Libs*/
import * as THREE from 'three';

export default {
    name: '404',
    components: {
        MPWHeader
    }
}

</script>

<template>
    <FourOhFour>
        <h1>Not Found</h1>
    </FourOhFour>
</template>


<style lang="scss" scoped>
fourohfour {
    display: grid;

    width: 100%;
    height: 100vh;

    place-content: center;

    h1 {
        font-family: 'Poppins';
        font-size: 150px;
        font-weight: 500;

        color: #fff;
    }
}
</style>
