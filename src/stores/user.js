import { defineStore } from 'pinia'

export const UserStore = defineStore({
    id: 'user',
    state: () => (
        {
            unauthorized: false,
            timestamp: null,
            loggedIn: false,
        }
    )
});