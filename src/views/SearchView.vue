<script>
/* vue */
import { ref } from 'vue';
import { useRoute } from 'vue-router'

/* Components */
import MPWHeader from '@/components/Header.vue';
import MovieTV from '@/components/MovieTV.vue';
/* Stores */
import { GenresStore } from '@/stores/genres';

/* Services*/
import api from '@/services/api.js';

/* utils*/
import * as utils from '@/utils/utils.js';


/* Libs*/


export default {
    name: 'Search',
    components: {
        MovieTV
    },

    computed: {
        formattedGenres() {
            return function (genres) {
                if (genres && genres.length > 0) {
                    return genres.map((genre, index) => {
                        const comma = index < genres.length - 1 ? ', ' : '';
                        return `${genre.name}${comma}`;
                    }).join('');
                }
                return '';
            };
        },
    },
    setup() {

        /* Route Info */
        const route = useRoute();
        const type = route.params.type;
        const title = route.params.title;
        const page = route.params.page;


        /* Refs */
        const data = ref();
        const hoverStates = ref({});
        const pages = ref(0);
        const total = ref(0);

        /* Stores */
        const genresStore = GenresStore();


        const onHover = (movieId, isHovered) => {
            hoverStates.value = { ...hoverStates.value, [movieId]: isHovered };
        };



        api.getSearch(type, title, page).then((res) => {
            const _movies = res.results.results;
            pages.value = res.pagination.total;

            console.log(pages.value);
            const merged = _movies.map(item => {

                const genreIds = item.genre_ids.map(genre => genre);
                // Find the matching objects in array2 based on genre ids
                const matchingObjects = genresStore.genres.filter(obj => genreIds.includes(obj.id));

                // Merge the objects
                return { ...item, genres: matchingObjects };
            });

            data.value = merged;

            total.value = res.results.total_results;

        });

        return {
            data,
            onHover,
            pages,
            title,
            type,
            page,
            total
        }
    }
}

</script>

<template>
    <section>
        <h1>Search results for : <strong>{{ title }}</strong></h1>
        <h2>Total Results : <strong>{{ total }}</strong></h2>
        <list>
            <MovieTV v-for="items of data" :data="items" :type="type" />
        </list>
        <pagination v-if="pages > 1">
            <router-link :to="{ name: 'Search', params: { type, title, page } }" :key="index"
                v-for="(page, index) of pages">{{ page }}</router-link>
        </pagination>
    </section>
</template>


<style lang="scss" scoped>
section {
    padding: 30px 50px 0 50px;

    h1,
    h2 {
        font-family: 'Poppins';
        font-size: 24px;
        font-weight: 500;

        margin-bottom: 10px;

        strong {
            color: #f79d25;
        }
    }
}


list {
    display: grid;

    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    panel {
        max-width: 300px;
    }

    name {
        cursor: pointer;
        user-select: none;
    }
}

pagination {
    display: flex;

    margin: 50px 0 0 auto;
    padding-bottom: 50px;

    justify-content: flex-end;

    a {
        font-family: 'Poppins';
        font-size: 14px;
        font-weight: 500;

        margin-right: 10px;
        margin-right: 20px;
        padding: 8px;

        cursor: pointer;
        text-decoration: none;
        letter-spacing: 1px;

        color: #fff;
        border: none;
        outline: none;
        background: #e5771e;
    }

    .router-link-active {
        font-weight: bold;

        box-shadow: 5px 5px #bb3f03;
    }
}
</style>
