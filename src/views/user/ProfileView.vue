<script>
/* vue */
import { ref } from 'vue';
import { useRoute } from 'vue-router'

/* Components */
import MPWHeader from '@/components/Header.vue';

/* Stores */
import { GenresStore } from '@/stores/genres';

/* Services*/
import api from '@/services/api.js';

/* utils*/
import * as utils from '@/utils/utils.js';

/* Libs*/
import moment from 'moment';

export default {
    name: 'UserProfile',
    components: {
    },
    methods: {



    },
    computed: {

    },
    setup() {

    }
}

</script>

<template>
    User Profile
</template>


<style lang="scss" scoped></style>
