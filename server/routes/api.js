import { Router } from "express";
import { versionOne } from "../controllers/chat.js";
import { postAddQuestion, postAddUnsolveQuestion } from "../controllers/Question/CreateQuestion.js";
import { getAllQuestions, getQuestion, getAllUnsolveQuestions, getUnsolveQuestion } from "../controllers/Question/ListQuestion.js"; 
import { postAddInformation } from "../controllers/Information/CreateInformation.js";
import { getAllInformations, getInformation } from "../controllers/Information/ListInformation.js";

const router = Router();

//Chat
router.post('/v1/chatgpt', versionOne);

//Question
router.get('/listQuestions', getAllQuestions);
router.get('/getQuestion/:questionId', getQuestion);
router.get('/listUnsolveQuestions', getAllUnsolveQuestions);
router.get('/getUnsolveQuestion/:questionId', getUnsolveQuestion);
router.post('/createQuestion', postAddQuestion);
router.post('/createUnsolveQuestion', postAddUnsolveQuestion);

//Information
router.get('/listInformations',getInformation);
router.post('/createInformations', postAddInformation);

export default router;