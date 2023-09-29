const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');
const News = require('../models/News');

const getAll = catchError(async(req, res) => {
    const results = await Favorite.findAll({ 
        include: [News],
        where: { userId: req.user.id },
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { newsId, rate } = req.body;
    const result = await Favorite.create({
        newsId,
        rate,
        userId: req.user.id,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Favorite.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}