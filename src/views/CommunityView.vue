<script>
/* vue */
import { ref } from 'vue';

/* components */
import MPWModal from '@/components/Modal.vue';

/* Services*/
import api from '@/services/api.js';
import communityApi from '@/services/community.js';

/* Libs*/
import moment from 'moment';

export default {
    name: 'Search',
    components: {
        MPWModal
    },
    methods: {
        join(isPrivate, id) {
            this.id = id;
            if (!isPrivate) {
                communityApi.joinCommunity(id).then((res) => {
                    console.log(res)
                });
            } else {
                this.$refs.joinModal.open();
            }
        },
        joinCommunity() {
            communityApi.joinCommunity(this.id, this.passcode).then((res) => {
                console.log(res)
                if (res.statusCode == 202) {
                    this.$refs.joinModal.close();
                } else {
                    this.error = res.message;
                }
            });
        }

    },
    computed: {

    },
    setup() {
        const communities = ref(null);

        api.getCommunities().then((res) => {
            console.log(res)
            communities.value = res;
        });

        return {
            communities
        }
    },
    data() {
        return {
            showingPassword: false,
            passcode: '',
            id: 0,
            error: ''
        }
    }
}

</script>

<template>
    <h1>communities</h1>
    <communities v-if="communities?.length > 0">
        <community v-for="community in communities" :key="community.id" :community="community"
            :style="{ '--bg': `url(${community.banner})` }">
            <panel>
                <photo>
                    <img :src="community.photo" alt="logo">
                </photo>
                <button v-if="!community.isMember" @click="join(community.private, community.id)">Join</button>
            </panel>
            <h2>{{ community.name }}</h2>
            <p>Owner : {{ community.owner.display_name }}</p>
            <span>Members : {{ community.members.length }}</span>
            <a v-if="community.discord" :href="community.discord" target="_blank"><font-awesome-icon
                    :icon="['fab', 'discord']" /></a>
        </community>
    </communities>

    <main v-if="communities?.length == 0">
        <h1>No communities found</h1>
        <p>There are no communities available at the moment. click here to make one!</p>
    </main>

    <MPWModal ref="joinModal">
        <template v-slot:modalBody>
            <form ast-fail @submit.prevent="joinCommunity">

                <input v-model="passcode" label="Password" type="string" placeholder="Pass Code #xxxxx" required />
                <errors>{{ error }}</errors>
                <button type="submit">Join</button>
            </form>
        </template>
    </MPWModal>
</template>


<style lang="scss" scoped>
communities {
    display: flex;

    margin-top: 500px;

    align-items: center;
    justify-content: center;

    community {
        width: 250px;
        height: 200px;
        margin-left: 25px;
        padding: 75px 25px 10px 25px;

        border-radius: 20px;
        background: var(--bg) no-repeat #232323;
        background-size: 100% 100px;

        h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            line-height: 28px;

            margin: 5px 0 5px 0;

            letter-spacing: 1px;

            color: #fff;
        }

        span,
        p {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            line-height: 28px;

            margin: 0;

            letter-spacing: 1px;

            color: #fff;
        }

        panel {
            display: flex;

            photo {
                display: block;
                overflow: hidden;

                width: 75px;
                height: 75px;

                border-radius: 100%;

                img {
                    display: block;

                    width: 100%;
                    height: 100%;

                    object-fit: cover;
                }
            }

            button {
                width: 75px;
                height: 25px;
                margin: auto 0 0 auto;

                border: none;
                border-radius: 15px;
            }
        }
    }
}

form {
    position: relative;
    z-index: 1;

    display: grid;

    width: 100%;
    height: 300px;

    place-content: center;

    label {
        font-family: 'Poppins';
        font-size: 18px;
        font-weight: 500;

        margin-bottom: 10px;

        color: #000;
    }

    input {
        font-family: 'Poppins';
        font-size: 16px;

        width: 500px;
        height: 80px;
        margin-bottom: 15px;

        text-indent: 45px;
        letter-spacing: 1px;

        color: #fff;
        border: none;
        outline: none;
        background: rgba(90, 61, 43, 0.85);

        appearance: none;
    }

    errors {
        font-family: 'Poppins';
        font-size: 16px;

        color: #bb3f03;
    }

    button {
        font-family: 'Poppins';
        font-size: 18px;
        font-weight: 500;

        height: 50px;
        margin-top: 35px;
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
</style>
