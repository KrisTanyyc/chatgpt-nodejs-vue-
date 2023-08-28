import { Router } from "express";
import { versionOne } from "../controllers/chat.js";
import { postAddQuestion, postAddUnsolveQuestion } from "../controllers/Question/CreateQuestion.js";
import { getAllQuestions, getQuestion, getQuestionAmount, getAllUnsolveQuestions, getUnsolveQuestion } from "../controllers/Question/ListQuestion.js"; 
import { postAddInformation } from "../controllers/Information/CreateInformation.js";
import { getAllInformations, getInformation, getCertainInformation, test } from "../controllers/Information/ListInformation.js";
import { postUpdateInformation } from "../controllers/Information/UpdateInformation.js";
import { deleteInformation } from "../controllers/Information/DeleteInformation.js";

const router = Router();

//Chat
router.post('/v1/chatgpt', versionOne);

//Question
router.get('/listQuestions', getAllQuestions);
router.get('/getQuestion/:questionId', getQuestion);
router.get('/listUnsolveQuestions', getAllUnsolveQuestions);
router.get('/getUnsolveQuestion/:questionId', getUnsolveQuestion);
router.get('/getQuestionAmount', getQuestionAmount);
router.post('/createQuestion', postAddQuestion);
router.post('/createUnsolveQuestion', postAddUnsolveQuestion);

//Information
router.get('/listInformations',getAllInformations);
router.get('/information/:informationId', getCertainInformation);
router.get('/question/:questionId/informations', getInformation);
router.post('/createInformations', postAddInformation);
router.post('/updateInformation/:informationId', postUpdateInformation);
router.delete('/deleteInformation/:informationId', deleteInformation);


router.get('/test',test);
export default router;  