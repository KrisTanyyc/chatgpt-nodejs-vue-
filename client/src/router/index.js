import { createRouter, createWebHistory } from "vue-router";
import Chat from '../views/Chat.vue';
import QuestionForm from '../views/QuestionForm.vue';
import QuestionDetail from '../views/QuestionDetail.vue';

const routes = [
    {
        path: '/',
        name: 'Chat',
        component: Chat
    },
    {
        path: '/questions',
        name: 'Questions',
        component: QuestionForm
    },
    {
        path: '/question/:questionId',
        name: 'QuestionDetail',
        component: QuestionDetail,
        props: true
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;