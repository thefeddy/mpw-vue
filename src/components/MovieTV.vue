<script>
export default {
    name: 'MoveTV',
    props: {
        data: Object,
        type: String
    },
    methods: {
        getMovieBackgroundUrl(backdrop_path) {
            return `https://image.tmdb.org/t/p/w500${backdrop_path}`;
        },
        goToDetails(id) {
            this.$router.push({ name: 'Details', params: { id, type: this.type } });
        }
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

    },
    data() {
        return {
            name: this.data ? (this.data.name || this.data.title) : ''
        }

    },
};
</script>

<template>
    <panel :key="data.id" @click="goToDetails(data.id)">
        <img v-if="data.poster_path" :src="getMovieBackgroundUrl(data.poster_path)" />
        <img v-if="!data.backdrop_path" src="@/assets/img/no-poster.png" />
        <font-awesome-icon :icon="['fad', 'film']" />
        <name>

            <span>{{ name }}<em>({{ data.original_language }})</em></span>
            <info>
                <font-awesome-icon :icon="['fas', 'star']"
                    style="color: #fed506;" /><em>{{ data.vote_average.toFixed(1) }}</em>
                <i>|</i>
                <genres>
                    {{ formattedGenres(data.genres.splice(0, 3)) }}
                </genres>
            </info>
        </name>
    </panel>
</template>

<style lang="scss" scoped>
panel {
    position: relative;

    overflow: hidden;

    width: 300px;
    height: 450px;
    margin: 10px;

    cursor: pointer;

    box-shadow: 5px 5px #807c4c;

    &:hover {
        img {
            transform: scale(1.2);
        }
    }

    img {
        display: block;

        width: 100%;
        height: 100%;

        transition: transform 5000ms ease-in-out;

        object-fit: cover;
        object-position: center;
    }

    name {
        font-family: 'Poppins', sans-serif;
        font-size: 14px;

        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;

        display: block;
        display: flex;
        flex-direction: column;

        width: 100%;
        height: 80px;
        padding: 5px 10px;

        letter-spacing: 1.5px;

        color: #fff;

        justify-content: center;

        span {
            display: block;

            width: 95%;
            margin-bottom: 5px;

            word-wrap: break-word;

            em {
                font-size: 10px;
                font-weight: 800;
                font-style: normal;

                margin-left: 5px;

                text-transform: uppercase;

                color: yellow;
            }
        }

        info {
            display: flex;

            align-items: center;

            i,
            em {
                font-style: normal;
            }

            i {
                margin-left: 5px;
            }

            svg {
                margin-right: 5px;
            }

            genres {
                font-size: 10px;

                margin-left: 5px;
            }
        }



        &::before {
            position: absolute;
            z-index: -1;
            bottom: 0;
            left: 0;

            display: block;

            width: 100%;
            height: 100%;

            content: '';

            background: rgba(0, 0, 0, 0.3);

            backdrop-filter: blur(10px);
        }
    }
}
</style>
