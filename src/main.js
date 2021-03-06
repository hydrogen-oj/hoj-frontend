import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight,
    faAngleDown, faArrowUp, faArrowDown, faArrowLeft,
    faWrench, faCheck, faTimes, faPlus, faCamera
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';
import Vue3Progress from 'vue3-progress';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'element-plus/lib/theme-chalk/index.css';

import App from './App.vue';
import Admin from './views/Admin.vue';
import Contest from './views/Contest.vue';
import ContestEditor from './views/ContestEditor.vue';
import ContestList from './views/ContestList.vue';
import Error from './views/Error.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import OAuth from './views/OAuth.vue';
import Problem from './views/Problem.vue';
import ProblemEditor from './views/ProblemEditor.vue';
import ProblemList from './views/ProblemList.vue';
import Submission from './views/Submission.vue';
import SubmissionList from './views/SubmissionList.vue';
import User from './views/User.vue';
import UserSettings from './views/UserSettings.vue';

import config from './config';

library.add(
    faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight,
    faAngleDown, faArrowUp, faArrowDown, faArrowLeft,
    faWrench, faCheck, faTimes, faPlus, faCamera, faGithub, faGoogle, faMicrosoft
);

const routes = [
    { path: '/', component: Index },
    { path: '/admin', component: Admin, beforeEnter: (to, from, next) => {
        if (localStorage.getItem('role_id') <= 2) next();
        else next('/404');
    }},
    { path: '/oauth/:platform', component: OAuth },
    { path: '/contest', component: ContestList },
    { path: '/contest/:contest_id', component: Contest },
    { path: '/contest/:contest_id/edit', component: ContestEditor, beforeEnter: (to, from, next) => {
        const roleId = localStorage.getItem('role_id');
        if (roleId && roleId <= 2) next();
        else next('/404');
    }},
    { path: '/contest/new', component: ContestEditor, props: { isNew: true } },
    { path: '/login', component: Login },
    { path: '/problem', component: ProblemList },
    { path: '/problem/:problem_id/edit', component: ProblemEditor, beforeEnter: (to, from, next) => {
        const roleId = localStorage.getItem('role_id');
        if (roleId && roleId <= 2) next();
        else next('/404');
    }},
    { path: '/problem/:problem_id', component: Problem },
    { path: '/submission', component: SubmissionList },
    { path: '/submission/:submission_id', component: Submission },
    { path: '/user/:user_id', component: User },
    { path: '/user/settings', component: UserSettings },
    /*{ path: '/user/:user_id/edit', component: UserSettings, beforeEnter: (to, from, next) => {
        const roleId = localStorage.getItem('role_id');
        if (roleId && roleId <= 2) next();
        else next('/404');
    }},*/
    { path: '/error/:error_code', component: Error },
    { path: '/:catchAll(.*)', redirect: '/error/404' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.config.globalProperties.config = config;
app.use(router);
app.use(ElementPlus);
app.use(VueCookieNext);
app.use(Vue3Progress, {
    position: 'fixed',
    height: '3px',
    color: '#66ccff'
});
app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

VueCookieNext.config({ expire: '7d' });
