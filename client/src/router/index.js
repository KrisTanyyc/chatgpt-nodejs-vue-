import { createRouter, createWebHistory } from "vue-router";
import Chat from '../views/Chat.vue';
import Questions from '../views/Questions.vue';
import QuestionDetail from '../views/QuestionDetail.vue';
import UnsolveQuestions from '../views/UnsolveQuestions.vue';
import UnsolveQuestionDetail from '../views/UnsolveQuestionDetail';
import Informations from '../views/Informations.vue';
import QuestionInformation from '../views/QuestionInformation.vue';
import InformationDetail from '../views/InformationDetail.vue';
import CreateInformation from '../views/CreateInformation.vue';
import Test from '../views/Test.vue';

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
    },
    {
        path: '/information/:informationId',
        name: 'InformationDetail',
        component: InformationDetail,
        props: true
    },
    {
        path:'/unsolvequestion/:questionId/informations',
        name: 'QuestionInformations',
        component: QuestionInformation,
        props: true
    },
    {
        path: '/information/create',
        name: 'CreateInformation',
        component: CreateInformation,
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;