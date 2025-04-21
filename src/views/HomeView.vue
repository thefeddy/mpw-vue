<script>
/* vue */
import { ref, onMounted, nextTick } from 'vue';

/* Components */
import MPWHeader from '@/components/Header.vue';
import LinesBG from '@/components/LinesBG.vue';
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
    name: 'Home',
    components: {
        MPWHeader,
        LinesBG
    },
    methods: {
        getMovieBackgroundUrl(backdrop_path) {
            return `https://image.tmdb.org/t/p/w500${backdrop_path}`;
        },
        onSearch() {
            if (this.title) {
                const title = this.title;
                const searchStore = SearchStore();
                searchStore.$patch({ type: this.type });
                this.$router.push({ name: 'Search', params: { type: this.type, title, page: 1 } });
            }
        }

    },
    data() {
        return {
            title: null,
            type: 'movie',
            rules: {
                required: (value) => !!value || 'Required.',
                min: (v) => v.length >= 8 || 'At least 8 characters',
            }
        }
    }
}

</script>

<template>
    <searching>
        <img src="@/assets/img/MPW.png" />
        <search>
            <form @submit.prevent="onSearch">
                <font-awesome-icon :icon="['fass', 'magnifying-glass']" size="lg" style="color: #ffffff;" />
                <input type="search" placeholder="Scour for films and series, then embark on an adventure!"
                    v-model="title" required />
                <button type="submit">Go</button>
            </form>
            <radios>
                <radio>
                    <input type="radio" name="search" value="movie" v-model="type" checked />
                    <label>Movies</label>
                </radio>
                <radio>
                    <input type="radio" name="search" value="tv" v-model="type" />
                    <label>TV Series</label>
                </radio>
            </radios>
        </search>
    </searching>
    <LinesBG />
</template>


<style lang="scss" scoped>
searching {
    position: relative;
    z-index: 10;

    display: grid;
    overflow: hidden;

    width: 100vw;
    height: 100vh;

    place-content: center;

    img {
        display: block;

        width: 200px;
        margin: 0 auto 25px auto;
    }

    search {
        position: relative;

        width: 800px;
        height: 80px;

        form {
            svg {
                position: absolute;
                top: 50%;
                left: 10px;

                transform: translateY(-50%);
            }

            input {
                font-family: 'Poppins';
                font-size: 16px;

                width: 100%;
                height: 80px;

                text-indent: 45px;
                letter-spacing: 1px;

                color: #fff;
                border: none;
                outline: none;
                background: rgba(90, 61, 43, 0.85);

                appearance: none;
            }

            button {
                font-family: 'Poppins';
                font-size: 18px;
                font-weight: 500;

                position: absolute;
                top: 50%;
                right: 15px;

                height: 50px;
                padding: 0 20px;

                cursor: pointer;
                transform: translateY(-50%);
                letter-spacing: 1px;

                color: #fff;
                border: none;
                outline: none;
                background: #e5771e;
                box-shadow: 5px 5px #bb3f03;

                appearance: none;
            }
        }
    }
}

radios {
    display: flex;

    margin-top: 25px;

    justify-content: center;

    radio {
        display: flex;



        &:first-child {
            margin-right: 25px;
        }

        label {
            font-family: 'Poppins';
            font-size: 18px;
            font-weight: 500;

            height: 50px;
            margin-top: 4px;
            margin-left: 10px;

            letter-spacing: 1px;

            color: #fff;
        }

        input {
            position: relative;

            width: 30px;
            height: 30px;

            cursor: pointer;
            transition: all 550ms ease-in-out;

            color: #fff;
            border: none;
            outline: none;
            background: #5a3d2b;
            box-shadow: 3px 3px #937650;

            appearance: none;

            &:checked {
                border-color: #e5771e;
                background-color: #e5771e;
                box-shadow: 3px 3px #bb3f03;
            }
        }
    }
}
</style>
