import { Router } from "express";
import { versionOne } from "../controllers/chat.js";
import { postAddQuestion, postAddUnsolveQuestion } from "../controllers/Question/CreateQuestion.js";
import { getAllQuestions } from "../controllers/Question/ListQuestion.js"; 


const router = Router();

//Chat
router.post('/v1/chatgpt', versionOne);

//Question
router.get('/listQuestions', getAllQuestions);
router.post('/createQuestion', postAddQuestion);
router.post('/createUnsolveQuestion', postAddUnsolveQuestion);

export default router;