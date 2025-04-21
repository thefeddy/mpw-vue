import { UserStore } from '@/stores/user'

export default {

    getTrending() {
        let headers = new Headers();
        headers.append('Content-type', `application/json`);

        return fetch(`${import.meta.env.VITE_API_URL}/movies/trending/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getDetails(type, id) {
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        console.log(type, id)
        return fetch(`${import.meta.env.VITE_API_URL}/movies/details/${type}/${id}/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getMovieGenres() {
        let headers = new Headers();
        headers.append('Content-type', `application/json`);

        return fetch(`${import.meta.env.VITE_API_URL}/movies/genres/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getSearch(type, title, page) {
        let headers = new Headers();
        headers.append('Content-type', `application/json`);

        return fetch(`${import.meta.env.VITE_API_URL}/search/${type}/${title}/${page}`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },

    getUserDetails(id) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        headers.append('Authorization', `Bearer ${user.access_token}`);

        return fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getCommunityById(id) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        headers.append('Authorization', `Bearer ${(user) ? user.access_token : ''}`);

        return fetch(`${import.meta.env.VITE_API_URL}/community/${id}/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getCommunities() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        headers.append('Authorization', `Bearer ${(user) ? user.access_token : ''}`);

        return fetch(`${import.meta.env.VITE_API_URL}/community/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    getTrending() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        return fetch(`${import.meta.env.VITE_API_URL}/movies/trending/`, {
            method: 'GET',
            headers

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
    auth(email, password, remember) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');


        let body = new URLSearchParams();
        body.append('email', email);
        body.append('password', password);
        body.append('remember', remember);

        return fetch(`${import.meta.env.VITE_API_URL}/auth/login/`, {
            method: 'POST',
            headers,
            body,
            redirect: 'follow'

        }).then(res => res.json())
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    },
};