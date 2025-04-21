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
    name: 'CommunityDetails',
    components: {
    },
    methods: {



    },
    computed: {

    },
    setup() {
        console.log('hai')
        const route = useRoute();
        const id = route.params.id;

        const community = ref(null);

        api.getCommunityById(id).then((res) => {
            community.value = res;
            // let isMember = res.members.find(member => member.id === 39);
            //console.log(isMember)

        });
        return {
            community
        }
    }
}

</script>

<template>
    <section>
        <h1>{{ community?.name }}</h1>
        <span>{{ community?.owner?.display_name }}</span>
        <h2>community members</h2>
        <ul>
            <li v-for="member in community?.members" :key="member.id">
                <p>{{ member?.display_name }}</p>

            </li>
        </ul>
        <h3>Movie Watch List</h3>
        <ul>
            <li v-for="movie in community?.movies" :key="movie.id">
                <p>{{ movie.details.title }}</p>

            </li>
        </ul>

        <join v-if="community?.open && !community.isMember">
            <button>Join</button>
        </join>
    </section>

</template>


<style lang="scss" scoped>
* {
    color: #fff;
}

h1 {
    margin-top: 500px;
}
</style>
