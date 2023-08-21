import Question from "../../models/question.js";
import UnsolveQuestion from "../../models/unsolveQuestion.js";

const postAddQuestion = (req, res, next) => {
    const content = req.body.content;
    Question.create({
        content: content
    }).then(result => {
        console.log(result);
        res.send('Success');
    }
    ).catch(err => console.log(err));
};

const postAddUnsolveQuestion = (req, res, next) => {
    const content = req.body.content;
    UnsolveQuestion.create({
        content: content
    }).then(result => {
        console.log(result);
        res.send('Success');
    }).catch(err => console.log(err));
}

export { postAddQuestion, postAddUnsolveQuestion };