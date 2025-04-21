/* Vue Libs */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

/* App & Routes */
import App from './App.vue';
import router from './router';


/* SCSS */
import './assets/scss/main.scss';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faMagnifyingGlass, faStar } from '@fortawesome/pro-solid-svg-icons';
import { faFilm } from '@fortawesome/pro-duotone-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
const icons = [faMagnifyingGlass, faStar, faFilm, faDiscord];
icons.forEach(icon => library.add(icon));


/* App */
const app = createApp(App);
const pinia = createPinia();


app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
