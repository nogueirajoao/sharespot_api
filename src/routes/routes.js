const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

module.exports = (app) => {
    userRoutes(app);
    postRoutes(app);
};