import Vue from 'vue'
import Router from 'vue-router'

import Home from "../pages/Home";
import Test from "../pages/Test";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "*",
            redirect: "/"
        },
        {
            name: "home",
            path: "/",
            component: Home
        },
        {
            name: "test",
            path: "/test",
            component: Test
        }
    ]
})