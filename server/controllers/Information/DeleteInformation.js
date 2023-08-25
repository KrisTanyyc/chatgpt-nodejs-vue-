import Information from "../../models/information.js";

const deleteInformation = async (req, res, next) => {
    const informationId = req.params.informationId;
    const information = await Information.findOne({
        where: {
            id: informationId
        }
    });

    if (information == null) {
        return res.json({
            status: "failed"
        });
    }

    await information.destroy();

    return res.json({
        status: "success"
    });
}

export { deleteInformation };