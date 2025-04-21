import { defineStore } from 'pinia';

export const SearchStore = defineStore({
    id: 'search',
    state: () => (
        {
            type: 'movie'
        }
    )
});
