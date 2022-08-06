import Home from "../views/Home.vue";

export const router = {
    path: "/product",
    name: "Product",
    component: Home,
    children: [
        {
            path: "/product",
            name: "product",
            meta: {
                title: '产品',
                icon: "el-icon-lx-home",

            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/Product/Product.vue")
        },
    ]
}
