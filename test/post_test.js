const assert = require('assert');
const mongoose = require('mongoose');

const Post = require('../src/models/Post');
const User = require('../src/models/User');

describe('Post Test', () => {

    it('Create post', (done) => {
        const post = new Post({
            content: 'LOREM IPSUM',
            user: new User({ name: 'John'})
        });

        post.comments.push({ content: 'Comentarios', user: post.user._id });
        post.save()
            .then(() => Post.find({}))
            .then(result => {
                done();
            });
    })

})