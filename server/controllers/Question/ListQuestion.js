import Question from "../../models/question.js";
import UnsolveQuestion from "../../models/unsolveQuestion.js";

const getAllQuestions = (req, res, next) => {
    Question.findAll()
        .then(result => {
            res.send({
                'question': result,
                'status': 'success'
            })
        }).catch(err => console.log(err));
};


export { getAllQuestions };