const catchError = require('../utils/catchError');
const News = require('../models/News');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await News.findAll({ include: [Image] });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await News.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await News.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setNewsImages = catchError(async(req, res) => {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    await news.setImages(req.body);
    const images = await news.getImages();
    return res.json(images);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setNewsImages,
}