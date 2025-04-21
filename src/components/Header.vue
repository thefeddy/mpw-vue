<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* Stores */
import { SearchStore } from '@/stores/search';
import { UserStore } from '@/stores/user';

/* libs */
import jwt_decode from 'jwt-decode';

export default {
    name: 'MPWHeader',
    props: {

    },
    methods: {
        search() {
            const title = this.title;

            const searchStore = SearchStore();
            this.type = searchStore.$state.type;

            this.$router.push({ name: 'Search', params: { type: this.type, title, page: 1 } });
        },
        logout() {
            const userStore = UserStore();
            window.sessionStorage.clear();
            userStore.loggedIn = false;
            this.$router.push({ name: 'Home' });
        },

    },
    setup() {
        let user = sessionStorage.getItem('user');

        const route = useRoute();
        const router = useRouter();
        const userStore = UserStore();

        /* Refs */
        const name = ref('');

        const sticky = ref(true);
        const loggedin = computed(() => userStore.loggedIn);

        const getUserInfo = () => {
            const token = JSON.parse(user).access_token;
            const jwt = jwt_decode(token);
            name.value = jwt.display_name;
            userStore.loggedIn = true;
        }

        if (user) {
            getUserInfo();
        }

        watch(loggedin, (newValue, oldValue) => {
            if (newValue === true) {
                user = sessionStorage.getItem('user');
                getUserInfo();
            }
        });


        onMounted(async () => {
            await router.isReady();
            console.log(route.name)
            if (route.name === 'Home' || route.name === 'Trending') {
                sticky.value = false;
            } else {
                sticky.value = true;
            }

        });
        return {
            name,
            loggedin,
            sticky,
        }
    },
    data() {
        return {
            type: null,
            title: null
        }
    }

};
</script>

<template>
    <header :class="{ 'sticky': sticky }">
        <nav>
            <ul>
                <li>
                    <router-link to="/">Search</router-link>
                </li>
                <li>
                    <a>Communities</a>
                </li>
                <li>
                    <router-link to="/trending/">Trending</router-link>
                </li>
                <li>
                    <span id="login" @click="logout" v-if="loggedin">Logout</span>
                </li>
            </ul>
        </nav>

        <router-link id="login" to="/login" v-if="!loggedin">Login</router-link>
        <router-link to="/signup" v-if="!loggedin">Sign Up</router-link>
        <p id="wb" v-if="loggedin">Welcome Back, <router-link to="/account/">{{ name }}</router-link>!</p>
    </header>
    <sub-header>
        <ul>
            <li><router-link to="/account/communities/">> My Communities</router-link></li>
            <li><router-link to="/community/">> All</router-link></li>
        </ul>
    </sub-header>
</template>

<style lang="scss" scoped>
#login {
    margin-left: auto;
}

header {
    position: absolute;
    z-index: 20;
    top: 0;

    display: flex;

    width: 100%;
    height: 77px;

    border-top: 6px solid #ce572c;
    border-bottom: 1px solid #937650;
    background-color: #fffceb;

    align-items: center;

    &.sticky {
        position: sticky;
    }

    a {
        font-family: 'Poppins';
        font-size: 14px;
        font-weight: 500;

        display: block;

        margin-right: 20px;
        padding: 8px;

        cursor: pointer;
        text-decoration: none;
        letter-spacing: 1px;

        color: #fff;
        border: none;
        outline: none;
        background: #e5771e;
        box-shadow: 5px 5px #bb3f03;

        appearance: none;
    }

    nav {
        font-family: 'Poppins';

        display: flex;

        padding-left: 25px;

        ul {
            display: flex;

            padding: 0;

            list-style: none;

            span {
                font-family: 'Poppins';
                font-size: 14px;
                font-weight: 500;

                display: block;

                margin-right: 20px;
                padding: 8px;

                cursor: pointer;
                text-decoration: none;
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

    p {
        font-family: 'Poppins';
        font-size: 20px;
        font-weight: 500;

        display: flex;

        margin-left: auto;
        padding-right: 25px;

        color: #937650;

        align-items: center;

        a {
            margin: 0 10px;
        }
    }
}

sub-header {
    position: sticky;
    z-index: 20;
    top: 83px;

    display: flex;
    display: none;

    width: 100%;
    height: 77px;

    ul {
        display: flex;

        list-style: none;

        li {
            margin-right: 15px;

            a {
                font-family: 'Poppins';
                font-size: 14px;
                font-weight: 500;

                display: block;

                padding: 8px;

                cursor: pointer;
                text-decoration: none;
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
</style>
