<script>
/* vue */
import { ref } from 'vue';

/* Components */
import LinesBG from '@/components/LinesBG.vue';
/* Stores */
import { UserStore } from '@/stores/user';

/* Services*/
import api from '@/services/api.js';


export default {
    name: 'Trending',
    components: {
        LinesBG
    },
    methods: {


    },
    setup() {
        const trending = ref(null);

        api.getTrending().then((res) => {
            console.log(res.results)

            trending.value = res.results;
        });

        return {
            trending
        }
    }
}

</script>

<template>
    <slider>
        <slides>
            <slide v-for="trend of trending">
                <img :src="'https://image.tmdb.org/t/p/original' + trend.backdrop_path" alt="poster" />
                <heading>
                    <h1>{{ trend.original_title }}</h1>
                </heading>
            </slide>
        </slides>
    </slider>

</template>


<style lang="scss" scoped>
slider {
    position: relative;

    display: block;

    width: 100vw;
    height: 100vh;

    slides {
        display: block;

        width: 100%;
        height: 100%;

        slide {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;

            display: block;

            width: 100%;
            height: 100%;

            &:first-child {
                z-index: 2;
            }

            img {
                display: block;

                width: 100%;
                height: 100%;

                object-fit: cover;
            }


            heading {
                position: absolute;
                bottom: 0;

                display: block;

                width: 100%;
                height: 300px;

                background: #ecd6af;
            }
        }
    }
}
</style>
