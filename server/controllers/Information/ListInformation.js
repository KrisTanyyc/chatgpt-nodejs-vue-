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

const getCertainInformation = (req, res, next) => {
    const informationId = req.params.informationId;
    Information.findAll({
        where: {
            id: informationId
        }
    }).then(result => {
        res.json({
            response: result,
            status: 'success'
        });
    }).catch(err => console.log(err));
}

const getInformation = (req, res, next) => {
    const questionId = req.params.questionId;
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

const test = async (req, res, next) => {
    const information = await Information.findOne({
        where: {
            id: 2
        }
    });

    if (information == null){
        return res.json({
            status: 'failed'
        });
    }

    information.content = 'Updated!';

    await information.save();

    return res.json({
        status: 'success'
    });

    
}

export { getAllInformations, getInformation, getCertainInformation, test };