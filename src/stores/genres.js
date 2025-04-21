import { defineStore } from 'pinia'

export const GenresStore = defineStore({
    id: 'genres',
    state: () => (
        {
            genres: []
        }
    ),
    actions: {
        addGenre(genre) {
            this.genres.push(genre);
        }
    }
});
