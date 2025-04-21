export default {
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
    joinCommunity(id, password) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let headers = new Headers();
        headers.append('Content-type', `application/json`);
        headers.append('Authorization', `Bearer ${(user) ? user.access_token : ''}`);

        return fetch(`${import.meta.env.VITE_API_URL}/community/join/${id}/`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ join_password: password })

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

};