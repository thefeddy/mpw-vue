import { createRouter, createWebHistory } from 'vue-router';

import moment from 'moment';

const HomeView = () => import('@/views/HomeView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const SignUpView = () => import('@/views/SignUpView.vue');
const SearchView = () => import('@/views/SearchView.vue');
const Details = () => import('@/views/Details.vue');
const FourOhFour = () => import('@/views/404View.vue');
const TrendingView = () => import('@/views/TrendingView.vue');

/* User Profile */
const UserProfileView = () => import('@/views/user/ProfileView.vue');

/* Account */
const AccountView = () => import('@/views/account/MainView.vue');
const AccountCommmunitiesView = () => import('@/views/account/MyCommunitiesView.vue');

/* Community */
const CommunityView = () => import('@/views/CommunityView.vue');
const CommunityDetailsView = () => import('@/views/community/DetailsView.vue');



const removeQueryParams = (to) => {
    // Check Auth
    console.log('testing')
}

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUpView
        },
        {
            path: '/trending',
            name: 'Trending',
            component: TrendingView
        },
        {
            path: '/404',
            name: '404',
            component: FourOhFour
        },
        {
            path: '/search/:type/:title/:page',
            name: 'Search',
            component: SearchView
        },
        {
            path: '/details/:type/:id',
            name: 'Details',
            component: Details
        },
        {
            path: '/user',
            name: 'UserProfile',
            component: UserProfileView,
            beforeEnter: [removeQueryParams],
        },
        {
            path: '/account',
            name: 'AccountMain',
            component: AccountView,
            beforeEnter: [removeQueryParams],
            children: [
                {
                    path: '/communities',
                    name: 'AccountCommunities',
                    component: AccountCommmunitiesView,
                    beforeEnter: [removeQueryParams],
                },
            ]
        },
        {
            path: '/community/',
            name: 'Community',
            component: CommunityView,
        },
        {
            path: '/community/:id',
            name: 'CommunityDetails',
            component: CommunityDetailsView,

        },

        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});


export default router
