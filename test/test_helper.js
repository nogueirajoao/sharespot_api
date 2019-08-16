const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/sharespot_test', { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
    });
});

beforeEach((done) => {
    const { posts } = mongoose.connection.collections;
    posts.drop(() => done())
});

after(() => {
    mongoose.connection.close();
 })