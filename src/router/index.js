import Vue from 'vue'
import Router from 'vue-router'

import Home from "../pages/Home";
import Test from "../pages/Test";
import Room from "@/pages/Room";

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
        },
        {
            name: "room",
            path: "/rooms/:rid",
            component: Room
        }
    ]
})