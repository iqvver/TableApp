import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/Место', name: 'Место' },
    { path: '/Логин', name: 'Логин' },
    { path: '/Подтвержденные заказы', name: 'Подтвержденные заказы' },
    { path: '/Статус', name: 'Статус' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: ".active",
});

export default router;