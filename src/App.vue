<script>
import { RouterView } from 'vue-router';

/* Stores */
import { GenresStore } from './stores/genres';

/* Servies */
import api from '@/services/api.js';

/* Components */
import MPWHeader from '@/components/Header.vue';
import MPWSidebar from '@/components/Sidebar.vue';


export default {
    name: 'MPW',
    components: {
        MPWHeader,
        MPWSidebar
    },
    methods: {
    },
    setup() {
        // to be safe get the latest info on genres
        // const genresStore = GenresStore();

        // api.getMovieGenres().then((res) => {
        //     for (const genre of res.genres) {
        //         genresStore.addGenre(genre);
        //     }
        // });
    },
    mounted() {
        const { fetch: originalFetch } = window;
        window.fetch = async (...args) => {
            let [resource, config] = args;
            let response = await originalFetch(resource, config);
            if (response.status == 401) {
                // const user = useUserStore();
                // user.unauthorized = true;
                window.sessionStorage.clear();
                this.$router.push({ name: 'Login', query: { redirectFrom: this.$route.fullPath } });
            } else if (response.status == 404) {

                this.$router.push({ name: '404' });
            } else {
                return response;
            }

        };
    }
}


</script>

<template>
    <MPWHeader></MPWHeader>
    <main>
        <router-view :key="$route.path"></router-view>
    </main>

</template>

<style scoped></style>
