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
    name: 'AccountMainView',
    components: {
    },
    methods: {



    },
    computed: {

    },
    setup() {
        const communities = ref([]);
        api.getUserDetails().then((res) => {
            communities.value = res.communities;
            console.log(res)

        });
        return {
            communities
        }
    }
}

</script>

<template>
    <section>
        <h1>Main Account View</h1>
    </section>
    <aside>
        <h2>Communities</h2>
        <ul>
            <li v-for="community in communities" :key="community.id">
                <router-link
                    :to="{ name: 'CommunityDetails', params: { id: community.id } }">{{ community.name }}</router-link>
            </li>
        </ul>
    </aside>
</template>


<style lang="scss" scoped>
* {
    color: #000;
}

h1 {
}
</style>
