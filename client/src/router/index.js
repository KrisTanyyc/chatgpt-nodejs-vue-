import { createRouter, createWebHistory } from "vue-router";
import Chat from '../views/Chat.vue';
import Questions from '../views/Questions.vue';
import QuestionDetail from '../views/QuestionDetail.vue';
import UnsolveQuestions from '../views/UnsolveQuestions.vue';
import UnsolveQuestionDetail from '../views/UnsolveQuestionDetail';
import Informations from '../views/Informations.vue'

const routes = [
    {
        path: '/',
        name: 'Chat',
        component: Chat
    },
    {
        path: '/questions',
        name: 'Questions',
        component: Questions
    },
    {
        path: '/question/:questionId',
        name: 'QuestionDetail',
        component: QuestionDetail,
        props: true
    },
    {
        path: '/unsolvequestions',
        name: 'UnsolveQuestions',
        component: UnsolveQuestions
    },
    {
        path: '/unsolvequestion/:questionId',
        name: 'UnsolveQuestionDetail',
        component: UnsolveQuestionDetail,
        props: true
    },
    {
        path: '/informations',
        name: 'Informations',
        component: Informations
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;