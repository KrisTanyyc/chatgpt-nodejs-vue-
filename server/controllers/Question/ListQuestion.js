import Question from "../../models/question.js";
import UnsolveQuestion from "../../models/unsolveQuestion.js";

const getAllQuestions = (req, res, next) => {
    Question.findAll()
        .then(result => {
            res.json({
                response: result,
                status: 'success'
            });
        }).catch(err => console.log(err));
};

const getQuestion = (req, res, next) => {
    const questionId = req.params.questionId;
    Question.findAll({
        where: {
            id: questionId
        }
    }).then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};

const getQuestionAmount = (req, res, next) => {
    Question.count()
    .then((result) => {
        res.json({
            amount: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};

const getAllUnsolveQuestions = (req, res, next) => {
    UnsolveQuestion.findAll()
        .then(result => {
            res.json({
                response: result,
                status: 'success'
            });
        }).catch(err => console.log(err));
};

const getUnsolveQuestion = (req, res, next) => {
    const questionId = req.params.questionId;
    UnsolveQuestion.findAll({
        where: {
            id: questionId
        }
    }).then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};

export { getAllQuestions, getQuestion, getAllUnsolveQuestions, getUnsolveQuestion, getQuestionAmount };