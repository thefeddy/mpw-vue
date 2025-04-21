<script>
/* vue */
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router'

/* Components */
import LinesBG from '@/components/LinesBG.vue';
/* Stores */
import { UserStore } from '@/stores/user';

/* Services*/
import api from '@/services/api.js';

/* Validation */
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'


export default {
    name: 'SignUp',
    components: {
        LinesBG
    },
    methods: {
        auth() {
            const v$ = useVuelidate(rules, form)
            const result = v$.value.$validate()
            console.log(result)
            // const userStore = new UserStore();
            // api.auth(this.email, this.password, this.remember).then((res) => {
            //     if (!res.error) {
            //         res.timestamp = new Date();
            //         userStore.loggedIn = true;
            //         window.sessionStorage.setItem('user', JSON.stringify(res));
            //         if (this.redirect) {
            //             this.$router.push({ path: this.redirect });
            //         } else {
            //             this.$router.push({ name: 'Home' });
            //         }


            //     } else {
            //         if (res.error != 'unauthorized_client') {
            //             this.error = res.error_description;
            //         } else {
            //             this.error = 'This user is unauthorized.';
            //         }

            //         this.errors = true;
            //     }
            // });
        },

    },
    setup() {
        const route = useRoute();
        const state = reactive({
            display_name: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: ''

        })
        const rules = {
            display_name: { required },
            email: { required, email },
            password: { required, minLength: minLength(6) },
            confirmPassword: { required, sameAsPassword: sameAs('password') }

        }

        const v$ = useVuelidate(rules, state)

        return { state, v$ }
    },
    data() {
        return {
            email: '',
            password: '',
            remember: false,
            rules: {
                required: [value => !!value || 'Required.']
            },
        }
    }
}

</script>

<template>
    <form fast-fail @submit.prevent="auth">
        <h1>Sign Up</h1>
        <div v-if="errors" class="error">{{ error }}</div>
        <div :class="{ error: v$.display_name.$errors.length }">
            <input v-model="state.display_name">
            <div class="input-errors" v-for="error of v$.display_name.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <button type="submit">Sign in</button>
    </form>
    <LinesBG />
</template>


<style lang="scss" scoped>
form {
    position: relative;
    z-index: 1;

    display: grid;

    width: 100vw;
    height: 100vh;

    place-content: center;

    label {
        font-family: 'Poppins';
        font-size: 18px;
        font-weight: 500;

        margin-bottom: 10px;

        color: #000;
    }

    input[type='text'],
    input[type='password'] {
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

    .remember {
        display: flex;

        margin-bottom: 25px;

        align-items: center;

        label {
            margin: 0 0 0 25px;
        }

        input[type='checkbox'] {
            position: relative;

            width: 30px;
            height: 30px;

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
