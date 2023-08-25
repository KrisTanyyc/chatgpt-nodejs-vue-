import Information from "../../models/information.js";

const postUpdateInformation = async (req, res, next) => {
    const informationId = req.params.informationId;
    const information = await Information.findOne({
        where: {
            id: informationId
        }
    });

    if (information == null){
        return res.json({
            status: 'failed'
        });
    }

    information.content = req.body.content;

    await information.save();

    return res.json({
        status: 'success'
    });
}

export { postUpdateInformation };