<script>
/* vue */
import { ref } from 'vue';
import { useRoute } from 'vue-router'

/* Components */
import MPWHeader from '@/components/Header.vue';

/* Stores */
import { GenresStore } from '@/stores/genres';
import { UserStore } from '@/stores/user';
/* Services*/
import api from '@/services/api.js';

/* utils*/
import * as utils from '@/utils/utils.js';

/* Libs*/
import moment from 'moment';
import Upscaler from 'upscaler';
import model from '@upscalerjs/default-model';

export default {
    name: 'Search',
    components: {
    },
    methods: {
        getMovieBackgroundUrl(backdrop_path) {
            return `https://image.tmdb.org/t/p/w500${backdrop_path}`;
        },
        getMomentTime(time) {
            const duration = moment.duration(time, 'minutes');
            const hours = Math.floor(duration.asHours());
            const minutesLeft = duration.minutes();
            const formattedTime = (hours > 0) ? `${hours}h ${minutesLeft}m` : `${minutesLeft}m`;
            return formattedTime;
        },


    },
    computed: {
        formattedGenres() {
            return function (genres) {
                if (genres && genres.length > 0) {
                    return genres.map((genre, index) => {
                        const comma = index < genres.length - 1 ? ', ' : '';
                        return `<span>${genre.name}</span>`;
                    }).join('');
                }
                return '';
            };
        },
        getTitle() {
            if (this.type === 'movie') {
                return this.movie?.title;
            }
            if (this.type === 'tv') {
                return this.movie?.original_name;
            }
        }
    },
    setup() {
        const route = useRoute();
        const id = route.params.id;
        const type = route.params.type;

        const userStore = new UserStore();

        const movie = ref();
        const cast = ref();
        const name = ref();
        const background = ref();
        api.getDetails(type, id).then(async (res) => {
            movie.value = res.details;
            console.log(res);
            cast.value = res.details.credits.cast;
            name.value = (res.details.name) ? res.details.name : res.details.original_name;

            background.value = (res.details?.backdrop_path != null) ? res.details?.backdrop_path : res.details?.poster_path;

            console.log(res.details);

        });


        if (userStore.loggedIn) {
            api.getUserDetails().then((res) => { console.log(res) });
        }
        return {
            movie,
            cast,
            type,
            name,
            background
        }
    }
}

</script>

<template>
    <section>
        <header :style="{ '--bg': `url(https://image.tmdb.org/t/p/original${background})` }">
            <detail>
                <h1>{{ name }} </h1>
                <h2>{{ movie?.tagline }}</h2>
                <info>
                    <genres>
                        <span v-for="genre in movie?.genres">{{ genre.name }}</span>
                    </genres>
                </info>
            </detail>
        </header>
    </section>
    <section id="details">
        <div class="container">
            <aside>
                <episodes>
                    <episode v-for="episode of movie?.seasons">
                        <img :src="`https://image.tmdb.org/t/p/original/${episode.poster_path}`" />
                    </episode>
                </episodes>
                <p>{{ movie?.overview }}</p>
                <cast>
                    <actor v-for="actor of cast">
                        <p>{{ actor.name }}</p>
                        <photo>
                            <img v-if="actor.profile_path"
                                :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`" />
                            <img v-if="!actor.profile_path" src="@/assets/img/default-photo-actor.png" />
                        </photo>
                    </actor>
                </cast>
                <trailers>
                    <trailer v-for="trailer of movie?.videos.results">
                        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${trailer.key}`"
                            frameborder="0" allowfullscreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </trailer>
                </trailers>
            </aside>

            <div id="info">
                <h1>Information</h1>


            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;

    width: 100%;
}

episodes {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 200px;
    padding-bottom: 20px;

    img {
        display: block;

        width: 150px;
        height: 200px;
        margin-right: 10px;

        object-fit: cover;
    }
}

#details {
    padding-top: 50px;

    .container {
        font-family: 'Poppins', sans-serif;

        display: flex;
        flex-direction: row;

        width: 960px;
        margin: 0 auto;

        justify-content: center;

        aside {
            width: 666px;
            padding-right: 50px;

            p {
                font-size: 20px;
            }
        }

        #info {
            width: 300px;

            h2 {
                text-shadow: 1px 1px 0 #937650, 3px 3px 0 #f9bd6d;
            }

            ul {
                padding: 0;

                list-style: none;
            }
        }
    }
}

header {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: calc(100vh - 84px);

    color: #fff;
    background: var(--bg) no-repeat;
    background-attachment: fixed;
    background-size: cover;

    justify-content: flex-end;

    h2 {
        margin: 0;
    }

    detail {
        position: relative;
        z-index: 1;

        display: flex;
        flex-direction: column;

        margin: 30px 0 10px 25px;


        p {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            line-height: 28px;
        }

        h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 80px;

            display: flex;

            margin: 0;

            text-transform: uppercase;

            color: #fffceb;
            text-shadow: 1px 1px 0 #937650, 3px 3px 0 #f9bd6d, 5px 5px 0 #e6842b, 7px 7px 0 #ce572c, 9px 9px 0 #807c4c, 11px 11px 0 #8c9169;

            align-items: center;

            em {
                font-size: 20px;
                font-style: normal;

                margin-left: 15px;
            }
        }

        h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: normal;

            margin: 0 0 10px 0;
        }

        span {
            font-family: 'Poppins', sans-serif;

            letter-spacing: 1.45px;
        }

        info {
            font-family: 'Poppins', sans-serif;

            width: 100%;
            height: 66px;
        }

        networks {
            margin-left: auto;

            img {
                display: block;

                width: 50px;
                height: auto;
            }
        }

        genres {
            span {
                font-family: 'Poppins';
                font-size: 18px;
                font-weight: 500;

                height: 50px;
                margin-top: 35px;
                margin-right: 15px;
                padding: 0 20px;

                cursor: pointer;
                transform: translateY(-50%);
                letter-spacing: 1px;

                color: #fff;
                border: none;
                outline: none;
                background: #807c4c;
                box-shadow: 5px 5px #8c9169;

                appearance: none;
            }
        }
    }
}

cast {
    font-family: 'Poppins', sans-serif;

    position: relative;
    z-index: 1;

    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;

    width: 100%;
    height: 200px;

    color: #000;

    align-items: center;



    actor {
        margin: 15px;

        text-align: center;

        photo {
            display: block;
            overflow: hidden;

            width: 80px;
            height: 80px;

            img {
                display: block;

                width: 100%;
                height: 100%;
                margin-top: auto;

                object-fit: cover;
            }
        }
    }
}
</style>
