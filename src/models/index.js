const Category = require('./Category');
const Image = require('./Image');
const News = require('./News');

Category.hasMany(News);
News.belongsTo(Category);

News.hasMany(Image);
Image.belongsTo(News);
