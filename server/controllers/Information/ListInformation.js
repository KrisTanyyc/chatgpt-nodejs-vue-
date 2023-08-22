import Information from "../../models/information.js";

const getAllInformations = (req, res, next) => {
    Information.findAll()
    .then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};

const getInformation = (req, res, next) => {
    const questionId = req.body.questionId;
    Information.findAll({
        where: {
            unsolveQuestionId: questionId
        }
    }).then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
};

export { getAllInformations, getInformation };