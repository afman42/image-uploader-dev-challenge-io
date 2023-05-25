import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("../views/HomePage.vue")
    },
    {
        name: "viewID",
        path: "/view/:id",
        component: () => import("../views/ViewIDPage.vue")
    },
    {   path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import('../views/NotFound.vue') 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router