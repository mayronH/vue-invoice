import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    },

    {
        path: '/invoice/:invoiceId',
        name: 'Invoice',
        component: () =>
            import(/* webpackChunkName: "invoice" */ '../views/InvoiceView.vue'),
    },

    // 404 Page
    {
        path: '/:catchAll(.*)*', // regex, catch any route that doesn't exists
        name: '404',
        component: () =>
            import(/* webpackChunkName: "404" */ '../views/404View.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
