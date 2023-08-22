import Information from "../../models/information.js";


const postAddInformation = (req, res, next) => {
    const content = req.body.content;
    const questionId = req.body.questionId;
    Information.create({
        content: content,
        unsolveQuestionId: questionId
    }).then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};


export { postAddInformation };