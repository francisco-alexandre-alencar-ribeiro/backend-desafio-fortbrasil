module.exports = application => {
    const {EstablishmentDAO} = application.api.models;
    
    var controller = {};

    controller.getAll = (req, res, next) => {
        EstablishmentDAO.getAll(req.query, result => res.status(200).json(result));
    };
    controller.get = (req, res, next) => {
        EstablishmentDAO.get(req.params.id, result => res.status(200).json(result));
    };
    controller.save = (req, res, next) => {
        EstablishmentDAO.save(req.body, result => res.status(200).json({ok: result.ok}));
    };
    controller.delete = (req, res, next) => {
        EstablishmentDAO.delete(req.params.id, result => res.status(200).json(result));
    };
    return controller;
};