import { createRouter, createWebHistory } from "vue-router";
import Chat from '../views/Chat.vue';
import QuestionForm from '../views/QuestionForm.vue'

const routes = [
    {
        path: '/',
        name: 'Chat',
        component: Chat
    },
    {
        path: '/Questions',
        name: 'Questions',
        component: QuestionForm
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;