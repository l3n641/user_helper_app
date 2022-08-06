import {createRouter, createWebHashHistory} from "vue-router";
import {router as productRouter} from "./product";
import Home from "../views/Home";

export const routes = [
    {
        path: "/",
        name: "Index",
        component: Home,
        children: [
            {
                path: "/",
                name: "Index",
                meta: {
                    title: '系统首页',
                    icon: "el-icon-lx-home",
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
            },
        ]
    },
    productRouter,
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
            hidden: true

        },
        component: () => import (/* webpackChunkName: "403" */ '@/views/403.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面',
            hidden: true
        },
        component: () => import (/* webpackChunkName: "404" */ '@/views/404.vue')
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动匹配404
        redirect: '/404',
        meta: {hidden: true}
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;
